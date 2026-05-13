<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ListingResource;
use App\Models\Listing;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    /**
     * Get all approved listings with optional filters
     */
    public function index(Request $request)
    {
        $query = Listing::with(['category', 'user:id,name'])
            ->approved()
            ->filter($request->only([
                'search', 'category_id', 'min_price', 'max_price',
                'min_revenue', 'max_revenue',
            ]));

        // Sorting
        $sortBy = $request->get('sort', 'created_at');
        $sortDir = $request->get('direction', 'desc');
        $allowedSorts = ['created_at', 'asking_price', 'monthly_revenue', 'monthly_traffic'];

        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc');
        }

        $listings = $query->paginate($request->get('per_page', 12));

        return ListingResource::collection($listings);
    }

    /**
     * Get featured listings
     */
    public function featured()
    {
        $listings = Listing::with(['category', 'user:id,name'])
            ->featured()
            ->latest()
            ->take(6)
            ->get();

        return ListingResource::collection($listings);
    }

    /**
     * Get single listing by ID
     */
    public function show(Listing $listing)
    {
        if ($listing->status !== 'approved') {
            // Allow owner and admin to view non-approved listings
            $user = auth('sanctum')->user();
            if (!$user || ($user->id !== $listing->user_id && !$user->isAdmin())) {
                return response()->json(['message' => 'Listing not found'], 404);
            }
        }

        $listing->load(['category', 'user:id,name', 'inquiries']);

        return new ListingResource($listing);
    }

    /**
     * Create a new listing (authenticated users)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'url' => 'required|url|max:255',
            'asking_price' => 'required|numeric|min:0',
            'monthly_revenue' => 'required|numeric|min:0',
            'monthly_profit' => 'required|numeric|min:0',
            'monthly_traffic' => 'sometimes|integer|min:0',
            'age_months' => 'sometimes|integer|min:0',
            'monetization' => 'sometimes|nullable|string|max:255',
            'tech_stack' => 'sometimes|nullable|string|max:500',
            'seller_notes' => 'sometimes|nullable|string',
            'financials' => 'sometimes|nullable|array',
            'traffic_details' => 'sometimes|nullable|array',
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['status'] = 'pending';

        $listing = Listing::create($validated);

        return new ListingResource($listing->load('category'));
    }

    /**
     * Update a listing (owner only)
     */
    public function update(Request $request, Listing $listing)
    {
        $user = $request->user();
        if ($user->id !== $listing->user_id && !$user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'url' => 'sometimes|url|max:255',
            'asking_price' => 'sometimes|numeric|min:0',
            'monthly_revenue' => 'sometimes|numeric|min:0',
            'monthly_profit' => 'sometimes|numeric|min:0',
            'monthly_traffic' => 'sometimes|integer|min:0',
            'age_months' => 'sometimes|integer|min:0',
            'monetization' => 'sometimes|nullable|string|max:255',
            'tech_stack' => 'sometimes|nullable|string|max:500',
            'seller_notes' => 'sometimes|nullable|string',
            'financials' => 'sometimes|nullable|array',
            'traffic_details' => 'sometimes|nullable|array',
        ]);

        $listing->update($validated);

        return new ListingResource($listing->fresh()->load('category'));
    }

    /**
     * Delete a listing (owner or admin)
     */
    public function destroy(Request $request, Listing $listing)
    {
        $user = $request->user();
        if ($user->id !== $listing->user_id && !$user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $listing->delete();

        return response()->json(['message' => 'Listing deleted successfully']);
    }

    /**
     * Save/favorite a listing
     */
    public function saveListing(Request $request, Listing $listing)
    {
        $request->user()->savedListings()->syncWithoutDetaching([$listing->id]);

        return response()->json(['message' => 'Listing saved']);
    }

    /**
     * Unsave/unfavorite a listing
     */
    public function unsaveListing(Request $request, Listing $listing)
    {
        $request->user()->savedListings()->detach($listing->id);

        return response()->json(['message' => 'Listing unsaved']);
    }

    /**
     * Get user's saved listings
     */
    public function savedListings(Request $request)
    {
        $listings = $request->user()
            ->savedListings()
            ->with('category')
            ->paginate(12);

        return ListingResource::collection($listings);
    }

    /**
     * Get user's own listings
     */
    public function userListings(Request $request)
    {
        $listings = $request->user()
            ->listings()
            ->with('category')
            ->latest()
            ->paginate(12);

        return ListingResource::collection($listings);
    }
}
