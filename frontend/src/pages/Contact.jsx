import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle } from 'react-icons/fi';
import './StaticPages.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="static-page contact-page">
      <section className="static-hero">
        <div className="container">
          <h1 className="static-hero-title">Get In <span className="text-gradient">Touch</span></h1>
          <p className="static-hero-subtitle">
            Have questions? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-section">
              {submitted ? (
                <div className="contact-success">
                  <FiCheckCircle className="success-icon" />
                  <h2>Message Sent!</h2>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h2 style={{ marginBottom: '1.5rem' }}>Send us a message</h2>
                  <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input type="text" className="form-input" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input type="email" className="form-input" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <input type="text" className="form-input" required value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-input form-textarea" required rows={6} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help you?" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg">
                    <FiSend /> Send Message
                  </button>
                </form>
              )}
            </div>

            <div className="contact-info">
              <div className="contact-info-card card">
                <h3>Contact Information</h3>
                <div className="contact-details">
                  <div className="contact-detail">
                    <FiMail className="contact-detail-icon" />
                    <div>
                      <span className="contact-detail-label">Email</span>
                      <a href="mailto:hello@sally.com">hello@sally.com</a>
                    </div>
                  </div>
                  <div className="contact-detail">
                    <FiPhone className="contact-detail-icon" />
                    <div>
                      <span className="contact-detail-label">Phone</span>
                      <a href="tel:+15551234567">+1 (555) 123-4567</a>
                    </div>
                  </div>
                  <div className="contact-detail">
                    <FiMapPin className="contact-detail-icon" />
                    <div>
                      <span className="contact-detail-label">Office</span>
                      <span>123 Market St, San Francisco, CA 94105</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-info-card card">
                <h3>Business Hours</h3>
                <div className="business-hours">
                  <div className="hours-row"><span>Monday - Friday</span><span>9:00 AM - 6:00 PM PST</span></div>
                  <div className="hours-row"><span>Saturday</span><span>10:00 AM - 4:00 PM PST</span></div>
                  <div className="hours-row"><span>Sunday</span><span>Closed</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
