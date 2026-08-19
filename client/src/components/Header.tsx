import { useState } from "react";
import { Link } from "react-router-dom";

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

    if (!query.trim()) {
      return;
    }

    onSearchResults(
      query.trim()
    );

  };


  return (

    <header className="header">


      {/* ==========================
          LEFT: LOGO
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
          RIGHT GROUP
      ========================== */}

      <div className="header-right">


        {/* ==========================
            NAVIGATION
        ========================== */}

        <nav className="nav">


          {/* GAMES */}

          <div className="dropdown">

            <button>
              Games ▼
            </button>


            <div className="dropdown-content">

              <Link to="/games">
                All Games
              </Link>

              <Link to="/games/best">
                Best Ranking
              </Link>

            </div>

          </div>


          {/* CATEGORIES */}

          <div className="dropdown">

            <button>
              Categories ▼
            </button>


            <div className="dropdown-content">

              <Link to="/categories/action">
                Action 
              </Link>

              <Link to="/categories/rpg">
                RPG
              </Link>

              <Link to="/categories/puzzle">
                Puzzle
              </Link>

              <Link to="/categories/shooter">
                Shooter
              </Link>

              <Link to="/categories/simulator">
                Simulator
              </Link>

              <Link to="/categories/racing">
                Racing
              </Link>

              <Link to="/categories/arcade">
                Arcade
              </Link>

              <Link to="/categories/indie">
                Indie
              </Link>

            </div>

          </div>


          {/* PLATFORMS */}

          <div className="dropdown">

            <button>
              Platforms ▼
            </button>


            <div className="dropdown-content">

              <Link to="/platforms/pc">
                PC
              </Link>

              <Link to="/platforms/playstation">
                PlayStation
              </Link>

              <Link to="/platforms/xbox">
                Xbox
              </Link>

            </div>

          </div>


        </nav>


        {/* ==========================
            SEARCH
        ========================== */}

        <div className="search">


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
            onClick={handleSearch}
          >

            Search

          </button>


        </div>


        {/* ==========================
            USER
        ========================== */}

        {user && (

          <div className="user-section">


            <Link
              to="/profile"
              className="user-link"
            >


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


              <span>
                {user.username}
              </span>


            </Link>


          </div>

        )}


      </div>

    </header>

  );

}


export default Header;