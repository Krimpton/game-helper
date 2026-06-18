
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1 className="logo">GameHelper</h1>
      </Link>

      <nav className="nav">
        <div className="dropdown">
          <button>Games ▼</button>

          <div className="dropdown-content">
            <a href="#">New Releases</a>
            <a href="#">Popular</a>
            <a href="#">Discounts</a>
          </div>
        </div>

        <div className="dropdown">
          <button>Categories ▼</button>

          <div className="dropdown-content">
            <Link to="/categories/action">Action</Link>
            <Link to="/categories/rpg">RPG</Link>
            <Link to="/categories/strategy">Strategy</Link>
            <Link to="/categories/adventure">Adventure</Link>
            <Link to="/categories/horror">Horror</Link>
          </div>
        </div>

        <div className="dropdown">
          <button>Platforms ▼</button>

          <div className="dropdown-content">
            <Link to="/platforms/pc">PC</Link>
            <Link to="/platforms/playstation">PlayStation</Link>
            <Link to="/platforms/xbox">Xbox</Link>
          </div>
        </div>
      </nav>

      <div className="search">
        <input type="text" placeholder="Search games..." />
        <button>Search</button>
      </div>
    </header>
  );
}

export default Header;