import {
  FaDiscord,
  FaSteam,
  FaGithub,
  FaReddit,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
      <footer className="footer">

        <div className="footer-glow" />

        <div className="footer-content">

          {/* BRAND */}

          <div className="footer-brand">

            <h2>
              GameHelper
            </h2>

            <p>
              Discover games, build your library
              and connect with other players.
            </p>

            <div className="footer-status">
              <span className="footer-status-dot" />

              <span>
              GameHelper Online
            </span>
            </div>

          </div>


          {/* NAVIGATION */}

          <div className="footer-column">

            <h3>
              Navigation
            </h3>

            <Link to="/">
              Home
            </Link>

            <Link to="/games">
              All Games
            </Link>

            <Link to="/games/best">
              Best Ranking
            </Link>

            <Link to="/profile">
              Profile
            </Link>

          </div>


          {/* INFORMATION */}

          <div className="footer-column">

            <h3>
              Information
            </h3>

            <Link to="/about">
              About
            </Link>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms of Service
            </Link>

            <Link to="/imprint">
              Imprint
            </Link>

          </div>


          {/* COMMUNITY */}

          <div className="footer-column">

            <h3>
              Community
            </h3>

            <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
            >
              <FaDiscord />
              Discord
            </a>

            <a
                href="https://store.steampowered.com"
                target="_blank"
                rel="noreferrer"
            >
              <FaSteam />
              Steam
            </a>

            <a
                href="https://github.com/Krimpton/game-helper"
                target="_blank"
                rel="noreferrer"
            >
              <FaGithub />
              GitHub
            </a>

            <a
                href="https://reddit.com"
                target="_blank"
                rel="noreferrer"
            >
              <FaReddit />
              Reddit
            </a>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="footer-bottom">

        <span>
          © 2026 GameHelper
        </span>

          <span className="footer-bottom-divider">
          •
        </span>

          <span>
          Built during the DCI Web Development course
        </span>

        </div>

      </footer>
  );
}

export default Footer;