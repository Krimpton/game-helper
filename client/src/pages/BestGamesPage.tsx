import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { getGamesUpToPage } from "../services/gameService";

import "./CategoryPage.css";


function BestGamesPage({
                         onGameClick,
                       }: any) {

  const [games, setGames] =
      useState<any[]>([]);

  const [loading, setLoading] =
      useState(true);


  useEffect(() => {

    let isMounted = true;


    const loadGames = async () => {

      try {

        const data =
            await getGamesUpToPage(10);


        if (isMounted) {

          setGames(data);

        }

      } catch (error) {

        console.error(
            "Failed to load best games:",
            error
        );

      } finally {

        if (isMounted) {

          setLoading(false);

        }

      }

    };


    loadGames();


    return () => {

      isMounted = false;

    };

  }, []);


  // =====================================================
  // FILTER + SORT
  // =====================================================

  const filteredGames =
      useMemo(() => {

        return games
            .filter(
                (game) =>
                    Number(game.rating) >= 4
            )
            .sort(
                (a, b) =>
                    Number(b.rating) -
                    Number(a.rating)
            );

      }, [games]);


  return (

      <div className="category-page">


        {/* ===================================================
          PAGE HEADER
      =================================================== */}

        <div className="category-header">

          <div>

          <span className="category-eyebrow">
            TOP RATED
          </span>


            <h1>
              Best Ranking
            </h1>


            <p className="category-description">
              Discover the highest-rated games
              in the GameHelper library.
            </p>

          </div>


          {!loading && (

              <div className="category-result-count">

                <strong>
                  {filteredGames.length}
                </strong>

                <span>
              games rated 4.0+
            </span>

              </div>

          )}

        </div>


        {/* ===================================================
          LOADING
      =================================================== */}

        {loading ? (

            <div className="games-loading">

              <div className="loading-spinner" />

              <p>
                Loading top-rated games...
              </p>

            </div>

        ) : filteredGames.length > 0 ? (

            /* =================================================
               GAME GRID
            ================================================= */

            <div className="game-grid">

              {filteredGames.map(
                  (game, index) => (

                      <div
                          className="game-card"

                          key={game.id}

                          onClick={() =>
                              onGameClick(game)
                          }
                      >


                        {/* RANK */}

                        <div className="game-rank">

                          #{index + 1}

                        </div>


                        {/* IMAGE */}

                        <img
                            src={game.image}
                            alt={game.title}
                            loading="lazy"
                        />


                        {/* INFO */}

                        <div className="game-info">

                          <h2>
                            {game.title}
                          </h2>


                          {/* GENRES */}

                          {game.genres?.length > 0 && (

                              <div className="genre">

                                {game.genres.join(
                                    ", "
                                )}

                              </div>

                          )}


                          {/* PLATFORMS */}

                          {game.platforms?.length > 0 && (

                              <div className="platforms">

                                {game.platforms.map(
                                    (platform: string) => (

                                        <span
                                            key={platform}
                                        >
                            {platform}
                          </span>

                                    )
                                )}

                              </div>

                          )}


                          {/* RATING */}

                          <div className="rating">

                    <span>
                      ⭐
                    </span>

                            <strong>
                              {Number(
                                  game.rating
                              ).toFixed(1)}
                            </strong>

                          </div>

                        </div>

                      </div>

                  )
              )}

            </div>

        ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <div className="no-games">

              <div className="no-games-icon">
                ⭐
              </div>

              <h2>
                No top-rated games found
              </h2>

              <p>
                There are currently no games
                with a rating of 4.0 or higher.
              </p>

            </div>

        )}

      </div>

  );

}


export default BestGamesPage;