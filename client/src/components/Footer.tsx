import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaSteam,
  FaGithub,
  FaReddit,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        {/* Brand */}
        <div className="footer-column">

          <h2 className="footer-title">
            GameHelper
          </h2>

          <p>
            Your personal gaming library for discovering,
            tracking and organizing your favorite games.
          </p>

        </div>


        {/* Navigation */}
        <div className="footer-column">

          <h3>Navigation</h3>

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


        {/* Community */}
        <div className="footer-column">

          <h3>Community</h3>


          <a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord />
            Discord
          </a>


          <a
            href="https://store.steampowered.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSteam />
            Steam
          </a>


          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            GitHub
          </a>


          <a
            href="https://www.reddit.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaReddit />
            Reddit
          </a>


        </div>

      </div>


      <div className="footer-bottom">
        © 2026 GameHelper. All rights reserved.
      </div>


    </footer>
  );
}

export default Footer;