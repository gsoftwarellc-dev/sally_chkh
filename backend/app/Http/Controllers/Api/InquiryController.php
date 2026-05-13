<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    /**
     * Create a new inquiry for a listing
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'listing_id' => 'required|exists:listings,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        if ($request->user()) {
            $validated['user_id'] = $request->user()->id;
        }

        $inquiry = Inquiry::create($validated);

        return response()->json([
            'message' => 'Inquiry submitted successfully',
            'inquiry' => $inquiry,
        ], 201);
    }

    /**
     * Get user's inquiries
     */
    public function userInquiries(Request $request)
    {
        $inquiries = $request->user()
            ->inquiries()
            ->with('listing:id,title,asking_price')
            ->latest()
            ->paginate(10);

        return response()->json($inquiries);
    }
}
