import { useEffect, useState } from "react";
import { getGamesUpToPage } from "../services/gameService";

import "./CategoryPage.css";


function AllGamesPage({
                        onGameClick,
                      }: any) {

  const [games, setGames] =
      useState<any[]>([]);

  const [loading, setLoading] =
      useState(true);

  const [sortBy, setSortBy] =
      useState("default");


  useEffect(() => {

    let isMounted = true;


    getGamesUpToPage(10)

        .then((data) => {

          if (isMounted) {

            setGames(data);

          }

        })

        .catch((error) => {

          console.error(
              "Failed to load games:",
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


  // ==========================
  // SORT GAMES
  // ==========================

  const sortedGames =
      [...games].sort(
          (a, b) => {

            if (
                sortBy === "rating"
            ) {

              return (
                  (b.rating || 0) -
                  (a.rating || 0)
              );

            }


            if (
                sortBy === "title"
            ) {

              return (
                  a.title.localeCompare(
                      b.title
                  )
              );

            }


            return 0;

          }
      );


  return (

      <div className="category-page">


        {/* ==========================
          PAGE HEADER
      ========================== */}

        <div className="games-page-header">

          <div>

            <h1>
              All Games
            </h1>


            {!loading && (

                <p className="games-count">

                  Explore {games.length} games

                </p>

            )}

          </div>


          {!loading &&
              games.length > 0 && (

                  <div className="games-toolbar">

            <span>
              Sort by
            </span>


                    <select
                        value={sortBy}

                        onChange={(e) =>
                            setSortBy(
                                e.target.value
                            )
                        }
                    >

                      <option value="default">
                        Default
                      </option>

                      <option value="rating">
                        Rating
                      </option>

                      <option value="title">
                        Name
                      </option>

                    </select>

                  </div>

              )}

        </div>


        {/* ==========================
          LOADING
      ========================== */}

        {loading ? (

            <div className="games-loading">

              <div className="loading-spinner"></div>

              <p>
                Loading games...
              </p>

            </div>

        ) : (

            <div className="game-grid">

              {sortedGames.map(
                  (game) => {

                    const visibleGenres =
                        game.genres?.slice(
                            0,
                            2
                        ) || [];


                    const hiddenGenres =
                        Math.max(
                            0,
                            (game.genres?.length || 0) -
                            visibleGenres.length
                        );


                    const visiblePlatforms =
                        game.platforms?.slice(
                            0,
                            3
                        ) || [];


                    const hiddenPlatforms =
                        Math.max(
                            0,
                            (game.platforms?.length || 0) -
                            visiblePlatforms.length
                        );


                    return (

                        <div
                            className="game-card"

                            key={game.id}

                            onClick={() =>
                                onGameClick(game)
                            }
                        >


                          {/* ==========================
                      IMAGE
                  ========================== */}

                          <div className="game-card-image">

                            <img
                                src={game.image}
                                alt={game.title}
                            />


                            <div className="game-card-overlay">

                      <span>
                        View Game
                      </span>

                            </div>

                          </div>


                          {/* ==========================
                      INFO
                  ========================== */}

                          <div className="game-info">


                            <h2>
                              {game.title}
                            </h2>


                            {/* GENRES */}

                            <div className="genre">

                              {visibleGenres.map(
                                  (
                                      genre: string
                                  ) => (

                                      <span
                                          key={
                                            genre
                                          }
                                      >
                            {genre}
                          </span>

                                  )
                              )}


                              {hiddenGenres > 0 && (

                                  <span className="more-tag">

                          +{hiddenGenres}

                        </span>

                              )}

                            </div>


                            {/* PLATFORMS */}

                            <div className="platforms">

                              {visiblePlatforms.map(
                                  (
                                      platform: string
                                  ) => (

                                      <span
                                          key={
                                            platform
                                          }
                                      >
                            {platform}
                          </span>

                                  )
                              )}


                              {hiddenPlatforms > 0 && (

                                  <span className="more-platforms">

                          +{hiddenPlatforms}

                        </span>

                              )}

                            </div>


                            {/* FOOTER */}

                            <div className="game-card-footer">

                      <span className="game-card-details">

                        GameHelper

                      </span>


                              <div className="rating">

                        <span className="rating-star">
                          ★
                        </span>

                                {game.rating || "-"}

                              </div>

                            </div>

                          </div>

                        </div>

                    );

                  }
              )}

            </div>

        )}


        {/* ==========================
          EMPTY STATE
      ========================== */}

        {!loading &&
            games.length === 0 && (

                <div className="no-games">

                  <div className="no-games-icon">
                    🎮
                  </div>

                  <h2>
                    No games found
                  </h2>

                  <p>
                    There are currently no games
                    available.
                  </p>

                </div>

            )}

      </div>

  );

}


export default AllGamesPage;