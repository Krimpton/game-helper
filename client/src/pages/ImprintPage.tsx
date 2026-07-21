import "./Legal.css";

function ImprintPage() {
  return (
    <div className="legal-page">

      <section className="legal-hero">
        <h1>Imprint</h1>

        <p>
          Information according to Section 5 of the German Telemedia Act (TMG).
        </p>
      </section>

      <section className="legal-section">
        <h2>Website Owner</h2>

        <p>
          Max Mustermann
          <br />
          Musterstraße 12
          <br />
          12345 Musterstadt
          <br />
          Germany
        </p>
      </section>

      <section className="legal-section">
        <h2>Contact</h2>

        <p>
          <strong>Email:</strong> support@gamehelper.com
        </p>

        <p>
          <strong>Phone:</strong> +49 123 4567890
        </p>
      </section>

      <section className="legal-section">
        <h2>Responsible for Content</h2>

        <p>
          Max Mustermann
          <br />
          Musterstraße 12
          <br />
          12345 Musterstadt
          <br />
          Germany
        </p>
      </section>

      <section className="legal-section">
        <h2>Disclaimer</h2>

        <p>
          The content of this website has been created with great care.
          However, no guarantee is given for the accuracy, completeness or
          timeliness of the information provided.
        </p>
      </section>

      <section className="legal-section">
        <h2>Copyright</h2>

        <p>
          All content published on this website is protected by copyright.
          Any reproduction, distribution or commercial use requires prior
          written permission from the respective copyright holder.
        </p>
      </section>

      <section className="legal-section">
        <h2>External Links</h2>

        <p>
          This website may contain links to external websites. We have no
          influence on the content of those websites and therefore cannot
          accept any responsibility for their content. The respective provider
          or operator of the linked websites is always responsible for their
          content.
        </p>
      </section>

      <section className="legal-section">
        <h2>Project Notice</h2>

        <p>
          GameHelper is a student project created for educational purposes as
          part of a web development course. It is not intended for commercial
          use.
        </p>
      </section>

    </div>
  );
}

export default ImprintPage;