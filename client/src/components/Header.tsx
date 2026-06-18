
import { useState } from "react";
import { Link } from "react-router-dom";
import { searchGames } from "../services/gameService";

function Header({
  onSearchResults,
  user,
  onLogout,
}: any) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    const results = await searchGames(query);

    onSearchResults(results);
  };

  return (
    <header className="header">

      {/* LOGO */}
      <Link to="/" className="logo-link">
        <h1 className="logo">GameHelper</h1>
      </Link>

      {/* NAVIGATION */}
      <nav className="nav">

        {/* GAMES */}
        <div className="dropdown">
          <button>Games ▼</button>

          <div className="dropdown-content">
            <Link to="/games">All Games</Link>
            <Link to="/games/best">Best Ranking</Link>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="dropdown">
          <button>Categories ▼</button>

          <div className="dropdown-content">
            <Link to="/categories/action">Action</Link>
            <Link to="/categories/rpg">RPG</Link>
            <Link to="/categories/puzzle">Puzzle</Link>
            <Link to="/categories/shooter">Shooter</Link>
            <Link to="/categories/simulation">Simulator</Link>
            <Link to="/categories/racing">Racing</Link>
            <Link to="/categories/arcade">Arcade</Link>
            <Link to="/categories/multiplayer">Multiplayer</Link>
          </div>
        </div>

        {/* PLATFORMS */}
        <div className="dropdown">
          <button>Platforms ▼</button>

          <div className="dropdown-content">
            <Link to="/platforms/pc">PC</Link>
            <Link to="/platforms/playstation">PlayStation</Link>
            <Link to="/platforms/xbox">Xbox</Link>
          </div>
        </div>

      </nav>

      {/* SEARCH */}
      <div className="search">
        <input
          type="text"
          placeholder="Search games..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* USER */}
      <div className="user-section">
        {user && (
          <>
            <span className="username">
              👤 {user.username}
            </span>

            <button
              className="logout-btn"
              onClick={onLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>

    </header>
  );
}

export default Header;