import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGamesUpToPage } from "../services/gameService";

import "./CategoryPage.css";


function CategoryPage({
                        onGameClick,
                      }: any) {

  const { category } =
      useParams();


  const [games, setGames] =
      useState<any[]>([]);


  const [loading, setLoading] =
      useState(true);


  // =====================================================
  // LOAD GAMES
  // =====================================================

  useEffect(() => {

    let isMounted = true;


    setLoading(true);


    getGamesUpToPage(10)

        .then((data) => {

          if (!isMounted) {
            return;
          }


          setGames(data);

        })

        .catch((error) => {

          console.error(
              "Failed to load category games:",
              error
          );

        })

        .finally(() => {

          if (isMounted) {

            setLoading(false);

          }

        });


    return () => {

      isMounted = false;

    };

  }, []);


  // =====================================================
  // CATEGORY MAP
  // =====================================================

  const categoryMap:
      Record<string, string[]> = {

    action: [
      "Shooter",
      "Adventure",
      "Hack and slash/Beat 'em up",
      "Fighting",
    ],

    rpg: [
      "Role-playing (RPG)",
    ],

    puzzle: [
      "Puzzle",
    ],

    shooter: [
      "Shooter",
    ],

    simulator: [
      "Simulator",
    ],

    simulation: [
      "Simulator",
    ],

    racing: [
      "Racing",
    ],

    arcade: [
      "Arcade",
    ],

    indie: [
      "Indie",
    ],

  };


  // =====================================================
  // CURRENT CATEGORY
  // =====================================================

  const currentCategory =
      category?.toLowerCase() || "";


  const allowedGenres =
      categoryMap[currentCategory];


  // =====================================================
  // FILTER GAMES
  // =====================================================

  const filteredGames =
      games.filter((game) => {

        if (!allowedGenres) {

          return false;

        }


        return game.genres?.some(
            (genre: string) => {

              const normalizedGenre =
                  genre
                      .trim()
                      .toLowerCase();


              return allowedGenres.some(
                  (allowedGenre) =>
                      allowedGenre
                          .trim()
                          .toLowerCase() ===
                      normalizedGenre
              );

            }
        );

      });


  // =====================================================
  // CATEGORY NAME
  // =====================================================

  const categoryTitle =
      category
          ? category
              .replace(/-/g, " ")
              .replace(
                  /\b\w/g,
                  (letter) =>
                      letter.toUpperCase()
              )
          : "Games";


  // =====================================================
  // RETURN
  // =====================================================

  return (

      <div className="category-page">


        {/* =================================================
          PAGE HEADER
      ================================================= */}

        <div className="games-page-header">

          <div>

            <h1>
              {categoryTitle}
            </h1>


            {!loading && (

                <p className="games-count">

                  {filteredGames.length}
                  {" "}
                  {filteredGames.length === 1
                      ? "game"
                      : "games"
                  }
                  {" "}
                  found

                </p>

            )}

          </div>


          <div className="games-toolbar">

          <span>
            Category
          </span>


            <span
                style={{
                  color: "#66c0f4",
                  fontWeight: 700,
                }}
            >
            {categoryTitle}
          </span>

          </div>

        </div>


        {/* =================================================
          LOADING
      ================================================= */}

        {loading ? (

            <div className="games-loading">

              <div className="loading-spinner" />


              <p>
                Loading {categoryTitle.toLowerCase()} games...
              </p>

            </div>

        ) : filteredGames.length > 0 ? (


            /* ===============================================
               GAME GRID
            =============================================== */

            <div className="game-grid">


              {filteredGames.map(
                  (game) => {


                    const genres =
                        game.genres || [];


                    const platforms =
                        game.platforms || [];


                    return (

                        <article

                            className="game-card"

                            key={game.id}

                            onClick={() =>
                                onGameClick(game)
                            }

                        >


                          {/* =====================================
                      IMAGE
                  ===================================== */}

                          <div className="game-card-image">


                            <img
                                src={game.image}
                                alt={game.title}
                                loading="lazy"
                            />


                            <div className="game-card-overlay">

                      <span>
                        View Game
                      </span>

                            </div>


                          </div>


                          {/* =====================================
                      INFO
                  ===================================== */}

                          <div className="game-info">


                            <h2>
                              {game.title}
                            </h2>


                            {/* GENRES */}

                            <div className="genre">


                              {genres
                                  .slice(0, 2)
                                  .map(
                                      (genre: string) => (

                                          <span key={genre}>
                              {genre}
                            </span>

                                      )
                                  )}


                              {genres.length > 2 && (

                                  <span className="more-tag">

                          +{genres.length - 2}

                        </span>

                              )}


                            </div>


                            {/* PLATFORMS */}

                            <div className="platforms">


                              {platforms
                                  .slice(0, 3)
                                  .map(
                                      (platform: string) => (

                                          <span key={platform}>

                              {platform}

                            </span>

                                      )
                                  )}


                              {platforms.length > 3 && (

                                  <span className="more-platforms">

                          +{platforms.length - 3}

                        </span>

                              )}


                            </div>


                            {/* ===================================
                        CARD FOOTER
                    =================================== */}

                            <div className="game-card-footer">


                      <span className="game-card-details">

                        {categoryTitle}

                      </span>


                              <div className="rating">

                        <span className="rating-star">
                          ★
                        </span>


                                <span>

                          {game.rating !== null &&
                          game.rating !== undefined
                              ? game.rating
                              : "-"
                          }

                        </span>

                              </div>


                            </div>


                          </div>


                        </article>

                    );

                  }
              )}


            </div>

        ) : (


            /* =================================================
               EMPTY STATE
            ================================================= */

            <div className="no-games">


              <div className="no-games-icon">
                🎮
              </div>


              <h2>
                No games found
              </h2>


              <p>
                We couldn't find any games in the{" "}
                <strong>
                  {categoryTitle}
                </strong>{" "}
                category.
              </p>


            </div>

        )}


      </div>

  );

}


export default CategoryPage;