import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiUsers, FiList, FiFileText, FiMessageSquare,
  FiLayers, FiLogOut, FiShield, FiCheck, FiX, FiEdit, FiTrash2
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { sampleListings, sampleCategories } from '../../utils/sampleData';
import '../user/Dashboard.css';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [listingFilter, setListingFilter] = useState('all');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const sidebarItems = [
    { id: 'overview', icon: <FiGrid />, label: 'Overview', path: '/admin' },
    { id: 'listings', icon: <FiList />, label: 'Listings', path: '/admin/listings' },
    { id: 'users', icon: <FiUsers />, label: 'Users', path: '/admin/users' },
    { id: 'evaluations', icon: <FiFileText />, label: 'Evaluations', path: '/admin/evaluations' },
    { id: 'inquiries', icon: <FiMessageSquare />, label: 'Inquiries', path: '/admin/inquiries' },
    { id: 'categories', icon: <FiLayers />, label: 'Categories', path: '/admin/categories' },
  ];

  const isActive = (path) => location.pathname === path;

  const demoUsers = [
    { id: 1, name: 'Admin User', email: 'admin@sally.com', role: 'admin', listings: 0, joined: '2025-01-01' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user', listings: 3, joined: '2025-06-15' },
    { id: 3, name: 'Sarah Williams', email: 'sarah@example.com', role: 'user', listings: 2, joined: '2025-08-22' },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', listings: 2, joined: '2025-09-10' },
    { id: 5, name: 'Emily Davis', email: 'emily@example.com', role: 'user', listings: 1, joined: '2025-11-05' },
  ];

  const demoEvaluations = [
    { id: 1, business: 'GreenTech Solutions', url: 'greentech.io', user: 'Alex Brown', revenue: '$8,000/mo', status: 'pending', date: '2026-05-01' },
    { id: 2, business: 'FoodieHub', url: 'foodiehub.com', user: 'Lisa Park', revenue: '$5,500/mo', status: 'reviewed', date: '2026-04-28' },
    { id: 3, business: 'CodeBoost', url: 'codeboost.dev', user: 'James Wilson', revenue: '$12,000/mo', status: 'pending', date: '2026-05-05' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar admin-sidebar">
          <div className="sidebar-user">
            <div className="sidebar-avatar admin-avatar"><FiShield /></div>
            <div>
              <strong>Admin Panel</strong>
              <span className="sidebar-role">{user?.name || 'Admin'}</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {sidebarItems.map(item => (
              <Link key={item.id} to={item.path}
                className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}>
                {item.icon} {item.label}
              </Link>
            ))}
            <button className="sidebar-link logout-link" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </nav>
        </aside>

        <main className="dashboard-main">
          {/* Overview */}
          {location.pathname === '/admin' && (
            <div>
              <div className="dashboard-welcome">
                <h1>Admin Dashboard</h1>
                <p>Manage your marketplace and monitor activity.</p>
              </div>
              <div className="stats-row">
                <div className="dash-stat-card admin-stat">
                  <span className="dash-stat-number">847</span>
                  <span className="dash-stat-label">Total Listings</span>
                </div>
                <div className="dash-stat-card admin-stat">
                  <span className="dash-stat-number">12,400</span>
                  <span className="dash-stat-label">Total Users</span>
                </div>
                <div className="dash-stat-card admin-stat">
                  <span className="dash-stat-number">23</span>
                  <span className="dash-stat-label">Pending Reviews</span>
                </div>
                <div className="dash-stat-card admin-stat">
                  <span className="dash-stat-number">$125M</span>
                  <span className="dash-stat-label">Total Volume</span>
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="dash-section">
                  <div className="dash-section-header"><h2>Recent Submissions</h2></div>
                  <div className="dash-table">
                    <table>
                      <thead><tr><th>Business</th><th>User</th><th>Revenue</th><th>Status</th><th>Actions</th></tr></thead>
                      <tbody>
                        {demoEvaluations.map(e => (
                          <tr key={e.id}>
                            <td className="dash-link">{e.business}</td>
                            <td>{e.user}</td>
                            <td>{e.revenue}</td>
                            <td><span className={`badge ${e.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>{e.status}</span></td>
                            <td>
                              <div className="action-btns">
                                <button className="action-btn approve" title="Approve"><FiCheck /></button>
                                <button className="action-btn reject" title="Reject"><FiX /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="dash-section">
                  <div className="dash-section-header"><h2>Recent Users</h2></div>
                  <div className="dash-table">
                    <table>
                      <thead><tr><th>Name</th><th>Role</th><th>Listings</th><th>Joined</th></tr></thead>
                      <tbody>
                        {demoUsers.slice(0, 4).map(u => (
                          <tr key={u.id}>
                            <td>{u.name}</td>
                            <td><span className={`badge ${u.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>{u.role}</span></td>
                            <td>{u.listings}</td>
                            <td>{u.joined}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Listings Management */}
          {location.pathname === '/admin/listings' && (
            <div>
              <div className="dash-page-header">
                <h1>Manage Listings</h1>
                <div className="admin-filter-row">
                  <select className="form-input form-select" style={{ width: 'auto' }}
                    value={listingFilter} onChange={(e) => setListingFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>
              <div className="dash-table">
                <table>
                  <thead><tr><th>Title</th><th>Category</th><th>Price</th><th>Revenue</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {sampleListings.map(l => (
                      <tr key={l.id}>
                        <td><Link to={`/listing/${l.id}`} className="dash-link">{l.title}</Link></td>
                        <td><span className="badge badge-primary">{l.category}</span></td>
                        <td>${l.asking_price?.toLocaleString()}</td>
                        <td>${l.monthly_revenue?.toLocaleString()}/mo</td>
                        <td><span className="badge badge-success">{l.status}</span></td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn approve" title="Approve"><FiCheck /></button>
                            <button className="action-btn reject" title="Reject"><FiX /></button>
                            <button className="action-btn edit" title="Edit"><FiEdit /></button>
                            <button className="action-btn delete" title="Delete"><FiTrash2 /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Management */}
          {location.pathname === '/admin/users' && (
            <div>
              <div className="dash-page-header"><h1>Manage Users</h1></div>
              <div className="dash-table">
                <table>
                  <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Listings</th><th>Joined</th><th>Actions</th></tr></thead>
                  <tbody>
                    {demoUsers.map(u => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td><span className={`badge ${u.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>{u.role}</span></td>
                        <td>{u.listings}</td>
                        <td>{u.joined}</td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn edit" title="Edit"><FiEdit /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Evaluations */}
          {location.pathname === '/admin/evaluations' && (
            <div>
              <div className="dash-page-header"><h1>Submitted Evaluations</h1></div>
              <div className="dash-table">
                <table>
                  <thead><tr><th>Business</th><th>URL</th><th>Submitted By</th><th>Revenue</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>
                    {demoEvaluations.map(e => (
                      <tr key={e.id}>
                        <td className="dash-link">{e.business}</td>
                        <td>{e.url}</td>
                        <td>{e.user}</td>
                        <td>{e.revenue}</td>
                        <td><span className={`badge ${e.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>{e.status}</span></td>
                        <td>{e.date}</td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn approve"><FiCheck /></button>
                            <button className="action-btn reject"><FiX /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Inquiries */}
          {location.pathname === '/admin/inquiries' && (
            <div>
              <div className="dash-page-header"><h1>All Inquiries</h1></div>
              <div className="dash-table">
                <table>
                  <thead><tr><th>Listing</th><th>From</th><th>Email</th><th>Message</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    <tr>
                      <td>CloudSync Pro</td>
                      <td>John Doe</td>
                      <td>john@example.com</td>
                      <td>Interested in acquisition...</td>
                      <td><span className="badge badge-warning">Pending</span></td>
                      <td>2026-04-25</td>
                    </tr>
                    <tr>
                      <td>FitGear Direct</td>
                      <td>Emily Davis</td>
                      <td>emily@example.com</td>
                      <td>Looking for more financial info...</td>
                      <td><span className="badge badge-success">Responded</span></td>
                      <td>2026-04-22</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Categories */}
          {location.pathname === '/admin/categories' && (
            <div>
              <div className="dash-page-header">
                <h1>Manage Categories</h1>
                <button className="btn btn-primary btn-sm">Add Category</button>
              </div>
              <div className="dash-table">
                <table>
                  <thead><tr><th>Name</th><th>Slug</th><th>Listings</th><th>Actions</th></tr></thead>
                  <tbody>
                    {sampleCategories.map(c => (
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td><code style={{ color: 'var(--primary-400)', fontSize: '0.875rem' }}>{c.slug}</code></td>
                        <td>{c.count}</td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn edit"><FiEdit /></button>
                            <button className="action-btn delete"><FiTrash2 /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
