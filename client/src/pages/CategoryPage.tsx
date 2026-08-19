import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesUpToPage } from "../services/gameService";

import "./CategoryPage.css";


function CategoryPage({ onGameClick }: any) {

  const { category } = useParams();

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

        if (isMounted) {

          setGames(data);

        }

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
    category?.toLowerCase();


  const allowedGenres =
    currentCategory
      ? categoryMap[currentCategory]
      : undefined;


  // =====================================================
  // FILTER
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
  // RETURN
  // =====================================================

  return (

    <div className="category-page">


      <h1>
        {category?.toUpperCase()}
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

          {filteredGames.map(
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
        filteredGames.length === 0 && (

          <div className="no-games">

            <p>
              No games found in this category.
            </p>

          </div>

        )}

    </div>

  );

}


export default CategoryPage;