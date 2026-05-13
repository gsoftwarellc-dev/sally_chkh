import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiPhone, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">S</span>
              <span className="logo-text">Sally</span>
            </Link>
            <p className="footer-description">
              The trusted marketplace for buying and selling profitable online businesses.
              Join thousands of entrepreneurs who have found success through our platform.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" className="social-link" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#" className="social-link" aria-label="GitHub"><FiGithub /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Marketplace</h4>
            <ul className="footer-links">
              <li><Link to="/marketplace">Browse Listings</Link></li>
              <li><Link to="/sell">Sell Your Business</Link></li>
              <li><Link to="/evaluate">Free Evaluation</Link></li>
              <li><Link to="/marketplace?category=ecommerce">E-Commerce</Link></li>
              <li><Link to="/marketplace?category=saas">SaaS</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li><FiMail /> <a href="mailto:hello@sally.com">hello@sally.com</a></li>
              <li><FiPhone /> <a href="tel:+15551234567">+1 (555) 123-4567</a></li>
              <li><FiMapPin /> <span>San Francisco, CA</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Sally Marketplace. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
