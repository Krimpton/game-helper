import { useState } from "react";

import "./GameModal.css";


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
            icon: "❤️",
            label: "Wishlist",
        },
        {
            id: "want_to_play",
            icon: "💭",
            label: "Want To Play",
        },
        {
            id: "playing",
            icon: "🔥",
            label: "Playing",
        },
        {
            id: "completed",
            icon: "✅",
            label: "Completed",
        },
        {
            id: "dropped",
            icon: "❌",
            label: "Dropped",
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
                onClick={(event) =>
                    event.stopPropagation()
                }
            >


                {/* CLOSE */}

                <button
                    type="button"
                    className="modal-close-icon"
                    onClick={onClose}
                    disabled={loading}
                    aria-label="Close game modal"
                >
                    ×
                </button>


                {/* IMAGE */}

                <div className="modal-image-wrapper">

                    <img
                        src={
                            game.imageLarge ||
                            game.image
                        }
                        alt={game.title}
                    />

                    <div className="modal-image-gradient" />

                </div>


                {/* CONTENT */}

                <div className="modal-info">


                    {/* TITLE */}

                    <div className="modal-title-row">

                        <div>

                            <h2>
                                {game.title}
                            </h2>

                            <p className="modal-subtitle">
                                Game details
                            </p>

                        </div>


                        <div className="modal-rating">

              <span className="modal-rating-star">
                ★
              </span>

                            {game.rating ?? "N/A"}

                        </div>

                    </div>


                    {/* META */}

                    <div className="modal-meta">


                        {game.genres?.length > 0 && (

                            <div className="modal-meta-group">

                <span className="modal-meta-label">
                  Genres
                </span>

                                <div className="modal-tags">

                                    {game.genres.map(
                                        (genre: string) => (

                                            <span
                                                key={genre}
                                                className="modal-tag"
                                            >
                        {genre}
                      </span>

                                        )
                                    )}

                                </div>

                            </div>

                        )}


                        {game.platforms?.length > 0 && (

                            <div className="modal-meta-group">

                <span className="modal-meta-label">
                  Platforms
                </span>

                                <div className="modal-tags">

                                    {game.platforms.map(
                                        (platform: string) => (

                                            <span
                                                key={platform}
                                                className="modal-platform-tag"
                                            >
                        {platform}
                      </span>

                                        )
                                    )}

                                </div>

                            </div>

                        )}

                    </div>


                    {/* LIBRARY */}

                    <div className="modal-library-section">

                        <div className="modal-section-header">

                            <div>

                <span className="modal-section-label">
                  Library
                </span>

                                <h3>
                                    Add to your library
                                </h3>

                            </div>

                            <span className="modal-section-hint">
                Choose status
              </span>

                        </div>


                        <div className="status-buttons">

                            {statuses.map(
                                (status) => {

                                    const isSelected =
                                        selectedStatus ===
                                        status.id;


                                    return (

                                        <button
                                            type="button"

                                            key={status.id}

                                            className={
                                                isSelected
                                                    ? "selected-status"
                                                    : ""
                                            }

                                            onClick={() => {

                                                if (loading) {
                                                    return;
                                                }


                                                setSelectedStatus(
                                                    status.id
                                                );

                                                setError("");

                                                setMessage("");

                                            }}

                                            disabled={loading}
                                        >

                      <span className="status-icon">
                        {status.icon}
                      </span>

                                            <span className="status-label">
                        {status.label}
                      </span>


                                            {isSelected && (

                                                <span className="status-selected-mark">
                          ✓
                        </span>

                                            )}

                                        </button>

                                    );

                                }
                            )}

                        </div>

                    </div>


                    {/* MESSAGE */}

                    {message && (

                        <div className="modal-message modal-message-success">

              <span>
                ✓
              </span>

                            {message}

                        </div>

                    )}


                    {error && (

                        <div className="modal-message modal-message-error">

              <span>
                !
              </span>

                            {error}

                        </div>

                    )}


                    {/* ACTIONS */}

                    <div className="modal-actions">

                        <button
                            type="button"

                            className="add-game-btn"

                            onClick={
                                handleAddGame
                            }

                            disabled={
                                loading ||
                                !selectedStatus
                            }
                        >

                            {loading
                                ? "Adding..."
                                : "Add Game"
                            }

                        </button>


                        <button
                            type="button"

                            className="close-btn"

                            onClick={onClose}

                            disabled={loading}
                        >

                            Cancel

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default GameModal;