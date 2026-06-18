import { useParams } from "react-router-dom";
import { games } from "../data/games";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();

  const filteredGames = games.filter((game) =>
    game.genre.toLowerCase().includes(category?.toLowerCase() || "")
  );

  return (
    <div className="category-page">
      <h1>{category?.toUpperCase()}</h1>

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

export default CategoryPage;