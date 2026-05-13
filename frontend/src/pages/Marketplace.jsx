import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiX, FiGrid, FiList, FiChevronDown } from 'react-icons/fi';
import ListingCard from '../components/marketplace/ListingCard';
import { sampleListings, sampleCategories } from '../utils/sampleData';
import './Marketplace.css';

export default function Marketplace() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState('');
  const [revenueRange, setRevenueRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const filteredListings = useMemo(() => {
    let results = [...sampleListings].filter(l => l.status === 'approved');

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q)
      );
    }

    if (category) {
      results = results.filter(l => l.category.toLowerCase() === category.toLowerCase());
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      results = results.filter(l => {
        if (max) return l.asking_price >= min && l.asking_price <= max;
        return l.asking_price >= min;
      });
    }

    if (revenueRange) {
      const [min, max] = revenueRange.split('-').map(Number);
      results = results.filter(l => {
        if (max) return l.monthly_revenue >= min && l.monthly_revenue <= max;
        return l.monthly_revenue >= min;
      });
    }

    switch (sortBy) {
      case 'price-asc': results.sort((a, b) => a.asking_price - b.asking_price); break;
      case 'price-desc': results.sort((a, b) => b.asking_price - a.asking_price); break;
      case 'revenue-desc': results.sort((a, b) => b.monthly_revenue - a.monthly_revenue); break;
      case 'traffic-desc': results.sort((a, b) => b.monthly_traffic - a.monthly_traffic); break;
      default: break;
    }

    return results;
  }, [search, category, priceRange, revenueRange, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setPriceRange('');
    setRevenueRange('');
    setSortBy('newest');
  };

  const hasActiveFilters = search || category || priceRange || revenueRange;

  return (
    <div className="marketplace-page">
      <section className="marketplace-hero">
        <div className="container">
          <h1 className="marketplace-title">Marketplace</h1>
          <p className="marketplace-subtitle">
            Browse {sampleListings.length}+ vetted online businesses for sale
          </p>

          <div className="marketplace-search-bar">
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search listings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className={`btn btn-secondary filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters
              {hasActiveFilters && <span className="filter-count">!</span>}
            </button>
          </div>
        </div>
      </section>

      <div className="container marketplace-content">
        {showFilters && (
          <div className="filters-panel animate-fade-in">
            <div className="filters-grid">
              <div className="filter-group">
                <label className="form-label">Category</label>
                <select
                  className="form-input form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {sampleCategories.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.count})</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="form-label">Price Range</label>
                <select
                  className="form-input form-select"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="0-100000">Under $100K</option>
                  <option value="100000-250000">$100K - $250K</option>
                  <option value="250000-500000">$250K - $500K</option>
                  <option value="500000-1000000">$500K - $1M</option>
                  <option value="1000000-">$1M+</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="form-label">Monthly Revenue</label>
                <select
                  className="form-input form-select"
                  value={revenueRange}
                  onChange={(e) => setRevenueRange(e.target.value)}
                >
                  <option value="">Any Revenue</option>
                  <option value="0-5000">Under $5K</option>
                  <option value="5000-10000">$5K - $10K</option>
                  <option value="10000-25000">$10K - $25K</option>
                  <option value="25000-50000">$25K - $50K</option>
                  <option value="50000-">$50K+</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="form-label">Sort By</label>
                <select
                  className="form-input form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="revenue-desc">Highest Revenue</option>
                  <option value="traffic-desc">Most Traffic</option>
                </select>
              </div>
            </div>
            {hasActiveFilters && (
              <button className="btn btn-ghost clear-filters" onClick={clearFilters}>
                <FiX /> Clear All Filters
              </button>
            )}
          </div>
        )}

        <div className="marketplace-toolbar">
          <span className="results-count">
            {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''} found
          </span>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FiList />
            </button>
          </div>
        </div>

        {filteredListings.length > 0 ? (
          <div className={`listings-grid ${viewMode === 'list' ? 'listings-list' : ''}`}>
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No listings found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
