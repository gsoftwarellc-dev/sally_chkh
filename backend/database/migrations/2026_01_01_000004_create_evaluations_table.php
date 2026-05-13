<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('business_name');
            $table->string('url');
            $table->string('category');
            $table->integer('age_months')->nullable();
            $table->decimal('monthly_revenue', 15, 2);
            $table->decimal('monthly_profit', 15, 2);
            $table->integer('monthly_traffic')->nullable();
            $table->decimal('asking_price', 15, 2)->nullable();
            $table->string('monetization')->nullable();
            $table->string('tech_stack')->nullable();
            $table->text('description');
            $table->string('contact_name');
            $table->string('contact_email');
            $table->string('contact_phone')->nullable();
            $table->enum('status', ['pending', 'reviewed', 'approved', 'rejected'])->default('pending');
            $table->text('admin_feedback')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
