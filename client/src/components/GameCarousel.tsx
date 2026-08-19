import { useEffect, useState } from "react";
import { getGamesUpToPage } from "../services/gameService";


function GameCarousel() {
  const [games, setGames] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getGamesUpToPage(3)
      .then(setGames)
      .catch(console.error);
  }, []);

  // Automatischer Wechsel
  useEffect(() => {
    if (games.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === games.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [games]);

  const nextSlide = () => {
    if (games.length === 0) return;

    setCurrentIndex((prev) =>
      prev === games.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (games.length === 0) return;

    setCurrentIndex((prev) =>
      prev === 0 ? games.length - 1 : prev - 1
    );
  };

  if (games.length === 0) {
    return null;
  }

  /*
    Wir zeigen immer 5 Spiele:

          -2   -1    0   +1   +2
           ↓    ↓    ↓    ↓    ↓
         links links MITTE rechts rechts

    Durch translateX + scale + rotateY
    entsteht der Carousel-Effekt.
  */

  const getGame = (offset: number) => {
    const index =
      (currentIndex + offset + games.length) %
      games.length;

    return games[index];
  };

  const visibleGames = [-2, -1, 0, 1, 2].map((offset) => ({
    game: getGame(offset),
    offset,
  }));

  return (
    <section className="carousel-wrapper">

      <div className="carousel">

        {/* =========================
            GAMES
        ========================= */}

        <div className="carousel-track">

          {visibleGames.map(({ game, offset }) => (

            <div
              key={`${game.id}-${offset}`}
              className={`carousel-card ${
                offset === 0 ? "active" : ""
              } ${
                offset < 0 ? "previous" : ""
              } ${
                offset > 0 ? "next" : ""
              }`}
              data-position={offset}
            >

              <img
                src={game.image}
                alt={game.title}
              />

              {/* Titel nur beim mittleren Spiel */}
              {offset === 0 && (
                <div className="carousel-title">


                  <h2>
                    {game.title}
                  </h2>

                  {game.rating > 0 && (
                    <div className="carousel-rating">
                      ⭐ {game.rating}
                    </div>
                  )}

                </div>
              )}

            </div>

          ))}

        </div>


        {/* =========================
            LEFT BUTTON
        ========================= */}

        <button
          className="carousel-btn carousel-btn-left"
          onClick={prevSlide}
          aria-label="Previous game"
        >
          ‹
        </button>


        {/* =========================
            RIGHT BUTTON
        ========================= */}

        <button
          className="carousel-btn carousel-btn-right"
          onClick={nextSlide}
          aria-label="Next game"
        >
          ›
        </button>

      </div>

    </section>
  );
}

export default GameCarousel;