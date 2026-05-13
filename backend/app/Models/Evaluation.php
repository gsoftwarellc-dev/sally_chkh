<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_name',
        'url',
        'category',
        'age_months',
        'monthly_revenue',
        'monthly_profit',
        'monthly_traffic',
        'asking_price',
        'monetization',
        'tech_stack',
        'description',
        'contact_name',
        'contact_email',
        'contact_phone',
        'status',
        'admin_feedback',
    ];

    protected $casts = [
        'monthly_revenue' => 'decimal:2',
        'monthly_profit' => 'decimal:2',
        'asking_price' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
