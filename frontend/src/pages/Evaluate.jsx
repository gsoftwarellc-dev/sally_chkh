import { useState } from 'react';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import { sampleCategories } from '../utils/sampleData';
import './Evaluate.css';

export default function Evaluate() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    business_name: '', url: '', category: '', age_months: '',
    monthly_revenue: '', monthly_profit: '', monthly_traffic: '',
    asking_price: '', monetization: '', tech_stack: '', description: '',
    name: '', email: '', phone: '',
  });

  const updateForm = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="evaluate-page">
        <div className="container">
          <div className="evaluate-success">
            <FiCheckCircle className="success-icon" />
            <h2>Evaluation Submitted!</h2>
            <p>Thank you for submitting your business for evaluation. Our team will review your submission and get back to you within 3-5 business days with a comprehensive valuation.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="evaluate-page">
      <div className="container">
        <div className="evaluate-header">
          <h1 className="section-title">Free Business Evaluation</h1>
          <p className="section-subtitle">
            Tell us about your online business and receive a professional valuation from our expert team.
          </p>
        </div>

        <form className="evaluate-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="form-section-title">Business Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Business Name *</label>
                <input type="text" className="form-input" required value={form.business_name}
                  onChange={(e) => updateForm('business_name', e.target.value)}
                  placeholder="e.g., My Awesome SaaS" />
              </div>
              <div className="form-group">
                <label className="form-label">Website URL *</label>
                <input type="url" className="form-input" required value={form.url}
                  onChange={(e) => updateForm('url', e.target.value)}
                  placeholder="https://example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-input form-select" required value={form.category}
                  onChange={(e) => updateForm('category', e.target.value)}>
                  <option value="">Select Category</option>
                  {sampleCategories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Business Age (months) *</label>
                <input type="number" className="form-input" required value={form.age_months}
                  onChange={(e) => updateForm('age_months', e.target.value)}
                  placeholder="e.g., 24" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Financial Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Monthly Revenue ($) *</label>
                <input type="number" className="form-input" required value={form.monthly_revenue}
                  onChange={(e) => updateForm('monthly_revenue', e.target.value)}
                  placeholder="e.g., 10000" />
              </div>
              <div className="form-group">
                <label className="form-label">Monthly Profit ($) *</label>
                <input type="number" className="form-input" required value={form.monthly_profit}
                  onChange={(e) => updateForm('monthly_profit', e.target.value)}
                  placeholder="e.g., 7000" />
              </div>
              <div className="form-group">
                <label className="form-label">Monthly Traffic</label>
                <input type="number" className="form-input" value={form.monthly_traffic}
                  onChange={(e) => updateForm('monthly_traffic', e.target.value)}
                  placeholder="e.g., 50000" />
              </div>
              <div className="form-group">
                <label className="form-label">Desired Asking Price ($)</label>
                <input type="number" className="form-input" value={form.asking_price}
                  onChange={(e) => updateForm('asking_price', e.target.value)}
                  placeholder="e.g., 250000" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Additional Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Monetization Model</label>
                <select className="form-input form-select" value={form.monetization}
                  onChange={(e) => updateForm('monetization', e.target.value)}>
                  <option value="">Select Model</option>
                  <option value="Subscription">Subscription</option>
                  <option value="Product Sales">Product Sales</option>
                  <option value="Advertising">Advertising</option>
                  <option value="Affiliate">Affiliate</option>
                  <option value="Commission">Commission</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tech Stack</label>
                <input type="text" className="form-input" value={form.tech_stack}
                  onChange={(e) => updateForm('tech_stack', e.target.value)}
                  placeholder="e.g., React, Node.js, AWS" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Business Description *</label>
              <textarea className="form-input form-textarea" required value={form.description}
                onChange={(e) => updateForm('description', e.target.value)}
                placeholder="Describe your business, what makes it unique, and why someone should buy it..."
                rows={5} />
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Your Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input type="text" className="form-input" required value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" className="form-input" required value={form.email}
                  onChange={(e) => updateForm('email', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone (Optional)</label>
                <input type="tel" className="form-input" value={form.phone}
                  onChange={(e) => updateForm('phone', e.target.value)} />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg evaluate-submit">
            <FiSend /> Submit for Evaluation
          </button>
        </form>
      </div>
    </div>
  );
}
