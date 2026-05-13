<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Handle contact form submission
     */
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // In production, send email notification here
        // Mail::to('admin@sally.com')->send(new ContactFormMail($validated));

        return response()->json([
            'message' => 'Your message has been sent successfully. We\'ll get back to you within 24 hours.',
        ]);
    }
}
