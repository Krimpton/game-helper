import "./Legal.css";


function PrivacyPage() {

    return (

        <div className="legal-page">


            {/* =================================================
          HERO
      ================================================= */}

            <section className="legal-hero">

        <span className="legal-eyebrow">
          Privacy & Data
        </span>


                <h1>
                    Privacy Policy
                </h1>


                <p>
                    Your privacy matters to us. This page explains how GameHelper
                    collects, stores and uses your personal information.
                </p>

            </section>


            {/* =================================================
          INFORMATION WE COLLECT
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Data Collection
        </span>


                <h2>
                    1. Information We Collect
                </h2>


                <p>
                    When you create an account, we may store information such as your
                    username, profile image and gaming preferences.
                </p>


                <p>
                    These details are used to personalize your experience within
                    GameHelper.
                </p>

            </section>


            {/* =================================================
          HOW WE USE DATA
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Usage
        </span>


                <h2>
                    2. How We Use Your Information
                </h2>


                <p>
                    Your information is used to provide and improve the platform,
                    personalize your profile, save your settings and improve your overall
                    experience.
                </p>

            </section>


            {/* =================================================
          LOCAL STORAGE
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Browser Storage
        </span>


                <h2>
                    3. Local Storage
                </h2>


                <p>
                    GameHelper may use Local Storage in your browser to temporarily store
                    user-related information and application settings.
                </p>

                <p>
                    This allows the application to remember information between page
                    reloads and provide a smoother user experience.
                </p>

            </section>


            {/* =================================================
          COOKIES
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Cookies
        </span>


                <h2>
                    4. Cookies
                </h2>


                <p>
                    GameHelper may use technically necessary cookies for features such as
                    authentication and session management.
                </p>


                <p>
                    We do not use advertising or tracking cookies as part of this student
                    project.
                </p>

            </section>


            {/* =================================================
          THIRD-PARTY SERVICES
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          External Services
        </span>


                <h2>
                    5. Third-Party Services
                </h2>


                <p>
                    GameHelper may display game information provided by external APIs and
                    third-party services.
                </p>


                <p>
                    These services operate under their own privacy policies and terms of
                    use.
                </p>

            </section>


            {/* =================================================
          DATA SECURITY
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Security
        </span>


                <h2>
                    6. Data Security
                </h2>


                <p>
                    We strive to protect user information using appropriate technical
                    measures.
                </p>


                <p>
                    However, no method of electronic storage or transmission can be
                    guaranteed to be completely secure.
                </p>

            </section>


            {/* =================================================
          USER RIGHTS
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Your Data
        </span>


                <h2>
                    7. Your Rights
                </h2>


                <p>
                    You may update profile information available through your GameHelper
                    account at any time.
                </p>


                <p>
                    If you have questions regarding stored information or would like to
                    request changes or deletion, you can contact us through the Contact
                    page.
                </p>

            </section>


            {/* =================================================
          POLICY CHANGES
      ================================================= */}

            <section className="legal-section">

        <span className="legal-section-label">
          Updates
        </span>


                <h2>
                    8. Changes to this Policy
                </h2>


                <p>
                    This Privacy Policy may be updated from time to time as GameHelper
                    changes or new features are introduced.
                </p>


                <p>
                    Any updated version will be published on this page.
                </p>

            </section>


            {/* =================================================
          CONTACT
      ================================================= */}

            <section className="legal-section legal-contact-section">

        <span className="legal-section-label">
          Questions
        </span>


                <h2>
                    Contact
                </h2>


                <p>
                    If you have any questions regarding this Privacy Policy, please
                    contact us at:
                </p>


                <div className="legal-info-item">

          <span>
            Email
          </span>

                    <strong>
                        support@gamehelper.com
                    </strong>

                </div>

            </section>


        </div>

    );

}


export default PrivacyPage;