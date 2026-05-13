<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'url' => $this->url,
            'asking_price' => (float) $this->asking_price,
            'monthly_revenue' => (float) $this->monthly_revenue,
            'monthly_profit' => (float) $this->monthly_profit,
            'monthly_traffic' => $this->monthly_traffic,
            'age_months' => $this->age_months,
            'monetization' => $this->monetization,
            'tech_stack' => $this->tech_stack,
            'seller_notes' => $this->seller_notes,
            'financials' => $this->financials,
            'traffic_details' => $this->traffic_details,
            'status' => $this->status,
            'featured' => $this->featured,
            'category' => $this->whenLoaded('category', function () {
                return [
                    'id' => $this->category->id,
                    'name' => $this->category->name,
                    'slug' => $this->category->slug,
                ];
            }),
            'seller' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                ];
            }),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
