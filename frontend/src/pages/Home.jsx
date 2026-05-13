import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiSearch, FiArrowRight, FiTrendingUp, FiShield, FiDollarSign,
  FiUsers, FiStar, FiCheckCircle, FiChevronDown, FiChevronUp,
  FiTarget, FiZap, FiAward, FiBarChart2
} from 'react-icons/fi';
import ListingCard from '../components/marketplace/ListingCard';
import { sampleListings, sampleTestimonials, sampleStats, sampleFAQs } from '../utils/sampleData';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const featuredListings = sampleListings.filter(l => l.featured);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(0)}M+`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
    return num.toLocaleString();
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-grid-pattern" />
        </div>
        <div className="container hero-content">
          <div className="hero-badge animate-fade-in-up">
            <FiZap /> Trusted by 12,000+ Entrepreneurs
          </div>
          <h1 className="hero-title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Buy and Sell <br />
            <span className="text-gradient">Profitable Online Businesses</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            The premier marketplace connecting serious buyers with vetted, profitable online businesses.
            Skip the startup grind — acquire a proven business today.
          </p>

          <form className="hero-search animate-fade-in-up" style={{ animationDelay: '0.3s' }} onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search by business type, niche, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg search-btn">
              Search <FiArrowRight />
            </button>
          </form>

          <div className="hero-stats animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="hero-stat">
              <span className="hero-stat-value">{sampleStats.totalListings}</span>
              <span className="hero-stat-label">Active Listings</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">{sampleStats.totalSold}</span>
              <span className="hero-stat-label">Businesses Sold</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">{formatNumber(sampleStats.totalVolume)}</span>
              <span className="hero-stat-label">Total Volume</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">{formatNumber(sampleStats.totalUsers)}</span>
              <span className="hero-stat-label">Members</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-badges section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon"><FiShield /></div>
              <span>Verified Financials</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><FiCheckCircle /></div>
              <span>Vetted Sellers</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><FiDollarSign /></div>
              <span>Secure Transactions</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><FiUsers /></div>
              <span>Expert Support</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><FiAward /></div>
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Listings</h2>
              <p className="section-subtitle">
                Hand-picked profitable businesses ready for acquisition
              </p>
            </div>
            <Link to="/marketplace" className="btn btn-secondary">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="featured-grid">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              From discovery to acquisition, we streamline every step
            </p>
          </div>
          <div className="process-grid">
            <div className="process-card">
              <div className="process-number">01</div>
              <div className="process-icon"><FiSearch /></div>
              <h3>Discover</h3>
              <p>Browse our curated marketplace of vetted online businesses across multiple categories and niches.</p>
            </div>
            <div className="process-connector" />
            <div className="process-card">
              <div className="process-number">02</div>
              <div className="process-icon"><FiBarChart2 /></div>
              <h3>Analyze</h3>
              <p>Access detailed financials, traffic data, and business metrics to make informed decisions.</p>
            </div>
            <div className="process-connector" />
            <div className="process-card">
              <div className="process-number">03</div>
              <div className="process-icon"><FiTarget /></div>
              <h3>Negotiate</h3>
              <p>Connect with sellers, discuss terms, and negotiate the best deal with our expert guidance.</p>
            </div>
            <div className="process-connector" />
            <div className="process-card">
              <div className="process-number">04</div>
              <div className="process-icon"><FiCheckCircle /></div>
              <h3>Acquire</h3>
              <p>Complete the transaction securely with our escrow service and full asset transfer support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-us">
        <div className="container">
          <div className="why-us-grid">
            <div className="why-us-content">
              <h2 className="section-title">Why Choose Sally?</h2>
              <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                We're not just a marketplace — we're your partner in building wealth through online business acquisitions.
              </p>
              <div className="why-us-features">
                <div className="why-feature">
                  <div className="why-feature-icon"><FiShield /></div>
                  <div>
                    <h4>Rigorous Vetting</h4>
                    <p>Only 30% of submissions make it to our marketplace. Every listing is thoroughly verified.</p>
                  </div>
                </div>
                <div className="why-feature">
                  <div className="why-feature-icon"><FiTrendingUp /></div>
                  <div>
                    <h4>Verified Financials</h4>
                    <p>Revenue, profit, and traffic data verified by our team before listing goes live.</p>
                  </div>
                </div>
                <div className="why-feature">
                  <div className="why-feature-icon"><FiUsers /></div>
                  <div>
                    <h4>Expert Advisory</h4>
                    <p>Dedicated advisors guide you through every step of buying or selling process.</p>
                  </div>
                </div>
                <div className="why-feature">
                  <div className="why-feature-icon"><FiDollarSign /></div>
                  <div>
                    <h4>Secure Escrow</h4>
                    <p>Protected transactions with escrow service. Your money is safe until assets transfer.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-us-stats">
              <div className="big-stat-card">
                <span className="big-stat-value">$125M+</span>
                <span className="big-stat-label">Total Transaction Volume</span>
              </div>
              <div className="big-stat-card">
                <span className="big-stat-value">98%</span>
                <span className="big-stat-label">Client Satisfaction</span>
              </div>
              <div className="big-stat-card">
                <span className="big-stat-value">30 Days</span>
                <span className="big-stat-label">Average Time to Close</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="section seller-cta-section">
        <div className="container">
          <div className="cta-card seller-cta">
            <div className="cta-glow" />
            <div className="cta-content">
              <h2>Ready to Sell Your Online Business?</h2>
              <p>
                Get a free evaluation and list your business in front of thousands of qualified buyers.
                Our expert team will guide you through the entire process.
              </p>
              <div className="cta-actions">
                <Link to="/evaluate" className="btn btn-accent btn-lg">
                  Get Free Evaluation <FiArrowRight />
                </Link>
                <Link to="/sell" className="btn btn-secondary btn-lg">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Join thousands of satisfied buyers and sellers
            </p>
          </div>
          <div className="testimonial-grid">
            {sampleTestimonials.map((t) => (
              <div key={t.id} className="testimonial-card card">
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} className="star-filled" />
                  ))}
                </div>
                <p className="testimonial-text">&ldquo;{t.content}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Everything you need to know about buying and selling on Sally
            </p>
          </div>
          <div className="faq-list">
            {sampleFAQs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'faq-item-open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section final-cta">
        <div className="container text-center">
          <h2 className="section-title" style={{ fontSize: '2.75rem' }}>
            Start Your Journey Today
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem', maxWidth: '500px' }}>
            Whether you're buying your first online business or selling your life's work, we're here to help.
          </p>
          <div className="final-cta-buttons">
            <Link to="/marketplace" className="btn btn-primary btn-lg">
              Browse Marketplace <FiArrowRight />
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
