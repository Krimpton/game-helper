import "./Legal.css";

function ContactPage() {
  return (
    <div className="legal-page">

      <section className="legal-hero">
        <h1>Contact Us</h1>

        <p>
          Have a question, feedback or found a bug?
          We'd love to hear from you.
        </p>
      </section>

      <section className="contact-grid">

        <div className="contact-card">
          <h3>📧 Email</h3>

          <p>
            support@gamehelper.com
          </p>

          <span>
            We usually respond within 24-48 hours.
          </span>
        </div>

        <div className="contact-card">
          <h3>💬 Discord</h3>

          <p>
            Coming Soon
          </p>

          <span>
            Join our future community server.
          </span>
        </div>

        <div className="contact-card">
          <h3>🐞 Bug Reports</h3>

          <p>
            report@gamehelper.com
          </p>

          <span>
            Help us improve GameHelper by reporting bugs.
          </span>
        </div>

      </section>

      <section className="legal-section">

        <h2>Get in Touch</h2>

        <p>
          Whether you have questions about your account, suggestions for new
          features or simply want to share your feedback, we're always happy to
          hear from our community.
        </p>

      </section>

      <section className="contact-form">

        <h2>Send us a Message</h2>

        <input
          type="text"
          placeholder="Your Name"
        />

        <input
          type="email"
          placeholder="Your Email"
        />

        <input
          type="text"
          placeholder="Subject"
        />

        <textarea
          placeholder="Write your message..."
          rows={6}
        ></textarea>

        <button>
          Send Message
        </button>

      </section>

    </div>
  );
}

export default ContactPage;