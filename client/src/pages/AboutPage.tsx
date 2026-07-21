import "./Legal.css";

function AboutPage() {
  return (
    <div className="legal-page">

      <section className="legal-hero">
        <h1>About GameHelper</h1>

        <p>
          Discover games. Build your collection. Connect with gamers.
        </p>
      </section>

      <section className="legal-section">

        <h2>Our Story</h2>

        <p>
          GameHelper was created as a modern platform for gamers who want to
          discover new titles, organize their personal gaming library and
          customize their gaming profile.
        </p>

        <p>
          Whether you're searching for your next favorite game or keeping track
          of your wishlist, GameHelper makes everything simple, fast and
          enjoyable.
        </p>

      </section>

      <section className="feature-grid">

        <div className="feature-card">
          <h3>🎮 Discover Games</h3>

          <p>
            Explore thousands of games across multiple genres and platforms.
          </p>
        </div>

        <div className="feature-card">
          <h3>❤️ Wishlist</h3>

          <p>
            Save games you want to play and build your personal collection.
          </p>
        </div>

        <div className="feature-card">
          <h3>⭐ Gaming Profile</h3>

          <p>
            Personalize your profile with favorite genres, platforms and more.
          </p>
        </div>

        <div className="feature-card">
          <h3>👥 Community</h3>

          <p>
            Connect with other gamers and share your gaming interests.
          </p>
        </div>

      </section>

      <section className="legal-section">

        <h2>Our Mission</h2>

        <p>
          We believe gaming should be fun, social and easy to organize.
          GameHelper brings everything together in one modern platform for
          players around the world.
        </p>

      </section>

      <section className="stats-grid">

        <div className="stat-card">
          <h2>🎮</h2>
          <h3>Thousands</h3>
          <p>Games to discover</p>
        </div>

        <div className="stat-card">
          <h2>🕹️</h2>
          <h3>Multiple</h3>
          <p>Gaming platforms</p>
        </div>

        <div className="stat-card">
          <h2>⭐</h2>
          <h3>Personal</h3>
          <p>Gaming profiles</p>
        </div>

        <div className="stat-card">
          <h2>🚀</h2>
          <h3>Modern</h3>
          <p>Gaming experience</p>
        </div>

      </section>

    </div>
  );
}

export default AboutPage;