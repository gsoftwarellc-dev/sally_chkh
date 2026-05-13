import { Link } from 'react-router-dom';
import { FiTrendingUp, FiDollarSign, FiUsers, FiHeart, FiExternalLink } from 'react-icons/fi';
import './ListingCard.css';

export default function ListingCard({ listing, onSave, isSaved = false }) {
  const formatCurrency = (amount) => {
    if (!amount) return '$0';
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const formatTraffic = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toLocaleString();
  };

  const getCategoryColor = (category) => {
    const colors = {
      'SaaS': 'badge-primary',
      'E-Commerce': 'badge-success',
      'Content': 'badge-info',
      'Marketplace': 'badge-warning',
      'Agency': 'badge-danger',
      'App': 'badge-primary',
    };
    return colors[category] || 'badge-primary';
  };

  return (
    <div className="listing-card">
      <div className="listing-card-header">
        <div className="listing-card-badges">
          <span className={`badge ${getCategoryColor(listing.category)}`}>
            {listing.category || 'Other'}
          </span>
          {listing.featured && (
            <span className="badge badge-warning">⭐ Featured</span>
          )}
        </div>
        {onSave && (
          <button
            className={`save-btn ${isSaved ? 'save-btn-active' : ''}`}
            onClick={(e) => { e.preventDefault(); onSave(listing.id); }}
            aria-label="Save listing"
          >
            <FiHeart />
          </button>
        )}
      </div>

      <Link to={`/listing/${listing.id}`} className="listing-card-body">
        <h3 className="listing-card-title">{listing.title}</h3>
        <p className="listing-card-description">
          {listing.description?.substring(0, 120)}...
        </p>

        <div className="listing-card-stats">
          <div className="stat-item">
            <div className="stat-icon price-icon">
              <FiDollarSign />
            </div>
            <div>
              <span className="stat-label">Asking Price</span>
              <span className="stat-value">{formatCurrency(listing.asking_price)}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon revenue-icon">
              <FiTrendingUp />
            </div>
            <div>
              <span className="stat-label">Monthly Revenue</span>
              <span className="stat-value">{formatCurrency(listing.monthly_revenue)}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon profit-icon">
              <FiDollarSign />
            </div>
            <div>
              <span className="stat-label">Monthly Profit</span>
              <span className="stat-value">{formatCurrency(listing.monthly_profit)}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon traffic-icon">
              <FiUsers />
            </div>
            <div>
              <span className="stat-label">Monthly Traffic</span>
              <span className="stat-value">{formatTraffic(listing.monthly_traffic)}</span>
            </div>
          </div>
        </div>

        <div className="listing-card-footer">
          <span className="listing-card-cta">
            View Details <FiExternalLink />
          </span>
          <span className="listing-card-multiple">
            {listing.asking_price && listing.monthly_profit
              ? `${(listing.asking_price / (listing.monthly_profit * 12)).toFixed(1)}x Multiple`
              : '—'
            }
          </span>
        </div>
      </Link>
    </div>
  );
}
