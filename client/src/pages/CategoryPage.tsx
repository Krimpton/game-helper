import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesUpToPage } from "../services/gameService";
import "./CategoryPage.css";

function CategoryPage({ onGameClick }: any) {
    const { category } = useParams();
    const [games, setGames] = useState<any[]>([]);

    useEffect(() => {
        getGamesUpToPage(10)
            .then(setGames)
            .catch(console.error);
    }, []);

    const categoryMap: Record<string, string[]> = {
        action: [
            "Shooter",
            "Adventure",
            "Hack and slash/Beat 'em up",
            "Fighting",
        ],
        rpg: ["Role-playing (RPG)"],
        puzzle: ["Puzzle"],
        shooter: ["Shooter"],
        simulator: ["Simulator"],
        racing: ["Racing"],
        arcade: ["Arcade"],
    };

    const filteredGames = games.filter((game) => {
        const currentCategory = category?.toLowerCase();

        if (!currentCategory) {
            return false;
        }

        const allowedGenres = categoryMap[currentCategory];

        if (!allowedGenres) {
            return false;
        }

        return game.genres?.some((genre: string) =>
            allowedGenres.includes(genre)
        );
    });

    return (
        <div className="category-page">
            <h1>{category?.toUpperCase()}</h1>

            <div className="game-grid">
                {filteredGames.map((game) => (
                    <div
                        className="game-card"
                        key={game.id}
                        onClick={() => onGameClick(game)}
                    >
                        <img src={game.image} alt={game.title} />

                        <div className="game-info">
                            <h2>{game.title}</h2>

                            <div className="genre">
                                {game.genres?.join(", ")}
                            </div>

                            <div className="platforms">
                                {game.platforms?.map((p: string) => (
                                    <span key={p}>{p}</span>
                                ))}
                            </div>

                            <div className="rating">
                                ⭐ {game.rating}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;