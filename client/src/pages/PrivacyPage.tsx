import "./Legal.css";

function PrivacyPage() {
  return (
    <div className="legal-page">

      <section className="legal-hero">
        <h1>Privacy Policy</h1>

        <p>
          Your privacy matters to us. This page explains how GameHelper
          collects, stores and uses your personal information.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Information We Collect</h2>

        <p>
          When you create an account, we may store information such as your
          username, profile image and gaming preferences. These details are
          used to personalize your experience within GameHelper.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. How We Use Your Information</h2>

        <p>
          Your information is used to provide and improve the platform,
          personalize your profile, save your settings and enhance your gaming
          experience.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Local Storage</h2>

        <p>
          This demo application stores user information locally in your browser
          using Local Storage. No personal information is transmitted to an
          external server.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Cookies</h2>

        <p>
          GameHelper currently does not use tracking cookies. Future versions
          may use cookies to improve usability and remember your preferences.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Third-Party Services</h2>

        <p>
          GameHelper may display game information provided by external APIs.
          These services operate under their own privacy policies.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Data Security</h2>

        <p>
          We strive to protect your information using appropriate technical
          measures. However, no method of electronic storage is completely
          secure.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Your Rights</h2>

        <p>
          You may update or delete your profile information at any time. If you
          have questions regarding your data, please contact us through the
          Contact page.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Changes to this Policy</h2>

        <p>
          This Privacy Policy may be updated from time to time. Any changes
          will be published on this page.
        </p>
      </section>

      <section className="legal-section">
        <h2>Contact</h2>

        <p>
          If you have any questions regarding this Privacy Policy, please
          contact us at:
        </p>

        <p>
          <strong>Email:</strong> support@gamehelper.com
        </p>
      </section>

    </div>
  );
}

export default PrivacyPage;