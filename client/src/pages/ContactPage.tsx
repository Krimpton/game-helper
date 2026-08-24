import "./Legal.css";


function ContactPage() {

  return (

      <div className="legal-page">


        {/* =================================================
          HERO
      ================================================= */}

        <section className="legal-hero">

        <span className="legal-eyebrow">
          GameHelper Support
        </span>


          <h1>
            Contact Us
          </h1>


          <p>
            Have a question, feedback or found a bug?
            We'd love to hear from you.
          </p>

        </section>


        {/* =================================================
          CONTACT METHODS
      ================================================= */}

        <section className="contact-grid">


          {/* EMAIL */}

          <div className="contact-card">

            <div className="contact-card-icon">
              📧
            </div>


            <div>

              <h3>
                Email Support
              </h3>


              <p>
                support@gamehelper.com
              </p>


              <span>
              General questions and account support.
            </span>

            </div>


            <div className="contact-card-status">
              Usually replies within 24–48 hours
            </div>

          </div>


          {/* DISCORD */}

          <div className="contact-card">

            <div className="contact-card-icon">
              💬
            </div>


            <div>

              <h3>
                Discord Community
              </h3>


              <p>
                Coming Soon
              </p>


              <span>
              Join discussions with other GameHelper users.
            </span>

            </div>


            <div className="contact-card-status contact-card-status-muted">
              Community server in development
            </div>

          </div>


          {/* BUG REPORTS */}

          <div className="contact-card">

            <div className="contact-card-icon">
              🐞
            </div>


            <div>

              <h3>
                Bug Reports
              </h3>


              <p>
                report@gamehelper.com
              </p>


              <span>
              Found something broken? Let us know.
            </span>

            </div>


            <div className="contact-card-status">
              Bug reports are always welcome
            </div>

          </div>

        </section>


        {/* =================================================
          INFO
      ================================================= */}

        <section className="legal-section contact-intro">

          <div>

          <span className="legal-section-label">
            Support
          </span>


            <h2>
              Get in Touch
            </h2>


            <p>
              Whether you have questions about your account,
              suggestions for new features or simply want to
              share your feedback, we're always happy to hear
              from our community.
            </p>

          </div>


          <div className="contact-support-note">

            <span className="contact-support-dot" />

            Support available

          </div>

        </section>


        {/* =================================================
          CONTACT FORM
      ================================================= */}

        <section className="contact-form">


          <div className="contact-form-header">

          <span className="legal-section-label">
            Message
          </span>


            <h2>
              Send us a Message
            </h2>


            <p>
              Fill out the form below and we'll get back to you
              as soon as possible.
            </p>

          </div>


          <div className="contact-form-grid">


            <div className="contact-field">

              <label htmlFor="contact-name">
                Name
              </label>


              <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
              />

            </div>


            <div className="contact-field">

              <label htmlFor="contact-email">
                Email
              </label>


              <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
              />

            </div>

          </div>


          <div className="contact-field">

            <label htmlFor="contact-subject">
              Subject
            </label>


            <input
                id="contact-subject"
                type="text"
                placeholder="What can we help you with?"
            />

          </div>


          <div className="contact-field">

            <label htmlFor="contact-message">
              Message
            </label>


            <textarea
                id="contact-message"
                placeholder="Write your message..."
                rows={6}
            />

          </div>


          <div className="contact-form-footer">

          <span>
            Please don't include passwords or sensitive
            account information.
          </span>


            <button type="button">
              Send Message
              <span>→</span>
            </button>

          </div>

        </section>


      </div>

  );

}


export default ContactPage;