import {
    useEffect,
    useState,
} from "react";

import {
    getGamesUpToPage,
} from "../services/gameService";

import "./AIHelper.css";


interface AIHelperProps {
    onGameClick: (
        game: any
    ) => void;
}


function AIHelper({
                      onGameClick,
                  }: AIHelperProps) {

    const [games, setGames] =
        useState<any[]>([]);

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [recommendations, setRecommendations] =
        useState<any[]>([]);

    const [response, setResponse] =
        useState(
            "Tell me what kind of game you're looking for and I'll recommend something."
        );


    // ==========================
    // LOAD GAMES
    // ==========================

    useEffect(() => {

        const loadGames =
            async () => {

                try {

                    const data =
                        await getGamesUpToPage(
                            5
                        );

                    setGames(data);

                } catch (error) {

                    console.error(
                        "AI Helper games loading failed:",
                        error
                    );

                }

            };


        loadGames();

    }, []);


    // ==========================
    // FIND RECOMMENDATIONS
    // ==========================

    const findRecommendations = (
        text: string
    ) => {

        const query =
            text
                .toLowerCase()
                .trim();


        let keywords:
            string[] = [];


        // RPG / WOW

        if (
            query.includes("wow") ||
            query.includes("warcraft") ||
            query.includes("rpg") ||
            query.includes("role playing") ||
            query.includes("role-playing") ||
            query.includes("fantasy")
        ) {

            keywords = [
                "role-playing",
                "rpg",
                "adventure",
            ];

        }


        // SHOOTER

        else if (
            query.includes("shooter") ||
            query.includes("shooting") ||
            query.includes("fps") ||
            query.includes("gun") ||
            query.includes("counter strike") ||
            query.includes("cs")
        ) {

            keywords = [
                "shooter",
            ];

        }


        // RACING

        else if (
            query.includes("racing") ||
            query.includes("race") ||
            query.includes("cars") ||
            query.includes("car game")
        ) {

            keywords = [
                "racing",
            ];

        }


        // PUZZLE

        else if (
            query.includes("puzzle") ||
            query.includes("portal")
        ) {

            keywords = [
                "puzzle",
            ];

        }


        // ACTION

        else if (
            query.includes("action") ||
            query.includes("gta")
        ) {

            keywords = [
                "action",
                "adventure",
                "shooter",
            ];

        }


        // INDIE

        else if (
            query.includes("indie")
        ) {

            keywords = [
                "indie",
            ];

        }


        // HORROR

        else if (
            query.includes("horror") ||
            query.includes("scary")
        ) {

            keywords = [
                "horror",
            ];

        }


        // STRATEGY

        else if (
            query.includes("strategy")
        ) {

            keywords = [
                "strategy",
            ];

        }


        // DEFAULT

        else {

            const topGames =
                [...games]
                    .sort(
                        (a, b) =>
                            (b.rating || 0) -
                            (a.rating || 0)
                    )
                    .slice(
                        0,
                        3
                    );


            return {
                games:
                topGames,

                text:
                    "I'm not completely sure what genre you mean, so here are some highly rated games you might enjoy.",
            };

        }


        const filtered =
            games.filter(
                (game) => {

                    const genres =
                        game.genres
                            ?.join(" ")
                            .toLowerCase() ||
                        "";


                    return keywords.some(
                        (keyword) =>
                            genres.includes(
                                keyword
                            )
                    );

                }
            );


        const sorted =
            [...filtered]
                .sort(
                    (a, b) =>
                        (b.rating || 0) -
                        (a.rating || 0)
                )
                .slice(
                    0,
                    3
                );


        return {

            games:
            sorted,

            text:
                sorted.length > 0
                    ? `I found ${sorted.length} games that match what you're looking for.`
                    : "I couldn't find an exact match, but try describing the genre in another way.",

        };

    };


    // ==========================
    // SEND MESSAGE
    // ==========================

    const handleSend =
        () => {

            if (
                !message.trim() ||
                loading
            ) {

                return;

            }


            setLoading(true);

            setRecommendations([]);

            setResponse(
                "Looking through the GameHelper library..."
            );


            /*
             * Small delay makes the demo
             * feel more like an assistant.
             */

            setTimeout(
                () => {

                    const result =
                        findRecommendations(
                            message
                        );


                    setRecommendations(
                        result.games
                    );

                    setResponse(
                        result.text
                    );

                    setMessage("");

                    setLoading(false);

                },
                650
            );

        };


    // ==========================
    // QUICK PROMPTS
    // ==========================

    const usePrompt = (
        prompt: string
    ) => {

        setMessage(
            prompt
        );

    };


    return (

        <div className="ai-helper">


            {/* ==========================
          HEADER
      ========================== */}

            <div className="ai-helper-header">

                <div className="ai-helper-header-main">

                    <div className="ai-helper-logo">

                        ✨

                    </div>


                    <div>

                        <div className="ai-helper-title-row">

                            <h2>
                                AI Game Helper
                            </h2>


                            <span className="ai-helper-beta">

                BETA

              </span>

                        </div>


                        <p>
                            Smart game recommendations
                        </p>

                    </div>

                </div>


                <div className="ai-helper-status">

                    <span />

                    Ready

                </div>

            </div>


            {/* ==========================
          CONTENT
      ========================== */}

            <div className="ai-helper-content">


                <div className="ai-helper-intro">

                    <div className="ai-helper-main-icon">

                        ✨

                    </div>


                    <h3>
                        What do you want to play?
                    </h3>


                    <p>
                        Describe a game, genre or experience
                        and GameHelper will suggest games
                        from the library.
                    </p>

                </div>


                {/* ==========================
            QUICK PROMPTS
        ========================== */}

                <div className="ai-quick-prompts">

                    <button
                        onClick={() =>
                            usePrompt(
                                "I want a game like World of Warcraft"
                            )
                        }
                    >
                        🧙 Like World of Warcraft
                    </button>


                    <button
                        onClick={() =>
                            usePrompt(
                                "Recommend me a shooter"
                            )
                        }
                    >
                        🔫 Shooter
                    </button>


                    <button
                        onClick={() =>
                            usePrompt(
                                "I want a racing game"
                            )
                        }
                    >
                        🏎️ Racing
                    </button>


                    <button
                        onClick={() =>
                            usePrompt(
                                "Recommend a puzzle game"
                            )
                        }
                    >
                        🧩 Puzzle
                    </button>

                </div>


                {/* ==========================
            AI RESPONSE
        ========================== */}

                <div className="ai-response">

                    <div className="ai-response-avatar">

                        ✨

                    </div>


                    <div className="ai-response-message">

                        <strong>
                            GameHelper AI
                        </strong>

                        <p>
                            {response}
                        </p>

                    </div>

                </div>


                {/* ==========================
            RECOMMENDATIONS
        ========================== */}

                {recommendations.length > 0 && (

                    <div className="ai-recommendations">

                        {recommendations.map(
                            (game) => (

                                <button
                                    type="button"

                                    key={
                                        game.id
                                    }

                                    className="ai-game-card"

                                    onClick={() =>
                                        onGameClick(
                                            game
                                        )
                                    }
                                >

                                    <img
                                        src={
                                            game.image
                                        }

                                        alt={
                                            game.title
                                        }
                                    />


                                    <div className="ai-game-info">

                                        <h4>
                                            {
                                                game.title
                                            }
                                        </h4>


                                        <span className="ai-game-genre">

                      {
                          game.genres
                              ?.slice(
                                  0,
                                  2
                              )
                              .join(
                                  " • "
                              )
                      }

                    </span>


                                        <div className="ai-game-footer">

                      <span>
                        ⭐ {
                          game.rating ||
                          "-"
                      }
                      </span>


                                            <span className="ai-view-game">

                        View Game →

                      </span>

                                        </div>

                                    </div>

                                </button>

                            )
                        )}

                    </div>

                )}


            </div>


            {/* ==========================
          INPUT
      ========================== */}

            <div className="ai-helper-input">

                <input
                    value={
                        message
                    }

                    onChange={(event) =>
                        setMessage(
                            event.target.value
                        )
                    }

                    onKeyDown={(event) => {

                        if (
                            event.key ===
                            "Enter"
                        ) {

                            handleSend();

                        }

                    }}

                    placeholder="Example: I want a fantasy RPG..."

                    disabled={
                        loading
                    }
                />


                <button
                    type="button"

                    onClick={
                        handleSend
                    }

                    disabled={
                        loading ||
                        !message.trim()
                    }
                >

                    {loading
                        ? "Thinking..."
                        : "Ask AI"
                    }

                </button>

            </div>


        </div>

    );

}


export default AIHelper;