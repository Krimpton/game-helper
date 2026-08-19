import "./GameModal.css";
import { useState } from "react";


function GameModal({
  game,
  onClose,
  onAddGameStatus,
}: any) {

  const [selectedStatus, setSelectedStatus] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  if (!game) {
    return null;
  }


  const statuses = [
    {
      id: "wishlist",
      label: "❤️ Wishlist",
    },
    {
      id: "want_to_play",
      label: "💭 Want To Play",
    },
    {
      id: "playing",
      label: "🔥 Playing",
    },
    {
      id: "completed",
      label: "✅ Completed",
    },
    {
      id: "dropped",
      label: "❌ Dropped",
    },
  ];


  const handleAddGame = async () => {

    if (!selectedStatus) {

      setError(
        "Please select a status first."
      );

      setMessage("");

      return;

    }


    try {

      setLoading(true);

      setError("");

      setMessage("");


      await onAddGameStatus(
        game,
        selectedStatus
      );


      setMessage(
        "Game added to your library!"
      );

    } catch (error: any) {

      setError(
        error.message ||
        "Failed to add game to library."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <img
          src={game.image}
          alt={game.title}
        />


        <div className="modal-info">

          <h2>
            {game.title}
          </h2>


          <div className="genre">
            {game.genres?.join(", ")}
          </div>


          <div className="platforms">
            {game.platforms?.join(", ")}
          </div>


          <div className="rating">
            ⭐ {game.rating}
          </div>


          <h3>
            Add to library
          </h3>


          <div className="status-buttons">

            {statuses.map(
              (status) => (

                <button
                  key={status.id}

                  className={
                    selectedStatus ===
                    status.id
                      ? "selected-status"
                      : ""
                  }

                  onClick={() => {

                    if (!loading) {

                      setSelectedStatus(
                        status.id
                      );

                      setError("");

                      setMessage("");

                    }

                  }}

                  disabled={loading}
                >

                  {status.label}

                </button>

              )
            )}

          </div>


          {message && (

            <div
              style={{
                marginBottom: "15px",
                color: "#72e3a0",
                fontSize: "14px",
                textAlign: "center",
              }}
            >

              ✓ {message}

            </div>

          )}


          {error && (

            <div
              style={{
                marginBottom: "15px",
                color: "#ff7b7b",
                fontSize: "14px",
                textAlign: "center",
              }}
            >

              {error}

            </div>

          )}


          <button
            className="add-game-btn"

            onClick={
              handleAddGame
            }

            disabled={loading}
          >

            {loading
              ? "Adding..."
              : "Add Game"
            }

          </button>


          <button
            className="close-btn"
            onClick={onClose}
            disabled={loading}
          >

            Close

          </button>

        </div>

      </div>

    </div>
  );
}


export default GameModal;