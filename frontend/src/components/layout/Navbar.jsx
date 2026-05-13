import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiChevronDown, FiGrid, FiShield } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <div className="navbar-logo">
            <span className="logo-icon">S</span>
            <span className="logo-text">Sally</span>
          </div>
        </Link>

        <div className={`navbar-menu ${isMobileOpen ? 'navbar-menu-open' : ''}`}>
          <div className="navbar-links">
            <NavLink to="/" className="nav-link" onClick={closeMobile}>Home</NavLink>
            <NavLink to="/marketplace" className="nav-link" onClick={closeMobile}>Marketplace</NavLink>
            <NavLink to="/sell" className="nav-link" onClick={closeMobile}>Sell</NavLink>
            <NavLink to="/about" className="nav-link" onClick={closeMobile}>About</NavLink>
            <NavLink to="/contact" className="nav-link" onClick={closeMobile}>Contact</NavLink>
          </div>

          <div className="navbar-actions">
            {isAuthenticated ? (
              <div className="profile-dropdown">
                <button
                  className="profile-trigger"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="profile-avatar">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="profile-name">{user?.name?.split(' ')[0]}</span>
                  <FiChevronDown className={`chevron ${isProfileOpen ? 'chevron-open' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="profile-menu">
                    <Link
                      to="/dashboard"
                      className="profile-menu-item"
                      onClick={() => { setIsProfileOpen(false); closeMobile(); }}
                    >
                      <FiGrid /> Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="profile-menu-item"
                        onClick={() => { setIsProfileOpen(false); closeMobile(); }}
                      >
                        <FiShield /> Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/dashboard/profile"
                      className="profile-menu-item"
                      onClick={() => { setIsProfileOpen(false); closeMobile(); }}
                    >
                      <FiUser /> Profile
                    </Link>
                    <button className="profile-menu-item logout-btn" onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-ghost" onClick={closeMobile}>Log In</Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMobile}>Get Started</Link>
              </div>
            )}
          </div>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isMobileOpen && <div className="navbar-overlay" onClick={closeMobile} />}
    </nav>
  );
}
