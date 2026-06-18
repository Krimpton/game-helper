import { useParams } from "react-router-dom";
import { games } from "../data/games";
import "./CategoryPage.css";

function PlatformPage() {
  const { platform } = useParams();

  const filteredGames = games.filter((game) => {
  if (platform === "playstation") {
    return game.platforms.some(
      (p) => p.includes("PS")
    );
  }

  if (platform === "xbox") {
    return game.platforms.some(
      (p) => p.includes("Xbox")
    );
  }

  if (platform === "pc") {
    return game.platforms.includes("PC");
  }

  return false;
});

  return (
    <div className="category-page">
      <h1>{platform?.toUpperCase()}</h1>

      <div className="game-grid">
        {filteredGames.map((game) => (
          <div className="game-card" key={game.id}>
            <img src={game.image} alt={game.name} />

            <div className="game-info">
              <h2>{game.name}</h2>

              <div className="genre">{game.genre}</div>

              <p>{game.description}</p>

              <div className="platforms">
                {game.platforms.map((platform) => (
                  <span key={platform}>{platform}</span>
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

export default PlatformPage;