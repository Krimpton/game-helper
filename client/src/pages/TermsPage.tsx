import "./Legal.css";

function TermsPage() {
  return (
    <div className="legal-page">

      <section className="legal-hero">
        <h1>Terms of Service</h1>

        <p>
          Please read these Terms of Service carefully before using
          GameHelper.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Acceptance of Terms</h2>

        <p>
          By accessing or using GameHelper, you agree to comply with these
          Terms of Service. If you do not agree with these terms, you should
          not use the platform.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. User Accounts</h2>

        <p>
          Users are responsible for maintaining the confidentiality of their
          account information and for all activities performed under their
          account.
        </p>

        <p>
          You agree to provide accurate information when creating your account
          and to keep your profile up to date.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Acceptable Use</h2>

        <p>
          Users agree not to:
        </p>

        <ul className="legal-list">
          <li>Use the platform for illegal purposes.</li>
          <li>Upload harmful or malicious content.</li>
          <li>Attempt to gain unauthorized access to other accounts.</li>
          <li>Disrupt or interfere with the operation of GameHelper.</li>
          <li>Impersonate another person or organization.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. User Content</h2>

        <p>
          Users remain responsible for all information they upload, including
          profile pictures, descriptions and other personal content.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Intellectual Property</h2>

        <p>
          All trademarks, logos and content belonging to GameHelper remain the
          property of their respective owners. Game information provided by
          third-party APIs remains subject to their respective licenses.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Disclaimer</h2>

        <p>
          GameHelper is provided "as is" without warranties of any kind.
          Although we strive for accurate information, we cannot guarantee that
          all content will always be complete, accurate or up to date.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Limitation of Liability</h2>

        <p>
          GameHelper shall not be liable for any damages resulting from the use
          or inability to use the platform, except where required by applicable
          law.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Changes to the Terms</h2>

        <p>
          We reserve the right to modify these Terms of Service at any time.
          Continued use of GameHelper after changes have been published
          constitutes acceptance of the updated terms.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Contact</h2>

        <p>
          If you have questions regarding these Terms of Service, please
          contact us at:
        </p>

        <p>
          <strong>Email:</strong> support@gamehelper.com
        </p>
      </section>

    </div>
  );
}

export default TermsPage;