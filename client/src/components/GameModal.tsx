import "./GameModal.css";

function GameModal({ game, onClose }: any) {
  if (!game) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <img src={game.image} alt={game.title} />

        <div className="modal-info">
          <h2>{game.title}</h2>

          <div className="genre">
            {game.genres?.join(", ")}
          </div>

          <div className="platforms">
            {game.platforms?.join(", ")}
          </div>

          <div className="rating">
            ⭐ {game.rating}
          </div>

          <button onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default GameModal;