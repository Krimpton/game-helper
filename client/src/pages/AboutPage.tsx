import "./Legal.css";

function AboutPage() {
  return (
      <div className="legal-page">

        {/* =====================================================
          HERO
      ===================================================== */}

        <section className="legal-hero">

        <span className="legal-eyebrow">
          About the Project
        </span>

          <h1>
            About GameHelper
          </h1>

          <p>
            Discover games, organize your personal library
            and connect with other players — all in one place.
          </p>

        </section>


        {/* =====================================================
          OUR STORY
      ===================================================== */}

        <section className="legal-section">

        <span className="legal-section-label">
          The Project
        </span>

          <h2>
            Our Story
          </h2>

          <p>
            GameHelper was created as a modern platform for gamers
            who want an easier way to discover new titles, organize
            their personal gaming library and build their own gaming
            profile.
          </p>

          <p>
            Instead of switching between different websites and
            keeping track of games manually, GameHelper brings the
            most useful features together in one simple interface.
          </p>

        </section>


        {/* =====================================================
          FEATURES
      ===================================================== */}

        <section className="feature-grid">

          <div className="feature-card">

            <h3>
              🎮 Discover Games
            </h3>

            <p>
              Explore games across different genres and platforms
              and quickly find something new to play.
            </p>

          </div>


          <div className="feature-card">

            <h3>
              ❤️ Personal Library
            </h3>

            <p>
              Organize games into your wishlist, playing,
              completed, dropped and want-to-play collections.
            </p>

          </div>


          <div className="feature-card">

            <h3>
              ⭐ Gaming Profile
            </h3>

            <p>
              Personalize your profile with a banner, avatar,
              favorite games, genres, platforms and social links.
            </p>

          </div>


          <div className="feature-card">

            <h3>
              👥 Community
            </h3>

            <p>
              Find other users, add friends and communicate through
              global and private chats.
            </p>

          </div>

        </section>


        {/* =====================================================
          MISSION
      ===================================================== */}

        <section className="legal-section">

        <span className="legal-section-label">
          Why GameHelper?
        </span>

          <h2>
            Our Mission
          </h2>

          <p>
            Gaming libraries can quickly become difficult to manage.
            GameHelper aims to make discovering, organizing and
            discussing games feel simple and enjoyable.
          </p>

          <p>
            The goal is to create one clean gaming hub where players
            can manage their collection while also interacting with
            a small gaming community.
          </p>

        </section>


        {/* =====================================================
          STATS / HIGHLIGHTS
      ===================================================== */}

        <section className="stats-grid">

          <div className="stat-card">

            <h2>
              🎮
            </h2>

            <h3>
              Thousands
            </h3>

            <p>
              Games to discover
            </p>

          </div>


          <div className="stat-card">

            <h2>
              🕹️
            </h2>

            <h3>
              Multiple
            </h3>

            <p>
              Gaming platforms
            </p>

          </div>


          <div className="stat-card">

            <h2>
              👤
            </h2>

            <h3>
              Personal
            </h3>

            <p>
              Profiles and libraries
            </p>

          </div>


          <div className="stat-card">

            <h2>
              💬
            </h2>

            <h3>
              Social
            </h3>

            <p>
              Global and private chat
            </p>

          </div>

        </section>


        {/* =====================================================
          PROJECT INFO
      ===================================================== */}

        <section className="legal-section">

        <span className="legal-section-label">
          Development
        </span>

          <h2>
            Built as a Web Development Project
          </h2>

          <p>
            GameHelper is a student web development project built
            to demonstrate a complete modern application including
            frontend development, backend APIs, authentication,
            database integration and interactive user features.
          </p>

        </section>

      </div>
  );
}

export default AboutPage;