<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Evaluation;
use App\Models\Inquiry;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ============================
        // Create Admin User
        // ============================
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@sally.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // ============================
        // Create Demo Users
        // ============================
        $users = [];
        $demoUsers = [
            ['name' => 'John Doe', 'email' => 'john@example.com'],
            ['name' => 'Sarah Williams', 'email' => 'sarah@example.com'],
            ['name' => 'Mike Johnson', 'email' => 'mike@example.com'],
            ['name' => 'Emily Davis', 'email' => 'emily@example.com'],
            ['name' => 'Alex Brown', 'email' => 'alex@example.com'],
        ];

        foreach ($demoUsers as $userData) {
            $users[] = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make('password'),
                'role' => 'user',
            ]);
        }

        // ============================
        // Create Categories
        // ============================
        $categories = [];
        $categoryData = [
            ['name' => 'SaaS', 'slug' => 'saas', 'description' => 'Software as a Service businesses'],
            ['name' => 'E-Commerce', 'slug' => 'ecommerce', 'description' => 'Online retail and product businesses'],
            ['name' => 'Content', 'slug' => 'content', 'description' => 'Blogs, media, and content websites'],
            ['name' => 'Marketplace', 'slug' => 'marketplace', 'description' => 'Two-sided marketplace platforms'],
            ['name' => 'Agency', 'slug' => 'agency', 'description' => 'Service and consulting agencies'],
            ['name' => 'App', 'slug' => 'app', 'description' => 'Mobile and web applications'],
        ];

        foreach ($categoryData as $cat) {
            $categories[$cat['slug']] = Category::create($cat);
        }

        // ============================
        // Create Sample Listings
        // ============================
        $listings = [
            [
                'user_id' => $users[0]->id,
                'category_id' => $categories['saas']->id,
                'title' => 'CloudSync Pro - B2B SaaS Platform',
                'description' => 'Established B2B SaaS platform providing cloud synchronization solutions for mid-market companies. Fully automated with minimal owner involvement. Strong MRR growth with low churn rate. 500+ active subscribers across 12 countries. Built with React and Node.js, hosted on AWS.',
                'url' => 'https://cloudsyncpro.com',
                'asking_price' => 850000,
                'monthly_revenue' => 42000,
                'monthly_profit' => 31500,
                'monthly_traffic' => 85000,
                'age_months' => 36,
                'monetization' => 'Subscription',
                'tech_stack' => 'React, Node.js, PostgreSQL, AWS',
                'seller_notes' => 'Looking to sell to focus on new venture. All systems automated. Full documentation provided.',
                'financials' => json_encode([
                    'revenue_trend' => [38000, 39500, 40000, 41000, 41500, 42000],
                    'expenses' => ['hosting' => 3500, 'marketing' => 4000, 'tools' => 1500, 'support' => 1500],
                ]),
                'traffic_details' => json_encode([
                    'sources' => ['organic' => 55, 'paid' => 20, 'direct' => 15, 'referral' => 10],
                    'top_countries' => ['USA', 'UK', 'Canada', 'Germany', 'Australia'],
                ]),
                'status' => 'approved',
                'featured' => true,
            ],
            [
                'user_id' => $users[1]->id,
                'category_id' => $categories['ecommerce']->id,
                'title' => 'FitGear Direct - Premium Fitness E-Commerce',
                'description' => 'High-performing e-commerce store selling premium fitness equipment and accessories. Strong brand presence with 25K+ Instagram followers. Dropshipping model with verified suppliers.',
                'url' => 'https://fitgeardirect.com',
                'asking_price' => 320000,
                'monthly_revenue' => 28000,
                'monthly_profit' => 12600,
                'monthly_traffic' => 120000,
                'age_months' => 24,
                'monetization' => 'Product Sales',
                'tech_stack' => 'Shopify, Klaviyo, Facebook Ads',
                'seller_notes' => 'Turnkey operation. All supplier relationships included in sale.',
                'financials' => json_encode([
                    'revenue_trend' => [22000, 24000, 25000, 26500, 27000, 28000],
                    'expenses' => ['cogs' => 11000, 'marketing' => 3000, 'tools' => 900, 'shipping' => 500],
                ]),
                'traffic_details' => json_encode([
                    'sources' => ['paid' => 45, 'organic' => 25, 'social' => 20, 'referral' => 10],
                    'top_countries' => ['USA', 'Canada', 'UK'],
                ]),
                'status' => 'approved',
                'featured' => true,
            ],
            [
                'user_id' => $users[2]->id,
                'category_id' => $categories['content']->id,
                'title' => 'TechInsider - Technology News Blog',
                'description' => 'Authority tech blog with 500+ articles, strong SEO foundation, and diversified revenue. Earning through display ads, affiliate marketing, and sponsored posts.',
                'url' => 'https://techinsider.blog',
                'asking_price' => 175000,
                'monthly_revenue' => 8500,
                'monthly_profit' => 7200,
                'monthly_traffic' => 350000,
                'age_months' => 48,
                'monetization' => 'Ads, Affiliate, Sponsored',
                'tech_stack' => 'WordPress, Mediavine, AWS',
                'seller_notes' => 'Content team in place. Most revenue is passive from existing content.',
                'financials' => json_encode([
                    'revenue_trend' => [7000, 7500, 7800, 8000, 8200, 8500],
                    'expenses' => ['hosting' => 200, 'writers' => 800, 'tools' => 300],
                ]),
                'traffic_details' => json_encode([
                    'sources' => ['organic' => 78, 'direct' => 12, 'social' => 7, 'referral' => 3],
                    'top_countries' => ['USA', 'India', 'UK', 'Canada', 'Philippines'],
                ]),
                'status' => 'approved',
                'featured' => true,
            ],
            [
                'user_id' => $users[3]->id,
                'category_id' => $categories['marketplace']->id,
                'title' => 'DesignSwap - Freelancer Marketplace',
                'description' => 'Niche marketplace connecting businesses with vetted freelance designers. 2,000+ registered designers, 500+ completed projects.',
                'url' => 'https://designswap.io',
                'asking_price' => 520000,
                'monthly_revenue' => 18000,
                'monthly_profit' => 13500,
                'monthly_traffic' => 65000,
                'age_months' => 30,
                'monetization' => 'Commission',
                'tech_stack' => 'Next.js, Python, PostgreSQL',
                'seller_notes' => 'Strong network effects. Growing user base with high retention.',
                'status' => 'approved',
                'featured' => false,
            ],
            [
                'user_id' => $users[0]->id,
                'category_id' => $categories['saas']->id,
                'title' => 'QuickLearn - Online Course Platform',
                'description' => 'Ed-tech platform offering coding bootcamps and tech courses. 3,000+ students enrolled. 15 self-paced courses with video content.',
                'url' => 'https://quicklearn.dev',
                'asking_price' => 290000,
                'monthly_revenue' => 15000,
                'monthly_profit' => 11000,
                'monthly_traffic' => 45000,
                'age_months' => 20,
                'monetization' => 'Course Sales, Subscription',
                'tech_stack' => 'React, Django, AWS, Stripe',
                'seller_notes' => 'All course content included. Automated marketing funnels in place.',
                'status' => 'approved',
                'featured' => false,
            ],
            [
                'user_id' => $users[4]->id,
                'category_id' => $categories['ecommerce']->id,
                'title' => 'PetBox Monthly - Pet Subscription Box',
                'description' => 'Curated monthly subscription box for pet owners. 1,200+ active subscribers. Average 8-month retention.',
                'url' => 'https://petboxmonthly.com',
                'asking_price' => 180000,
                'monthly_revenue' => 22000,
                'monthly_profit' => 6600,
                'monthly_traffic' => 35000,
                'age_months' => 18,
                'monetization' => 'Subscription Box',
                'tech_stack' => 'Shopify, ReCharge, Mailchimp',
                'seller_notes' => 'All supplier contracts transferable. Warehouse fulfillment partner in place.',
                'status' => 'approved',
                'featured' => false,
            ],
            [
                'user_id' => $users[1]->id,
                'category_id' => $categories['agency']->id,
                'title' => 'SEOBolt Agency - Digital Marketing',
                'description' => 'Boutique digital marketing agency specializing in SEO and content marketing for SaaS companies. 12 retainer clients.',
                'url' => 'https://seobolt.agency',
                'asking_price' => 420000,
                'monthly_revenue' => 42000,
                'monthly_profit' => 25200,
                'monthly_traffic' => 12000,
                'age_months' => 42,
                'monetization' => 'Retainer Fees',
                'tech_stack' => 'WordPress, Ahrefs, HubSpot',
                'seller_notes' => 'Team of 4 contractors willing to stay. All SOPs documented.',
                'status' => 'approved',
                'featured' => false,
            ],
            [
                'user_id' => $users[2]->id,
                'category_id' => $categories['app']->id,
                'title' => 'MealPrep AI - Nutrition Planning App',
                'description' => 'AI-powered meal planning mobile app with 15,000+ downloads. Freemium model with 8% conversion to premium.',
                'url' => 'https://mealprepai.app',
                'asking_price' => 210000,
                'monthly_revenue' => 9500,
                'monthly_profit' => 7100,
                'monthly_traffic' => 28000,
                'age_months' => 14,
                'monetization' => 'Freemium, In-App Purchases',
                'tech_stack' => 'React Native, Python, Firebase',
                'seller_notes' => 'App on both iOS and Android. Growing organically through word of mouth.',
                'status' => 'approved',
                'featured' => false,
            ],
        ];

        $createdListings = [];
        foreach ($listings as $listingData) {
            $createdListings[] = Listing::create($listingData);
        }

        // ============================
        // Create Sample Evaluations
        // ============================
        Evaluation::create([
            'user_id' => $users[3]->id,
            'business_name' => 'GreenTech Solutions',
            'url' => 'https://greentech.io',
            'category' => 'SaaS',
            'age_months' => 15,
            'monthly_revenue' => 8000,
            'monthly_profit' => 5500,
            'monthly_traffic' => 25000,
            'asking_price' => 200000,
            'monetization' => 'Subscription',
            'tech_stack' => 'Vue.js, Laravel, AWS',
            'description' => 'Environmental compliance SaaS for small businesses.',
            'contact_name' => 'Emily Davis',
            'contact_email' => 'emily@example.com',
            'status' => 'pending',
        ]);

        Evaluation::create([
            'user_id' => $users[4]->id,
            'business_name' => 'FoodieHub',
            'url' => 'https://foodiehub.com',
            'category' => 'Content',
            'age_months' => 30,
            'monthly_revenue' => 5500,
            'monthly_profit' => 4200,
            'monthly_traffic' => 180000,
            'monetization' => 'Advertising',
            'description' => 'Popular food blog with recipe database.',
            'contact_name' => 'Alex Brown',
            'contact_email' => 'alex@example.com',
            'status' => 'reviewed',
        ]);

        // ============================
        // Create Sample Inquiries
        // ============================
        Inquiry::create([
            'listing_id' => $createdListings[0]->id,
            'user_id' => $users[3]->id,
            'name' => 'Emily Davis',
            'email' => 'emily@example.com',
            'message' => 'Very interested in CloudSync Pro. Can we schedule a call to discuss the acquisition terms?',
            'status' => 'pending',
        ]);

        Inquiry::create([
            'listing_id' => $createdListings[1]->id,
            'user_id' => $users[4]->id,
            'name' => 'Alex Brown',
            'email' => 'alex@example.com',
            'message' => 'Would like to see more detailed financial reports for FitGear Direct.',
            'status' => 'responded',
        ]);

        // ============================
        // Saved Listings
        // ============================
        $users[0]->savedListings()->attach([
            $createdListings[1]->id,
            $createdListings[2]->id,
            $createdListings[3]->id,
        ]);

        $users[3]->savedListings()->attach([
            $createdListings[0]->id,
            $createdListings[4]->id,
        ]);

        echo "Database seeded successfully!\n";
        echo "Admin login: admin@sally.com / password\n";
        echo "User login: john@example.com / password\n";
    }
}
