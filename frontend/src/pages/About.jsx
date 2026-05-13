import { FiTarget, FiUsers, FiAward, FiGlobe, FiShield, FiTrendingUp } from 'react-icons/fi';
import './StaticPages.css';

export default function About() {
  return (
    <div className="static-page about-page">
      <section className="static-hero">
        <div className="container">
          <h1 className="static-hero-title">About <span className="text-gradient">Sally</span></h1>
          <p className="static-hero-subtitle">
            We're building the most trusted marketplace for buying and selling online businesses.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Our Mission</h2>
              <p>
                Sally was founded with a simple mission: make it easier for entrepreneurs to buy and sell
                profitable online businesses. We believe that the internet economy creates incredible
                opportunities, and the ability to acquire proven businesses should be accessible to everyone.
              </p>
              <p>
                Our platform brings transparency, trust, and expertise to a market that has traditionally
                been opaque and fragmented. Every listing on Sally goes through our rigorous vetting process,
                ensuring that buyers can make informed decisions with confidence.
              </p>
              <p>
                Whether you're a first-time buyer looking to skip the startup phase or a seasoned entrepreneur
                ready to exit, we're here to guide you through every step of the journey.
              </p>
            </div>
            <div className="about-stats-grid">
              <div className="about-stat"><span className="about-stat-value">$125M+</span><span>Transaction Volume</span></div>
              <div className="about-stat"><span className="about-stat-value">523</span><span>Businesses Sold</span></div>
              <div className="about-stat"><span className="about-stat-value">12K+</span><span>Members</span></div>
              <div className="about-stat"><span className="about-stat-value">98%</span><span>Satisfaction Rate</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>What drives everything we do</p>
          </div>
          <div className="values-grid">
            {[
              { icon: <FiShield />, title: 'Trust & Transparency', desc: 'Every listing is verified. Every number is checked. We believe trust is earned through transparency.' },
              { icon: <FiTarget />, title: 'Quality Over Quantity', desc: 'We reject 70% of submissions. Only the best businesses make it to our marketplace.' },
              { icon: <FiUsers />, title: 'People First', desc: 'Behind every transaction are real people. We treat every buyer and seller with respect and care.' },
              { icon: <FiGlobe />, title: 'Global Reach', desc: 'We connect entrepreneurs worldwide, enabling cross-border acquisitions with local expertise.' },
              { icon: <FiAward />, title: 'Excellence', desc: 'We continuously improve our processes, tools, and support to deliver the best experience.' },
              { icon: <FiTrendingUp />, title: 'Growth Mindset', desc: 'We help businesses grow — before, during, and after the sale.' },
            ].map((v, i) => (
              <div key={i} className="value-card card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Experienced operators and investors who understand your journey
            </p>
          </div>
          <div className="team-grid">
            {[
              { name: 'Alexandra Chen', role: 'CEO & Co-Founder', bg: '#6366f1' },
              { name: 'Marcus Rivera', role: 'CTO & Co-Founder', bg: '#10b981' },
              { name: 'Sarah Kim', role: 'VP of Operations', bg: '#f59e0b' },
              { name: 'David Thompson', role: 'Head of Acquisitions', bg: '#8b5cf6' },
            ].map((member, i) => (
              <div key={i} className="team-card card">
                <div className="team-avatar" style={{ background: member.bg }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4>{member.name}</h4>
                <span>{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
