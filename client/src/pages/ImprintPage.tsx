import "./Legal.css";


function ImprintPage() {

    return (

        <div className="legal-page">


            {/* =================================================
          HERO
      ================================================= */}

            <section className="legal-hero">

        <span className="legal-eyebrow">
          Legal Information
        </span>


                <h1>
                    Imprint
                </h1>


                <p>
                    Information according to Section 5 of the German
                    Telemedia Act (TMG).
                </p>

            </section>


            {/* =================================================
          OWNER
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Provider
        </span>


                <h2>
                    Website Owner
                </h2>


                <div className="legal-contact-block">

                    <strong>
                        Max Mustermann
                    </strong>

                    <span>
            Musterstraße 12
          </span>

                    <span>
            12345 Musterstadt
          </span>

                    <span>
            Germany
          </span>

                </div>

            </section>


            {/* =================================================
          CONTACT
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Contact
        </span>


                <h2>
                    Contact Information
                </h2>


                <div className="legal-info-grid">

                    <div className="legal-info-item">

            <span>
              Email
            </span>

                        <strong>
                            support@gamehelper.com
                        </strong>

                    </div>


                    <div className="legal-info-item">

            <span>
              Phone
            </span>

                        <strong>
                            +49 123 4567890
                        </strong>

                    </div>

                </div>

            </section>


            {/* =================================================
          RESPONSIBLE CONTENT
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Responsibility
        </span>


                <h2>
                    Responsible for Content
                </h2>


                <div className="legal-contact-block">

                    <strong>
                        Max Mustermann
                    </strong>

                    <span>
            Musterstraße 12
          </span>

                    <span>
            12345 Musterstadt
          </span>

                    <span>
            Germany
          </span>

                </div>

            </section>


            {/* =================================================
          DISCLAIMER
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Liability
        </span>


                <h2>
                    Disclaimer
                </h2>


                <p>
                    The content of this website has been created with great
                    care. However, no guarantee is given for the accuracy,
                    completeness or timeliness of the information provided.
                </p>

            </section>


            {/* =================================================
          COPYRIGHT
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Intellectual Property
        </span>


                <h2>
                    Copyright
                </h2>


                <p>
                    All content published on this website is protected by
                    copyright. Any reproduction, distribution or commercial
                    use requires prior written permission from the respective
                    copyright holder.
                </p>

            </section>


            {/* =================================================
          EXTERNAL LINKS
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Third-Party Content
        </span>


                <h2>
                    External Links
                </h2>


                <p>
                    This website may contain links to external websites.
                    We have no influence on the content of those websites
                    and therefore cannot accept any responsibility for their
                    content.
                </p>


                <p>
                    The respective provider or operator of the linked
                    website is always responsible for its content.
                </p>

            </section>


            {/* =================================================
          PROJECT NOTICE
      ================================================= */}

            <section className="legal-section legal-project-notice">

                <div className="legal-project-icon">
                    🎓
                </div>


                <div>

          <span className="legal-section-label">
            Project Information
          </span>


                    <h2>
                        Student Project
                    </h2>


                    <p>
                        GameHelper is a student project created for educational
                        purposes as part of a web development course.
                    </p>


                    <p>
                        The platform is not intended for commercial use.
                    </p>

                </div>

            </section>


        </div>

    );

}


export default ImprintPage;