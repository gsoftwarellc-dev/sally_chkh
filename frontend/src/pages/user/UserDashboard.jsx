import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiList, FiHeart, FiPlus, FiMessageSquare,
  FiUser, FiLogOut, FiChevronRight
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { sampleListings } from '../../utils/sampleData';
import './Dashboard.css';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const userName = user?.name || 'User';
  const myListings = sampleListings.slice(0, 3);
  const savedListings = sampleListings.slice(2, 5);

  const sidebarItems = [
    { id: 'overview', icon: <FiGrid />, label: 'Overview', path: '/dashboard' },
    { id: 'listings', icon: <FiList />, label: 'My Listings', path: '/dashboard/listings' },
    { id: 'saved', icon: <FiHeart />, label: 'Saved Listings', path: '/dashboard/saved' },
    { id: 'inquiries', icon: <FiMessageSquare />, label: 'Inquiries', path: '/dashboard/inquiries' },
    { id: 'profile', icon: <FiUser />, label: 'Profile', path: '/dashboard/profile' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{userName.charAt(0)}</div>
            <div>
              <strong>{userName}</strong>
              <span className="sidebar-role">Member</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {sidebarItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
            <button className="sidebar-link logout-link" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </nav>
        </aside>

        <main className="dashboard-main">
          {location.pathname === '/dashboard' && (
            <div className="dashboard-overview">
              <div className="dashboard-welcome">
                <h1>Welcome back, {userName.split(' ')[0]}!</h1>
                <p>Here's an overview of your activity.</p>
              </div>

              <div className="stats-row">
                <div className="dash-stat-card">
                  <span className="dash-stat-number">{myListings.length}</span>
                  <span className="dash-stat-label">My Listings</span>
                </div>
                <div className="dash-stat-card">
                  <span className="dash-stat-number">{savedListings.length}</span>
                  <span className="dash-stat-label">Saved</span>
                </div>
                <div className="dash-stat-card">
                  <span className="dash-stat-number">5</span>
                  <span className="dash-stat-label">Inquiries</span>
                </div>
                <div className="dash-stat-card">
                  <span className="dash-stat-number">1</span>
                  <span className="dash-stat-label">Pending</span>
                </div>
              </div>

              <div className="dash-section">
                <div className="dash-section-header">
                  <h2>Recent Listings</h2>
                  <Link to="/dashboard/listings" className="btn btn-ghost btn-sm">View All <FiChevronRight /></Link>
                </div>
                <div className="dash-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myListings.map(l => (
                        <tr key={l.id}>
                          <td><Link to={`/listing/${l.id}`} className="dash-link">{l.title}</Link></td>
                          <td><span className="badge badge-primary">{l.category}</span></td>
                          <td>${l.asking_price?.toLocaleString()}</td>
                          <td><span className="badge badge-success">Approved</span></td>
                          <td>{l.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dash-section">
                <div className="dash-section-header">
                  <h2>Quick Actions</h2>
                </div>
                <div className="quick-actions">
                  <Link to="/evaluate" className="quick-action card">
                    <FiPlus className="qa-icon" />
                    <div>
                      <h4>Submit New Website</h4>
                      <p>Get a free evaluation for your business</p>
                    </div>
                  </Link>
                  <Link to="/marketplace" className="quick-action card">
                    <FiHeart className="qa-icon" />
                    <div>
                      <h4>Browse Marketplace</h4>
                      <p>Find your next acquisition</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {location.pathname === '/dashboard/listings' && (
            <div>
              <div className="dash-page-header">
                <h1>My Listings</h1>
                <Link to="/evaluate" className="btn btn-primary btn-sm"><FiPlus /> New Submission</Link>
              </div>
              <div className="dash-table">
                <table>
                  <thead>
                    <tr><th>Title</th><th>Category</th><th>Price</th><th>Revenue</th><th>Status</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {myListings.map(l => (
                      <tr key={l.id}>
                        <td><Link to={`/listing/${l.id}`} className="dash-link">{l.title}</Link></td>
                        <td><span className="badge badge-primary">{l.category}</span></td>
                        <td>${l.asking_price?.toLocaleString()}</td>
                        <td>${l.monthly_revenue?.toLocaleString()}/mo</td>
                        <td><span className="badge badge-success">Approved</span></td>
                        <td>{l.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {location.pathname === '/dashboard/saved' && (
            <div>
              <div className="dash-page-header"><h1>Saved Listings</h1></div>
              <div className="dash-table">
                <table>
                  <thead>
                    <tr><th>Title</th><th>Category</th><th>Price</th><th>Revenue</th><th>Profit</th></tr>
                  </thead>
                  <tbody>
                    {savedListings.map(l => (
                      <tr key={l.id}>
                        <td><Link to={`/listing/${l.id}`} className="dash-link">{l.title}</Link></td>
                        <td><span className="badge badge-primary">{l.category}</span></td>
                        <td>${l.asking_price?.toLocaleString()}</td>
                        <td>${l.monthly_revenue?.toLocaleString()}/mo</td>
                        <td>${l.monthly_profit?.toLocaleString()}/mo</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {location.pathname === '/dashboard/inquiries' && (
            <div>
              <div className="dash-page-header"><h1>My Inquiries</h1></div>
              <div className="dash-table">
                <table>
                  <thead><tr><th>Listing</th><th>Message</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    <tr>
                      <td><Link to="/listing/1" className="dash-link">CloudSync Pro</Link></td>
                      <td>Interested in discussing acquisition terms...</td>
                      <td><span className="badge badge-warning">Pending</span></td>
                      <td>2026-04-25</td>
                    </tr>
                    <tr>
                      <td><Link to="/listing/2" className="dash-link">FitGear Direct</Link></td>
                      <td>Would like to see more financial details...</td>
                      <td><span className="badge badge-success">Responded</span></td>
                      <td>2026-04-22</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {location.pathname === '/dashboard/profile' && (
            <div>
              <div className="dash-page-header"><h1>Edit Profile</h1></div>
              <div className="profile-form-card">
                <form className="profile-form">
                  <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-input" defaultValue={userName} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-input" defaultValue={user?.email} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input type="text" className="form-input" placeholder="Your company" />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label className="form-label">Bio</label>
                    <textarea className="form-input form-textarea" placeholder="Tell us about yourself..." />
                  </div>
                  <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }}>Save Changes</button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
