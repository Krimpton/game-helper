import { useState } from "react";
import {
  Link,
  NavLink,
} from "react-router-dom";

function Header({
                  onSearchResults,
                  user,
                  onLogout,
                }: any) {

  const [query, setQuery] =
      useState("");


  // ==========================
  // SEARCH
  // ==========================

  const handleSearch = () => {

    const trimmedQuery =
        query.trim();


    if (!trimmedQuery) {
      return;
    }


    onSearchResults(
        trimmedQuery
    );

  };


  return (

      <header className="header">


        {/* ==========================
          LOGO
      ========================== */}

        <Link
            to="/"
            className="logo-link"
        >

          <h1 className="logo">
            GameHelper
          </h1>

        </Link>


        {/* ==========================
          RIGHT
      ========================== */}

        <div className="header-right">


          {/* ==========================
            NAVIGATION
        ========================== */}

          <nav className="nav">


            {/* GAMES */}

            <div className="dropdown">

              <button
                  type="button"
                  className="nav-dropdown-btn"
              >
                Games

                <span className="dropdown-arrow">
                ▾
              </span>
              </button>


              <div className="dropdown-content">

                <NavLink
                    to="/games"
                    className={({ isActive }) =>
                        isActive
                            ? "dropdown-link active"
                            : "dropdown-link"
                    }
                >
                  <span>🎮</span>

                  All Games
                </NavLink>


                <NavLink
                    to="/games/best"
                    className={({ isActive }) =>
                        isActive
                            ? "dropdown-link active"
                            : "dropdown-link"
                    }
                >
                  <span>⭐</span>

                  Best Ranking
                </NavLink>

              </div>

            </div>


            {/* CATEGORIES */}

            <div className="dropdown">

              <button
                  type="button"
                  className="nav-dropdown-btn"
              >
                Categories

                <span className="dropdown-arrow">
                ▾
              </span>
              </button>


              <div className="dropdown-content categories-dropdown">

                <NavLink
                    to="/categories/action"
                    className="dropdown-link"
                >
                  <span>⚔️</span>
                  Action
                </NavLink>


                <NavLink
                    to="/categories/rpg"
                    className="dropdown-link"
                >
                  <span>🛡️</span>
                  RPG
                </NavLink>


                <NavLink
                    to="/categories/puzzle"
                    className="dropdown-link"
                >
                  <span>🧩</span>
                  Puzzle
                </NavLink>


                <NavLink
                    to="/categories/shooter"
                    className="dropdown-link"
                >
                  <span>🎯</span>
                  Shooter
                </NavLink>


                <NavLink
                    to="/categories/simulator"
                    className="dropdown-link"
                >
                  <span>🎛️</span>
                  Simulator
                </NavLink>


                <NavLink
                    to="/categories/racing"
                    className="dropdown-link"
                >
                  <span>🏎️</span>
                  Racing
                </NavLink>


                <NavLink
                    to="/categories/arcade"
                    className="dropdown-link"
                >
                  <span>🕹️</span>
                  Arcade
                </NavLink>


                <NavLink
                    to="/categories/indie"
                    className="dropdown-link"
                >
                  <span>💎</span>
                  Indie
                </NavLink>

              </div>

            </div>


            {/* PLATFORMS */}

            <div className="dropdown">

              <button
                  type="button"
                  className="nav-dropdown-btn"
              >
                Platforms

                <span className="dropdown-arrow">
                ▾
              </span>
              </button>


              <div className="dropdown-content">

                <NavLink
                    to="/platforms/pc"
                    className="dropdown-link"
                >
                  <span>🖥️</span>
                  PC
                </NavLink>


                <NavLink
                    to="/platforms/playstation"
                    className="dropdown-link"
                >
                  <span>🎮</span>
                  PlayStation
                </NavLink>


                <NavLink
                    to="/platforms/xbox"
                    className="dropdown-link"
                >
                  <span>🎮</span>
                  Xbox
                </NavLink>

              </div>

            </div>

          </nav>


          {/* ==========================
            SEARCH
        ========================== */}

          <div className="search">

          <span className="search-icon">
            ⌕
          </span>


            <input
                type="text"
                placeholder="Search games..."
                value={query}

                onChange={(e) =>
                    setQuery(
                        e.target.value
                    )
                }

                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    handleSearch();
                  }

                }}
            />


            <button
                type="button"
                onClick={handleSearch}
                disabled={!query.trim()}
            >
              Search
            </button>

          </div>


          {/* ==========================
            USER
        ========================== */}

          {user && (

              <div className="user-section">


                <div className="user-menu">


                  <Link
                      to="/profile"
                      className="user-link"
                  >

                    <div className="header-avatar-wrapper">

                      <img
                          src={
                            user.profileImage

                                ? user.profileImage.startsWith(
                                    "http"
                                )

                                    ? user.profileImage

                                    : `http://localhost:3000${user.profileImage}`

                                : "/images/dummy-profile-blue.png"
                          }

                          className="header-avatar"

                          alt="Profile"
                      />


                      <span className="header-online-dot" />

                    </div>


                    <div className="header-user-info">

                  <span className="header-username">
                    {user.username}
                  </span>

                      <span className="header-user-status">
                    Online
                  </span>

                    </div>


                    <span className="user-menu-arrow">
                  ▾
                </span>

                  </Link>


                  {/* USER DROPDOWN */}

                  <div className="user-dropdown">


                    <div className="user-dropdown-header">

                  <span>
                    Signed in as
                  </span>

                      <strong>
                        {user.username}
                      </strong>

                    </div>


                    <div className="user-dropdown-divider" />


                    <Link
                        to="/profile"
                        className="user-dropdown-link"
                    >
                      <span>👤</span>

                      My Profile
                    </Link>


                    <Link
                        to="/games"
                        className="user-dropdown-link"
                    >
                      <span>🎮</span>

                      Browse Games
                    </Link>


                    <div className="user-dropdown-divider" />


                    <button
                        type="button"
                        className="user-dropdown-link logout-menu-btn"
                        onClick={onLogout}
                    >
                      <span>↪</span>

                      Logout
                    </button>

                  </div>

                </div>

              </div>

          )}

        </div>

      </header>

  );

}


export default Header;