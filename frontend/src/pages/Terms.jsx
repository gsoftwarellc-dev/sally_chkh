import './StaticPages.css';

export default function Terms() {
  return (
    <div className="static-page legal-page">
      <section className="static-hero">
        <div className="container">
          <h1 className="static-hero-title">Terms & Conditions</h1>
          <p className="static-hero-subtitle">Last updated: May 1, 2026</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="legal-content">
            <div className="legal-section">
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using Sally ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.</p>
            </div>
            <div className="legal-section">
              <h2>2. Description of Service</h2>
              <p>Sally provides an online marketplace platform that facilitates the buying and selling of online businesses and websites. We act as an intermediary, providing listing services, evaluation tools, and transaction support.</p>
            </div>
            <div className="legal-section">
              <h2>3. User Accounts</h2>
              <p>To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate and complete information during registration.</p>
            </div>
            <div className="legal-section">
              <h2>4. Listing Policies</h2>
              <p>All listings must be accurate and truthful. Sellers must provide verified financial data, traffic information, and business details. Misrepresentation of business information may result in account suspension and legal action.</p>
            </div>
            <div className="legal-section">
              <h2>5. Fees and Commissions</h2>
              <p>Sally charges a commission on successful transactions. Commission rates vary based on deal size and are communicated before listing. Buyers are not charged any platform fees. Payment terms and schedules are agreed upon before listing goes live.</p>
            </div>
            <div className="legal-section">
              <h2>6. Intellectual Property</h2>
              <p>All content on the platform, including logos, text, graphics, and software, is the property of Sally or its licensors. Users retain ownership of content they submit but grant Sally a license to use it for platform purposes.</p>
            </div>
            <div className="legal-section">
              <h2>7. Limitation of Liability</h2>
              <p>Sally is not responsible for the accuracy of information provided by sellers, the quality of businesses listed, or the outcome of transactions. We provide tools and support but do not guarantee any specific results.</p>
            </div>
            <div className="legal-section">
              <h2>8. Dispute Resolution</h2>
              <p>Any disputes arising from the use of our platform will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration will be conducted in San Francisco, California.</p>
            </div>
            <div className="legal-section">
              <h2>9. Modifications</h2>
              <p>We reserve the right to modify these terms at any time. Significant changes will be communicated to users via email. Continued use of the platform constitutes acceptance of modified terms.</p>
            </div>
            <div className="legal-section">
              <h2>10. Contact</h2>
              <p>For questions about these Terms and Conditions, please contact us at legal@sally.com or +1 (555) 123-4567.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
