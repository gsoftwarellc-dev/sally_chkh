import './StaticPages.css';

export default function Privacy() {
  return (
    <div className="static-page legal-page">
      <section className="static-hero">
        <div className="container">
          <h1 className="static-hero-title">Privacy Policy</h1>
          <p className="static-hero-subtitle">Last updated: May 1, 2026</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="legal-content">
            <div className="legal-section">
              <h2>1. Information We Collect</h2>
              <p>We collect information you provide directly, including name, email address, phone number, and business details. We also collect usage data through cookies and analytics tools, including IP address, browser type, and pages visited.</p>
            </div>
            <div className="legal-section">
              <h2>2. How We Use Your Information</h2>
              <p>We use collected information to provide and improve our services, process transactions, communicate with you, personalize your experience, and ensure platform security. We may use your email for service updates and marketing (with opt-out options).</p>
            </div>
            <div className="legal-section">
              <h2>3. Information Sharing</h2>
              <p>We do not sell your personal information. We may share information with service providers who assist in platform operations, legal authorities when required by law, and potential buyers or sellers during the transaction process (with your consent).</p>
            </div>
            <div className="legal-section">
              <h2>4. Data Security</h2>
              <p>We implement industry-standard security measures including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            </div>
            <div className="legal-section">
              <h2>5. Cookies</h2>
              <p>We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookie settings through your browser preferences.</p>
            </div>
            <div className="legal-section">
              <h2>6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. You can request a copy of your data, update your information through your account settings, or contact us to exercise your rights under GDPR, CCPA, or other applicable laws.</p>
            </div>
            <div className="legal-section">
              <h2>7. Data Retention</h2>
              <p>We retain your personal information for as long as your account is active or as needed to provide services. We may retain certain data for legal compliance, dispute resolution, or legitimate business purposes.</p>
            </div>
            <div className="legal-section">
              <h2>8. Third-Party Links</h2>
              <p>Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these sites. We encourage you to read their privacy policies before providing any personal information.</p>
            </div>
            <div className="legal-section">
              <h2>9. Children's Privacy</h2>
              <p>Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.</p>
            </div>
            <div className="legal-section">
              <h2>10. Contact Us</h2>
              <p>For privacy-related inquiries, please contact our Data Protection Officer at privacy@sally.com or write to us at 123 Market St, San Francisco, CA 94105.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
