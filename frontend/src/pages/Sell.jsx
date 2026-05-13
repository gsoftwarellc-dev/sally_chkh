import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight, FiDollarSign, FiTrendingUp, FiShield, FiClock } from 'react-icons/fi';
import './Sell.css';

export default function Sell() {
  return (
    <div className="sell-page">
      <section className="sell-hero">
        <div className="sell-hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
        </div>
        <div className="container sell-hero-content">
          <h1 className="sell-title">
            Sell Your Online Business <br />
            <span className="text-gradient">For Maximum Value</span>
          </h1>
          <p className="sell-subtitle">
            Get a free evaluation, reach thousands of qualified buyers, and close your deal
            with expert guidance every step of the way.
          </p>
          <div className="sell-hero-actions">
            <Link to="/evaluate" className="btn btn-primary btn-lg">
              Get Free Evaluation <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sell-benefits-grid">
            <div className="sell-benefit card">
              <div className="benefit-icon"><FiDollarSign /></div>
              <h3>Maximum Value</h3>
              <p>Our expert evaluation ensures you price your business competitively to attract serious buyers while maximizing your returns.</p>
            </div>
            <div className="sell-benefit card">
              <div className="benefit-icon"><FiTrendingUp /></div>
              <h3>Qualified Buyers</h3>
              <p>Access our network of 12,000+ vetted buyers actively looking for profitable online businesses to acquire.</p>
            </div>
            <div className="sell-benefit card">
              <div className="benefit-icon"><FiShield /></div>
              <h3>Confidential Process</h3>
              <p>Your business identity is protected. We only share details with pre-qualified buyers who sign NDAs.</p>
            </div>
            <div className="sell-benefit card">
              <div className="benefit-icon"><FiClock /></div>
              <h3>Fast Closing</h3>
              <p>Average time from listing to closing is 30-45 days. Our streamlined process keeps things moving.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section sell-process-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title">How Selling Works</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A simple, transparent process from start to finish
            </p>
          </div>
          <div className="sell-steps">
            {[
              { step: '01', title: 'Submit Your Business', desc: 'Fill out our evaluation form with your business details, financials, and goals.' },
              { step: '02', title: 'Free Evaluation', desc: 'Our team analyzes your business and provides a professional valuation within 3-5 days.' },
              { step: '03', title: 'Listing Goes Live', desc: 'Once approved, your listing is showcased to our network of qualified buyers.' },
              { step: '04', title: 'Receive Offers', desc: 'Review inquiries and offers from interested buyers. We help negotiate the best terms.' },
              { step: '05', title: 'Close the Deal', desc: 'Complete the transaction securely through our escrow service and transfer assets.' },
            ].map((item) => (
              <div key={item.step} className="sell-step">
                <div className="sell-step-number">{item.step}</div>
                <div className="sell-step-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
            Take the first step — get your free business evaluation today.
          </p>
          <Link to="/evaluate" className="btn btn-primary btn-lg">
            Start Free Evaluation <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
