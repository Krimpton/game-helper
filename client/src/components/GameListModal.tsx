import { useState } from "react";
import "./GameListModal.css";


type LibraryStatus =
  | "wishlist"
  | "want_to_play"
  | "playing"
  | "completed"
  | "dropped";


function GameListModal({
  type,
  games,
  onClose,
  onRemove,
  onMove,
}: any) {

  const [movingGameId, setMovingGameId] =
    useState<number | null>(null);


  const titles: Record<string, string> = {

    wishlist:
      "❤️ Wishlist",

    want_to_play:
      "💭 Want To Play",

    playing:
      "🔥 Playing",

    completed:
      "✅ Completed",

    dropped:
      "❌ Dropped",

  };


  const statuses: {
    id: LibraryStatus;
    label: string;
  }[] = [

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


  const handleMove = async (
    gameId: number,
    newStatus: LibraryStatus
  ) => {

    /*
     * Wenn derselbe Status gewählt wird,
     * müssen wir nichts machen.
     */

    if (newStatus === type) {

      return;

    }


    try {

      setMovingGameId(
        gameId
      );


      await onMove(
        gameId,
        newStatus
      );

    } catch (error) {

      console.error(
        "Failed to move game:",
        error
      );

    } finally {

      setMovingGameId(
        null
      );

    }

  };


  return (

    <div
      className="game-list-overlay"
      onClick={onClose}
    >

      <div
        className="game-list-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >


        {/* ==========================
            HEADER
        ========================== */}

        <div className="game-list-header">

          <h2>
            {titles[type] || "🎮 Game List"}
          </h2>


          <button
            onClick={onClose}
            aria-label="Close"
          >

            ✕

          </button>

        </div>


        {/* ==========================
            CONTENT
        ========================== */}

        <div className="game-list-content">

          {!games ||
          games.length === 0 ? (

            <p className="empty-list">
              No games added yet.
            </p>

          ) : (

            games.map(
              (game: any) => (

                <div
                  className="game-list-item"
                  key={game.id}
                >


                  {/* ==========================
                      IMAGE
                  ========================== */}

                  {game.image ? (

                    <img
                      src={game.image}
                      alt={game.title}
                    />

                  ) : (

                    <div className="game-list-image-placeholder">
                      🎮
                    </div>

                  )}


                  {/* ==========================
                      INFO
                  ========================== */}

                  <div className="game-list-info">

                    <h3>
                      {game.title}
                    </h3>


                    <p>
                      ⭐{" "}
                      {game.rating !== null &&
                      game.rating !== undefined
                        ? game.rating
                        : "-"}
                    </p>


                    {game.released && (

                      <span>
                        Released: {game.released}
                      </span>

                    )}


                    {game.personalRating && (

                      <span>
                        Your rating: ⭐{" "}
                        {game.personalRating}/5
                      </span>

                    )}


                    {game.note && (

                      <span>
                        Note: {game.note}
                      </span>

                    )}

                  </div>


                  {/* ==========================
                      ACTIONS
                  ========================== */}

                  <div
                    className="game-list-actions"
                  >

                    {/* MOVE GAME */}

                    <select
                      className="move-game-select"
                      value=""
                      disabled={
                        movingGameId === game.id
                      }
                      onChange={(e) => {

                        const newStatus =
                          e.target.value as LibraryStatus;


                        if (!newStatus) {
                          return;
                        }


                        handleMove(
                          game.id,
                          newStatus
                        );

                      }}
                    >

                      <option value="">
                        {movingGameId === game.id
                          ? "Moving..."
                          : "Move to..."}
                      </option>


                      {statuses
                        .filter(
                          (status) =>
                            status.id !== type
                        )
                        .map(
                          (status) => (

                            <option
                              key={status.id}
                              value={status.id}
                            >
                              {status.label}
                            </option>

                          )
                        )}

                    </select>


                    {/* REMOVE */}

                    <button
                      className="remove-game-btn"
                      onClick={() =>
                        onRemove(game.id)
                      }
                      disabled={
                        movingGameId === game.id
                      }
                    >

                      Remove

                    </button>

                  </div>


                </div>

              )
            )

          )}

        </div>

      </div>

    </div>

  );

}


export default GameListModal;