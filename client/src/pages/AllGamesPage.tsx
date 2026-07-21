import { useEffect, useState } from "react";
import { getGamesUpToPage } from "../services/gameService";
import "./CategoryPage.css";

function AllGamesPage({ onGameClick }:any) {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    getGamesUpToPage(10)
      .then(setGames)
      .catch(console.error);
  }, []);

  return (
    <div className="category-page">
      <h1>ALL GAMES</h1>

      <div className="game-grid">
        {games.map((game) => (
          <div className="game-card" key={game.id} onClick={() => onGameClick(game)}>
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

export default AllGamesPage;