import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiDollarSign, FiTrendingUp, FiUsers, FiCalendar, FiGlobe,
  FiHeart, FiMail, FiArrowLeft, FiExternalLink, FiClock, FiBarChart2,
  FiLayers, FiCode, FiCheckCircle, FiSend
} from 'react-icons/fi';
import { sampleListings } from '../utils/sampleData';
import './ListingDetails.css';

export default function ListingDetails() {
  const { id } = useParams();
  const listing = sampleListings.find(l => l.id === parseInt(id));
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '' });
  const [inquirySent, setInquirySent] = useState(false);

  if (!listing) {
    return (
      <div className="listing-details-page">
        <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
          <h2>Listing not found</h2>
          <Link to="/marketplace" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => `$${amount?.toLocaleString() || 0}`;
  const multiple = listing.asking_price && listing.monthly_profit
    ? (listing.asking_price / (listing.monthly_profit * 12)).toFixed(1)
    : '—';

  const handleInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setShowInquiry(false), 2000);
  };

  return (
    <div className="listing-details-page">
      {/* Breadcrumb */}
      <div className="details-breadcrumb">
        <div className="container">
          <Link to="/marketplace" className="breadcrumb-back">
            <FiArrowLeft /> Back to Marketplace
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="details-header">
        <div className="container">
          <div className="details-header-content">
            <div className="details-header-info">
              <div className="details-badges">
                <span className="badge badge-primary">{listing.category}</span>
                {listing.featured && <span className="badge badge-warning">⭐ Featured</span>}
                <span className="badge badge-success">Verified</span>
              </div>
              <h1 className="details-title">{listing.title}</h1>
              <div className="details-meta">
                <span><FiGlobe /> {listing.url}</span>
                <span><FiCalendar /> {listing.age_months} months old</span>
                <span><FiLayers /> {listing.monetization}</span>
              </div>
            </div>
            <div className="details-header-actions">
              <div className="asking-price-card">
                <span className="asking-label">Asking Price</span>
                <span className="asking-value">{formatCurrency(listing.asking_price)}</span>
                <span className="asking-multiple">{multiple}x Annual Multiple</span>
              </div>
              <div className="details-action-buttons">
                <button
                  className="btn btn-primary btn-lg details-inquiry-btn"
                  onClick={() => setShowInquiry(true)}
                >
                  <FiMail /> Submit Inquiry
                </button>
                <button className="btn btn-secondary">
                  <FiHeart /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container details-content">
        <div className="details-grid">
          {/* Main Content */}
          <div className="details-main">
            {/* Key Metrics */}
            <div className="details-section">
              <h2 className="details-section-title">Key Metrics</h2>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-icon revenue-icon"><FiTrendingUp /></div>
                  <div className="metric-info">
                    <span className="metric-label">Monthly Revenue</span>
                    <span className="metric-value">{formatCurrency(listing.monthly_revenue)}</span>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon profit-icon"><FiDollarSign /></div>
                  <div className="metric-info">
                    <span className="metric-label">Monthly Profit</span>
                    <span className="metric-value">{formatCurrency(listing.monthly_profit)}</span>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon traffic-icon"><FiUsers /></div>
                  <div className="metric-info">
                    <span className="metric-label">Monthly Traffic</span>
                    <span className="metric-value">{listing.monthly_traffic?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon"><FiBarChart2 /></div>
                  <div className="metric-info">
                    <span className="metric-label">Profit Margin</span>
                    <span className="metric-value">
                      {((listing.monthly_profit / listing.monthly_revenue) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="details-section">
              <h2 className="details-section-title">Business Overview</h2>
              <div className="details-description">
                <p>{listing.description}</p>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="details-section">
              <h2 className="details-section-title">Financial Summary</h2>
              <div className="financial-table">
                <div className="financial-row">
                  <span>Monthly Revenue</span>
                  <span className="financial-value">{formatCurrency(listing.monthly_revenue)}</span>
                </div>
                <div className="financial-row">
                  <span>Monthly Profit</span>
                  <span className="financial-value positive">{formatCurrency(listing.monthly_profit)}</span>
                </div>
                <div className="financial-row">
                  <span>Annual Revenue</span>
                  <span className="financial-value">{formatCurrency(listing.monthly_revenue * 12)}</span>
                </div>
                <div className="financial-row">
                  <span>Annual Profit</span>
                  <span className="financial-value positive">{formatCurrency(listing.monthly_profit * 12)}</span>
                </div>
                {listing.financials?.expenses && (
                  <>
                    <div className="financial-divider" />
                    <h4 className="financial-subheading">Monthly Expenses</h4>
                    {Object.entries(listing.financials.expenses).map(([key, value]) => (
                      <div className="financial-row" key={key}>
                        <span style={{ textTransform: 'capitalize' }}>{key}</span>
                        <span className="financial-value expense">{formatCurrency(value)}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Revenue Trend */}
              {listing.financials?.revenue_trend && (
                <div className="trend-section">
                  <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>6-Month Revenue Trend</h4>
                  <div className="trend-chart">
                    {listing.financials.revenue_trend.map((val, i) => {
                      const max = Math.max(...listing.financials.revenue_trend);
                      const pct = (val / max) * 100;
                      return (
                        <div key={i} className="trend-bar-wrapper">
                          <div
                            className="trend-bar"
                            style={{ height: `${pct}%` }}
                          />
                          <span className="trend-label">M{i + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Traffic Details */}
            <div className="details-section">
              <h2 className="details-section-title">Traffic Overview</h2>
              <div className="traffic-grid">
                <div className="traffic-sources">
                  <h4>Traffic Sources</h4>
                  {listing.traffic_details?.sources && (
                    <div className="source-bars">
                      {Object.entries(listing.traffic_details.sources).map(([source, pct]) => (
                        <div key={source} className="source-item">
                          <div className="source-header">
                            <span style={{ textTransform: 'capitalize' }}>{source}</span>
                            <span>{pct}%</span>
                          </div>
                          <div className="source-bar-bg">
                            <div className="source-bar-fill" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="traffic-countries">
                  <h4>Top Countries</h4>
                  <div className="country-list">
                    {listing.traffic_details?.top_countries?.map((country, i) => (
                      <div key={country} className="country-item">
                        <span className="country-rank">#{i + 1}</span>
                        <span>{country}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="details-section">
              <h2 className="details-section-title">Technology Stack</h2>
              <div className="tech-stack">
                {listing.tech_stack?.split(',').map((tech, i) => (
                  <span key={i} className="tech-tag">
                    <FiCode /> {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Seller Notes */}
            {listing.seller_notes && (
              <div className="details-section">
                <h2 className="details-section-title">Seller Notes</h2>
                <div className="seller-notes">
                  <p>{listing.seller_notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="details-sidebar">
            <div className="sidebar-card">
              <h3>Interested in this business?</h3>
              <p>Submit an inquiry to get more details and connect with the seller.</p>
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => setShowInquiry(true)}
              >
                <FiMail /> Submit Inquiry
              </button>
            </div>

            <div className="sidebar-card">
              <h3>Quick Stats</h3>
              <div className="sidebar-stats">
                <div className="sidebar-stat">
                  <FiClock />
                  <div>
                    <span className="sidebar-stat-label">Age</span>
                    <span className="sidebar-stat-value">{listing.age_months} months</span>
                  </div>
                </div>
                <div className="sidebar-stat">
                  <FiLayers />
                  <div>
                    <span className="sidebar-stat-label">Monetization</span>
                    <span className="sidebar-stat-value">{listing.monetization}</span>
                  </div>
                </div>
                <div className="sidebar-stat">
                  <FiBarChart2 />
                  <div>
                    <span className="sidebar-stat-label">Multiple</span>
                    <span className="sidebar-stat-value">{multiple}x</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-card sidebar-safety">
              <FiCheckCircle className="safety-icon" />
              <h4>Sally Verified</h4>
              <p>This listing has been vetted by our team. Financials and traffic data are verified.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="modal-overlay" onClick={() => setShowInquiry(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Submit Inquiry</h2>
            <p className="modal-subtitle">Express your interest in {listing.title}</p>
            {inquirySent ? (
              <div className="alert alert-success">
                <FiCheckCircle /> Inquiry sent successfully! We'll be in touch.
              </div>
            ) : (
              <form onSubmit={handleInquiry}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input form-textarea"
                    required
                    placeholder="Tell us about your interest and any questions..."
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <FiSend /> Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
