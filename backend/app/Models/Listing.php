<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'url',
        'asking_price',
        'monthly_revenue',
        'monthly_profit',
        'monthly_traffic',
        'age_months',
        'monetization',
        'tech_stack',
        'seller_notes',
        'financials',
        'traffic_details',
        'status',
        'featured',
    ];

    protected $casts = [
        'asking_price' => 'decimal:2',
        'monthly_revenue' => 'decimal:2',
        'monthly_profit' => 'decimal:2',
        'financials' => 'array',
        'traffic_details' => 'array',
        'featured' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class);
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saved_listings')->withTimestamps();
    }

    public function adminNotes()
    {
        return $this->hasMany(AdminNote::class);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true)->where('status', 'approved');
    }

    public function scopeFilter($query, array $filters)
    {
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (!empty($filters['min_price'])) {
            $query->where('asking_price', '>=', $filters['min_price']);
        }

        if (!empty($filters['max_price'])) {
            $query->where('asking_price', '<=', $filters['max_price']);
        }

        if (!empty($filters['min_revenue'])) {
            $query->where('monthly_revenue', '>=', $filters['min_revenue']);
        }

        if (!empty($filters['max_revenue'])) {
            $query->where('monthly_revenue', '<=', $filters['max_revenue']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query;
    }
}
