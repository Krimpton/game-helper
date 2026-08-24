import { useState } from "react";

import "./VoiceRoom.css";


function VoiceRoom() {

    const [joined, setJoined] =
        useState(false);

    const [muted, setMuted] =
        useState(false);


    const handleJoin = () => {

        setJoined(true);

        setMuted(false);

    };


    const handleLeave = () => {

        setJoined(false);

        setMuted(false);

    };


    return (

        <div className="voice-room">


            {/* HEADER */}

            <div className="voice-room-header">

                <div className="voice-room-header-main">

                    <div className="voice-room-icon">
                        🎙️
                    </div>


                    <div>

                        <div className="voice-room-title-row">

                            <h2>
                                Global Voice Room
                            </h2>

                            <span className="voice-beta">
                BETA
              </span>

                        </div>


                        <p>
                            Talk with other GameHelper players
                        </p>

                    </div>

                </div>


                <div className="voice-room-status">

          <span
              className={`voice-status-dot ${
                  joined
                      ? "connected"
                      : ""
              }`}
          />

                    {joined
                        ? "Connected"
                        : "Ready"
                    }

                </div>

            </div>


            {/* CONTENT */}

            <div className="voice-room-content">


                {!joined ? (

                    <div className="voice-room-welcome">

                        <div className="voice-room-main-icon">
                            🎧
                        </div>


                        <h3>
                            Join the conversation
                        </h3>


                        <p>
                            Enter the Global Voice Room and connect
                            with players from the GameHelper community.
                        </p>


                        <div className="voice-room-info">

                            <div>

                                <strong>
                                    2
                                </strong>

                                <span>
                  Users online
                </span>

                            </div>


                            <div>

                                <strong>
                                    Global
                                </strong>

                                <span>
                  Public room
                </span>

                            </div>


                            <div>

                                <strong>
                                    Beta
                                </strong>

                                <span>
                  Voice feature
                </span>

                            </div>

                        </div>


                        <button
                            className="voice-join-btn"
                            onClick={handleJoin}
                        >
                            🎙️ Join Voice Room
                        </button>


                        <span className="voice-beta-note">
              Voice communication is currently in beta.
            </span>

                    </div>

                ) : (

                    <div className="voice-connected">


                        <div className="voice-connected-top">

                            <div>

                <span className="voice-section-label">
                  CURRENT ROOM
                </span>

                                <h3>
                                    Global Voice Room
                                </h3>

                            </div>


                            <span className="voice-live-badge">
                ● LIVE
              </span>

                        </div>


                        {/* USERS */}

                        <div className="voice-users">


                            <div className="voice-user active">

                                <div className="voice-user-avatar">
                                    Y
                                </div>


                                <div className="voice-user-info">

                                    <strong>
                                        You
                                    </strong>

                                    <span>
                    {muted
                        ? "Microphone muted"
                        : "Connected"
                    }
                  </span>

                                </div>


                                <div className="voice-user-state">

                                    {muted
                                        ? "🔇"
                                        : "🎤"
                                    }

                                </div>

                            </div>


                            <div className="voice-user">

                                <div className="voice-user-avatar">
                                    G
                                </div>


                                <div className="voice-user-info">

                                    <strong>
                                        GameHelper User
                                    </strong>

                                    <span>
                    Connected
                  </span>

                                </div>


                                <div className="voice-user-state">
                                    🎤
                                </div>

                            </div>

                        </div>


                        {/* CONTROLS */}

                        <div className="voice-controls">

                            <button
                                className={`voice-control-btn ${
                                    muted
                                        ? "muted"
                                        : ""
                                }`}
                                onClick={() =>
                                    setMuted(
                                        (current) =>
                                            !current
                                    )
                                }
                            >
                                {muted
                                    ? "🔇 Unmute"
                                    : "🎤 Mute"
                                }
                            </button>


                            <button
                                className="voice-leave-btn"
                                onClick={handleLeave}
                            >
                                Leave Room
                            </button>

                        </div>


                        <p className="voice-demo-note">
                            Voice room interface is currently running
                            as a beta preview.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}


export default VoiceRoom;