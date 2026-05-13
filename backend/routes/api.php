<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EvaluationController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\ListingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Sally Marketplace
|--------------------------------------------------------------------------
*/

// ========================================
// Public Routes (no authentication needed)
// ========================================

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Listings (public, approved only)
Route::get('/listings', [ListingController::class, 'index']);
Route::get('/listings/featured', [ListingController::class, 'featured']);
Route::get('/listings/{listing}', [ListingController::class, 'show']);

// Categories (public)
Route::get('/categories', [CategoryController::class, 'index']);

// Contact form (public)
Route::post('/contact', [ContactController::class, 'send']);

// Inquiries (public, can submit without auth)
Route::post('/inquiries', [InquiryController::class, 'store']);


// ========================================
// Authenticated Routes
// ========================================

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);

    // User's listings
    Route::get('/user/listings', [ListingController::class, 'userListings']);
    Route::get('/user/saved-listings', [ListingController::class, 'savedListings']);
    Route::get('/user/inquiries', [InquiryController::class, 'userInquiries']);
    Route::get('/user/evaluations', [EvaluationController::class, 'userEvaluations']);

    // Listings CRUD (authenticated)
    Route::post('/listings', [ListingController::class, 'store']);
    Route::put('/listings/{listing}', [ListingController::class, 'update']);
    Route::delete('/listings/{listing}', [ListingController::class, 'destroy']);

    // Save/unsave listings
    Route::post('/listings/{listing}/save', [ListingController::class, 'saveListing']);
    Route::delete('/listings/{listing}/save', [ListingController::class, 'unsaveListing']);

    // Evaluations
    Route::post('/evaluations', [EvaluationController::class, 'store']);
    Route::get('/evaluations/{evaluation}', [EvaluationController::class, 'show']);


    // ========================================
    // Admin Routes
    // ========================================

    Route::middleware('admin')->prefix('admin')->group(function () {

        // Dashboard stats
        Route::get('/stats', [AdminController::class, 'stats']);

        // Users management
        Route::get('/users', [AdminController::class, 'users']);
        Route::put('/users/{user}/role', [AdminController::class, 'updateUserRole']);

        // Listings management
        Route::get('/listings', [AdminController::class, 'listings']);
        Route::put('/listings/{listing}/status', [AdminController::class, 'updateListingStatus']);
        Route::post('/listings/{listing}/notes', [AdminController::class, 'addNote']);

        // Evaluations management
        Route::get('/evaluations', [AdminController::class, 'evaluations']);
        Route::put('/evaluations/{evaluation}/status', [AdminController::class, 'updateEvaluationStatus']);

        // Inquiries management
        Route::get('/inquiries', [AdminController::class, 'inquiries']);
        Route::put('/inquiries/{inquiry}/status', [AdminController::class, 'updateInquiryStatus']);

        // Categories management (admin only for CUD)
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
    });
});
