import { useEffect, useState } from "react";
import { getGamesUpToPage } from "../services/gameService";

function GameCarousel({ onGameClick }: any) {
    const [games, setGames] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const [backgroundA, setBackgroundA] = useState<string | null>(null);
    const [backgroundB, setBackgroundB] = useState<string | null>(null);
    const [showBackgroundA, setShowBackgroundA] = useState(true);

    useEffect(() => {
        getGamesUpToPage(3)
            .then(setGames)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (games.length <= 1 || isPaused) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === games.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [games, isPaused]);

    useEffect(() => {
        if (games.length === 0) {
            return;
        }

        const activeGame = games[currentIndex];

        const nextBackground =
            activeGame.backgroundImage ||
            activeGame.image;

        if (!backgroundA) {
            setBackgroundA(nextBackground);
            return;
        }

        if (showBackgroundA) {
            setBackgroundB(nextBackground);
            setShowBackgroundA(false);
        } else {
            setBackgroundA(nextBackground);
            setShowBackgroundA(true);
        }
    }, [currentIndex, games]);

    const nextSlide = () => {
        if (games.length === 0) {
            return;
        }

        setCurrentIndex((prev) =>
            prev === games.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        if (games.length === 0) {
            return;
        }

        setCurrentIndex((prev) =>
            prev === 0 ? games.length - 1 : prev - 1
        );
    };

    if (games.length === 0) {
        return null;
    }

    const getGame = (offset: number) => {
        const index =
            (currentIndex + offset + games.length) %
            games.length;

        return games[index];
    };

    const visibleGames = [-2, -1, 0, 1, 2].map(
        (offset) => ({
            game: getGame(offset),
            offset,
        })
    );

    return (
        <section className="carousel-wrapper">

            {/* BACKGROUND A */}
            <div
                className={`carousel-background-layer ${
                    showBackgroundA ? "visible" : ""
                }`}
                style={{
                    backgroundImage: backgroundA
                        ? `url(${backgroundA})`
                        : "none",
                }}
            />

            {/* BACKGROUND B */}
            <div
                className={`carousel-background-layer ${
                    !showBackgroundA ? "visible" : ""
                }`}
                style={{
                    backgroundImage: backgroundB
                        ? `url(${backgroundB})`
                        : "none",
                }}
            />

            <div className="carousel-background-overlay" />

            <div
                className="carousel"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="carousel-track">

                    {visibleGames.map(({ game, offset }) => {
                        const isActive = offset === 0;

                        return (
                            <div
                                key={`${game.id}-${offset}`}
                                className={`carousel-card ${
                                    isActive ? "active" : ""
                                } ${
                                    offset < 0 ? "previous" : ""
                                } ${
                                    offset > 0 ? "next" : ""
                                }`}
                                data-position={offset}
                                onClick={() => {
                                    if (isActive && onGameClick) {
                                        onGameClick(game);
                                    }
                                }}
                            >
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    draggable={false}
                                />

                                {isActive && (
                                    <>
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

                                        <div className="carousel-open-hint">
                                            View game
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}

                </div>

                <button
                    className="carousel-btn carousel-btn-left"
                    onClick={prevSlide}
                    aria-label="Previous game"
                >
                    ‹
                </button>

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