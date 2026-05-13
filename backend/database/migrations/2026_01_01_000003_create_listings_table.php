<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('url');
            $table->decimal('asking_price', 15, 2);
            $table->decimal('monthly_revenue', 15, 2);
            $table->decimal('monthly_profit', 15, 2);
            $table->integer('monthly_traffic')->default(0);
            $table->integer('age_months')->default(0);
            $table->string('monetization')->nullable();
            $table->string('tech_stack')->nullable();
            $table->text('seller_notes')->nullable();
            $table->json('financials')->nullable();
            $table->json('traffic_details')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected', 'sold'])->default('pending');
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
