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

  useEffect(() => {
    if (games.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === games.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [games]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === games.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? games.length - 1 : prev - 1
    );
  };

  if (games.length === 0) return null;

  const game = games[currentIndex];

  return (
    <div className="carousel-wrapper">
      <div className="carousel-slide">

        <button className="carousel-btn left" onClick={prevSlide}>
          ❮
        </button>

        <img src={game.image} alt={game.title} />

        <button className="carousel-btn right" onClick={nextSlide}>
          ❯
        </button>

        <div className="carousel-overlay">
          <h2>{game.title}</h2>
          <p>{game.genres?.join(", ")}</p>
          <div>⭐ {game.rating}</div>
        </div>

      </div>
    </div>
  );
}

export default GameCarousel;