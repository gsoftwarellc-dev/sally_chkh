<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    /**
     * Submit a new evaluation
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'business_name' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'category' => 'required|string|max:255',
            'age_months' => 'sometimes|nullable|integer|min:0',
            'monthly_revenue' => 'required|numeric|min:0',
            'monthly_profit' => 'required|numeric|min:0',
            'monthly_traffic' => 'sometimes|nullable|integer|min:0',
            'asking_price' => 'sometimes|nullable|numeric|min:0',
            'monetization' => 'sometimes|nullable|string|max:255',
            'tech_stack' => 'sometimes|nullable|string|max:500',
            'description' => 'required|string',
            'contact_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'sometimes|nullable|string|max:20',
        ]);

        $validated['user_id'] = $request->user()->id;

        $evaluation = Evaluation::create($validated);

        return response()->json([
            'message' => 'Evaluation submitted successfully',
            'evaluation' => $evaluation,
        ], 201);
    }

    /**
     * Get user's evaluations
     */
    public function userEvaluations(Request $request)
    {
        $evaluations = $request->user()
            ->evaluations()
            ->latest()
            ->paginate(10);

        return response()->json($evaluations);
    }

    /**
     * Get single evaluation
     */
    public function show(Request $request, Evaluation $evaluation)
    {
        $user = $request->user();
        if ($user->id !== $evaluation->user_id && !$user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($evaluation);
    }
}
