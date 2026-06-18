import { useEffect, useState } from "react";
import { games } from "../data/games";

const GameCarousel = () => {
  const [index, setIndex] = useState(0);

  // Auto slide alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % games.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % games.length);
  };

  const game = games[index];

  return (
    <section className="carousel-wrapper">
      <div className="carousel">
        <button className="arrow left" onClick={prevSlide}>
          ‹
        </button>

        <img src={game.image} alt={game.name} />

        <button className="arrow right" onClick={nextSlide}>
          ›
        </button>

        <div className="carousel-overlay">
          <h2>{game.name}</h2>
          <br />
          <p>Genre: {game.genre}</p>
          <br />
          <p>Description: {game.description}</p>
          <br />
          <p>Platforms: {game.platforms}</p>
          <br />
          <span>⭐ {game.rating}</span>
        </div>
      </div>
    </section>
  );
};

export default GameCarousel;