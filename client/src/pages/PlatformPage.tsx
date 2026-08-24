import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGamesUpToPage } from "../services/gameService";

import "./CategoryPage.css";


function PlatformPage({
                        onGameClick,
                      }: any) {

  const { platform } =
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
              "Failed to load platform games:",
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
  // PLATFORM TITLE
  // =====================================================

  const platformTitle = (() => {

    switch (platform) {

      case "playstation":
        return "PlayStation";

      case "xbox":
        return "Xbox";

      case "pc":
        return "PC";

      default:
        return "Platform";

    }

  })();


  // =====================================================
  // FILTER
  // =====================================================

    const filteredGames = games.filter((game) => {
        if (platform === "playstation") {
            return game.platforms?.some((p: string) =>
                p.includes("PlayStation")
            );
        }

        if (platform === "xbox") {
            return game.platforms?.some((p: string) =>
                p.includes("Xbox")
            );
        }

        if (platform === "pc") {
            return game.platforms?.some((p: string) =>
                p.includes("PC")
            );
        }

        return false;
    });


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
              {platformTitle}
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
            Platform
          </span>


            <span
                style={{
                  color: "#66c0f4",
                  fontWeight: 700,
                }}
            >
            {platformTitle}
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
                Loading {platformTitle} games...
              </p>

            </div>

        ) : filteredGames.length > 0 ? (

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


                          {/* IMAGE */}

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


                          {/* INFO */}

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
                                      (currentPlatform: string) => (

                                          <span
                                              key={currentPlatform}
                                          >
                              {currentPlatform}
                            </span>

                                      )
                                  )}


                              {platforms.length > 3 && (

                                  <span className="more-platforms">

                          +{platforms.length - 3}

                        </span>

                              )}

                            </div>


                            {/* FOOTER */}

                            <div className="game-card-footer">


                      <span className="game-card-details">

                        {platformTitle}

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

            <div className="no-games">


              <div className="no-games-icon">
                🎮
              </div>


              <h2>
                No games found
              </h2>


              <p>
                We couldn't find any games for{" "}
                <strong>
                  {platformTitle}
                </strong>.
              </p>


            </div>

        )}


      </div>

  );

}


export default PlatformPage;