import {
    useEffect,
    useState,
} from "react";

import "./GameModal.css";

import {
    getLibrary,
    updateLibraryGame,
} from "../services/libraryService";


function GameModal({
                       game,
                       onClose,
                       onAddGameStatus,
                   }: any) {

    const [selectedStatus, setSelectedStatus] =
        useState<string | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [checkingLibrary, setCheckingLibrary] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [libraryGame, setLibraryGame] =
        useState<any>(null);


    // =====================================================
    // STATUSES
    // =====================================================

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


    // =====================================================
    // CHECK IF GAME IS ALREADY IN LIBRARY
    // =====================================================

    const checkLibrary = async () => {

        if (!game) {
            return;
        }


        try {

            setCheckingLibrary(true);

            setError("");

            const library =
                await getLibrary();


            const existingGame =
                library.find(
                    (item: any) =>
                        Number(item.gameId) ===
                        Number(game.id)
                );


            if (existingGame) {

                setLibraryGame(existingGame);

                setSelectedStatus(
                    existingGame.status
                );

            } else {

                setLibraryGame(null);

                setSelectedStatus(null);

            }


        } catch (error) {

            console.error(
                "Failed to check library:",
                error
            );


            setLibraryGame(null);

            setSelectedStatus(null);

        } finally {

            setCheckingLibrary(false);

        }

    };


    // =====================================================
    // RESET + CHECK WHEN GAME CHANGES
    // =====================================================

    useEffect(() => {

        setSelectedStatus(null);

        setMessage("");

        setError("");

        setLoading(false);

        setLibraryGame(null);


        if (game) {

            checkLibrary();

        }

    }, [game?.id]);


    if (!game) {
        return null;
    }


    // =====================================================
    // ADD OR UPDATE GAME
    // =====================================================

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


            // =====================================================
            // GAME ALREADY EXISTS -> UPDATE STATUS
            // =====================================================

            if (libraryGame) {

                const updatedGame =
                    await updateLibraryGame(
                        libraryGame.id,
                        {
                            status:
                                selectedStatus as any,
                        }
                    );


                setLibraryGame(
                    updatedGame
                );


                setMessage(
                    "Game status updated!"
                );


                window.dispatchEvent(
                    new Event(
                        "libraryUpdated"
                    )
                );


                return;

            }


            // =====================================================
            // NEW GAME -> ADD TO LIBRARY
            // =====================================================

            await onAddGameStatus(
                game,
                selectedStatus
            );


            setMessage(
                "Game added to your library!"
            );


            // =====================================================
            // RELOAD LIBRARY
            // =====================================================

            await checkLibrary();


        } catch (error: any) {

            setError(
                error.message ||
                "Failed to update game library."
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // CURRENT STATUS LABEL
    // =====================================================

    const currentStatus =
        statuses.find(
            (status) =>
                status.id ===
                libraryGame?.status
        );


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


                {/* =====================================================
            CLOSE
        ===================================================== */}

                <button
                    type="button"
                    className="modal-close-icon"
                    onClick={onClose}
                    disabled={loading}
                    aria-label="Close game modal"
                >
                    ×
                </button>


                {/* =====================================================
            IMAGE
        ===================================================== */}

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


                {/* =====================================================
            CONTENT
        ===================================================== */}

                <div className="modal-info">


                    {/* =====================================================
              TITLE
          ===================================================== */}

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


                    {/* =====================================================
              META
          ===================================================== */}

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


                    {/* =====================================================
              LIBRARY STATUS
          ===================================================== */}

                    <div className="modal-library-section">

                        <div className="modal-section-header">

                            <div>

                <span className="modal-section-label">
                  Library
                </span>


                                <h3>
                                    {checkingLibrary
                                        ? "Checking library..."
                                        : libraryGame
                                            ? "Already in your library"
                                            : "Add to your library"
                                    }
                                </h3>

                            </div>


                            {!checkingLibrary && (

                                <span className="modal-section-hint">

                  {libraryGame
                      ? currentStatus
                          ? `Current: ${currentStatus.label}`
                          : "In library"
                      : "Choose status"
                  }

                </span>

                            )}

                        </div>


                        {/* =====================================================
                STATUS BUTTONS
            ===================================================== */}

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

                                                if (
                                                    loading ||
                                                    checkingLibrary
                                                ) {
                                                    return;
                                                }


                                                setSelectedStatus(
                                                    status.id
                                                );

                                                setError("");

                                                setMessage("");

                                            }}

                                            disabled={
                                                loading ||
                                                checkingLibrary
                                            }
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


                    {/* =====================================================
              SUCCESS
          ===================================================== */}

                    {message && (

                        <div className="modal-message modal-message-success">

              <span>
                ✓
              </span>

                            {message}

                        </div>

                    )}


                    {/* =====================================================
              ERROR
          ===================================================== */}

                    {error && (

                        <div className="modal-message modal-message-error">

              <span>
                !
              </span>

                            {error}

                        </div>

                    )}


                    {/* =====================================================
              ACTIONS
          ===================================================== */}

                    <div className="modal-actions">

                        <button
                            type="button"

                            className="add-game-btn"

                            onClick={
                                handleAddGame
                            }

                            disabled={
                                loading ||
                                checkingLibrary ||
                                !selectedStatus
                            }
                        >

                            {loading
                                ? libraryGame
                                    ? "Updating..."
                                    : "Adding..."
                                : libraryGame
                                    ? "Update Status"
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