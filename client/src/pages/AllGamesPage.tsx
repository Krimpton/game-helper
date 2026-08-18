import { useEffect, useState } from "react";
import { getGamesUpToPage } from "../services/gameService";

import "./CategoryPage.css";


function AllGamesPage({
  onGameClick
}: any) {

  const [games, setGames] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);


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


  return (

    <div className="category-page">


      <h1>
        ALL GAMES
      </h1>


      {loading ? (

        <div className="games-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading games...
          </p>

        </div>

      ) : (

        <div className="game-grid">

          {games.map(
            (game) => (

              <div
                className="game-card"

                key={game.id}

                onClick={() =>
                  onGameClick(game)
                }
              >

                <img
                  src={game.image}
                  alt={game.title}
                />


                <div className="game-info">

                  <h2>
                    {game.title}
                  </h2>


                  <div className="genre">

                    {game.genres?.join(
                      ", "
                    )}

                  </div>


                  <div className="platforms">

                    {game.platforms?.map(
                      (p: string) => (

                        <span key={p}>
                          {p}
                        </span>

                      )
                    )}

                  </div>


                  <div className="rating">

                    ⭐ {game.rating}

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}


      {!loading &&
        games.length === 0 && (

          <div className="no-games">

            <p>
              No games found.
            </p>

          </div>

        )}

    </div>

  );

}


export default AllGamesPage;