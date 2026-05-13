<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminNote;
use App\Models\Category;
use App\Models\Evaluation;
use App\Models\Inquiry;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Dashboard stats
     */
    public function stats()
    {
        return response()->json([
            'total_listings' => Listing::count(),
            'total_users' => User::count(),
            'pending_listings' => Listing::where('status', 'pending')->count(),
            'approved_listings' => Listing::where('status', 'approved')->count(),
            'total_evaluations' => Evaluation::count(),
            'pending_evaluations' => Evaluation::where('status', 'pending')->count(),
            'total_inquiries' => Inquiry::count(),
            'total_volume' => Listing::where('status', 'sold')->sum('asking_price'),
        ]);
    }

    /**
     * Get all users
     */
    public function users(Request $request)
    {
        $users = User::withCount('listings')
            ->latest()
            ->paginate($request->get('per_page', 20));

        return response()->json($users);
    }

    /**
     * Update user role
     */
    public function updateUserRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|in:user,admin',
        ]);

        $user->update(['role' => $validated['role']]);

        return response()->json([
            'message' => 'User role updated',
            'user' => $user,
        ]);
    }

    /**
     * Get all listings (admin view, includes all statuses)
     */
    public function listings(Request $request)
    {
        $query = Listing::with(['category', 'user:id,name,email'])
            ->filter($request->only([
                'search', 'category_id', 'status',
                'min_price', 'max_price',
            ]));

        $listings = $query->latest()->paginate($request->get('per_page', 20));

        return response()->json($listings);
    }

    /**
     * Update listing status
     */
    public function updateListingStatus(Request $request, Listing $listing)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected,sold',
            'featured' => 'sometimes|boolean',
        ]);

        $listing->update($validated);

        return response()->json([
            'message' => 'Listing status updated',
            'listing' => $listing->fresh(),
        ]);
    }

    /**
     * Add admin note to listing
     */
    public function addNote(Request $request, Listing $listing)
    {
        $validated = $request->validate([
            'note' => 'required|string',
        ]);

        $note = AdminNote::create([
            'listing_id' => $listing->id,
            'admin_id' => $request->user()->id,
            'note' => $validated['note'],
        ]);

        return response()->json([
            'message' => 'Note added',
            'note' => $note->load('admin:id,name'),
        ], 201);
    }

    /**
     * Get all evaluations
     */
    public function evaluations(Request $request)
    {
        $evaluations = Evaluation::with('user:id,name,email')
            ->latest()
            ->paginate($request->get('per_page', 20));

        return response()->json($evaluations);
    }

    /**
     * Update evaluation status
     */
    public function updateEvaluationStatus(Request $request, Evaluation $evaluation)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,reviewed,approved,rejected',
            'admin_feedback' => 'sometimes|nullable|string',
        ]);

        $evaluation->update($validated);

        return response()->json([
            'message' => 'Evaluation status updated',
            'evaluation' => $evaluation->fresh(),
        ]);
    }

    /**
     * Get all inquiries
     */
    public function inquiries(Request $request)
    {
        $inquiries = Inquiry::with(['listing:id,title', 'user:id,name,email'])
            ->latest()
            ->paginate($request->get('per_page', 20));

        return response()->json($inquiries);
    }

    /**
     * Update inquiry status
     */
    public function updateInquiryStatus(Request $request, Inquiry $inquiry)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,responded,closed',
        ]);

        $inquiry->update($validated);

        return response()->json([
            'message' => 'Inquiry status updated',
            'inquiry' => $inquiry->fresh(),
        ]);
    }
}
