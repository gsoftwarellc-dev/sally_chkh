<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'company',
        'bio',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function listings()
    {
        return $this->hasMany(Listing::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class);
    }

    public function savedListings()
    {
        return $this->belongsToMany(Listing::class, 'saved_listings')->withTimestamps();
    }

    public function adminNotes()
    {
        return $this->hasMany(AdminNote::class, 'admin_id');
    }
}
