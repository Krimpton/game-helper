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
    wishlist: "Wishlist",
    want_to_play: "Want To Play",
    playing: "Playing",
    completed: "Completed",
    dropped: "Dropped",
  };


  const icons: Record<string, string> = {
    wishlist: "❤️",
    want_to_play: "💭",
    playing: "🔥",
    completed: "✅",
    dropped: "❌",
  };


  const descriptions: Record<string, string> = {
    wishlist:
        "Games you want to keep an eye on.",

    want_to_play:
        "Games you are planning to start.",

    playing:
        "Games you are currently playing.",

    completed:
        "Games you have already completed.",

    dropped:
        "Games you decided not to continue.",
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

            <div className="game-list-header-main">

              <div className="game-list-header-icon">
                {icons[type] || "🎮"}
              </div>


              <div className="game-list-header-text">

                <div className="game-list-title-row">

                  <h2>
                    {titles[type] || "Game List"}
                  </h2>


                  <span className="game-list-count">

                  {games?.length || 0}

                </span>

                </div>


                <p>
                  {descriptions[type] ||
                      "Games from your library."}
                </p>

              </div>

            </div>


            <button
                className="game-list-close"
                onClick={onClose}
                aria-label="Close"
                title="Close"
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

                <div className="empty-list">

                  <div className="empty-list-icon">
                    🎮
                  </div>


                  <h3>
                    No games here yet
                  </h3>


                  <p>
                    Games added to this category
                    will appear here.
                  </p>

                </div>

            ) : (

                games.map(
                    (game: any) => {

                      const isMoving =
                          movingGameId === game.id;


                      return (

                          <div
                              className={`game-list-item ${
                                  isMoving
                                      ? "game-list-item-moving"
                                      : ""
                              }`}
                              key={game.id}
                          >


                            {/* ==========================
                        IMAGE
                    ========================== */}

                            <div className="game-list-image-wrapper">

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


                              {isMoving && (

                                  <div className="game-list-moving-overlay">

                                    <div className="game-list-moving-spinner" />

                                    <span>
                            Moving...
                          </span>

                                  </div>

                              )}

                            </div>


                            {/* ==========================
                        INFO
                    ========================== */}

                            <div className="game-list-info">

                              <h3>
                                {game.title}
                              </h3>


                              <div className="game-list-meta">

                        <span className="game-list-rating">

                          ⭐{" "}
                          {game.rating !== null &&
                          game.rating !== undefined
                              ? game.rating
                              : "-"}

                        </span>


                                {game.released && (

                                    <span>
                            📅 {game.released}
                          </span>

                                )}

                              </div>


                              {game.personalRating && (

                                  <div className="game-list-extra">

                          <span>
                            Your rating
                          </span>

                                    <strong>
                                      ⭐ {game.personalRating}/5
                                    </strong>

                                  </div>

                              )}


                              {game.note && (

                                  <p className="game-list-note">

                                    {game.note}

                                  </p>

                              )}

                            </div>


                            {/* ==========================
                        ACTIONS
                    ========================== */}

                            <div className="game-list-actions">

                              <label className="move-game-label">

                                Move game

                              </label>


                              <select
                                  className="move-game-select"

                                  value=""

                                  disabled={
                                    isMoving
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

                                  {isMoving
                                      ? "Moving..."
                                      : "Choose category"}

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


                              <button
                                  className="remove-game-btn"

                                  onClick={() =>
                                      onRemove(game.id)
                                  }

                                  disabled={
                                    isMoving
                                  }
                              >

                                Remove

                              </button>

                            </div>


                          </div>

                      );

                    }
                )

            )}

          </div>


          {/* ==========================
            FOOTER
        ========================== */}

          {games?.length > 0 && (

              <div className="game-list-footer">

            <span>

              {games.length}{" "}
              {games.length === 1
                  ? "game"
                  : "games"}

            </span>


                <button
                    onClick={onClose}
                >

                  Done

                </button>

              </div>

          )}

        </div>

      </div>

  );

}


export default GameListModal;