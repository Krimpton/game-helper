import {
  useEffect,
  useState,
} from "react";

import Chat from "../components/Chat";
import PrivateChat from "../components/PrivateChat";
import VoiceRoom from "../components/VoiceRoom";
import AIHelper from "../components/AIHelper";

import {
  getFriends,
  removeFriend,
} from "../services/friendService";

import "./ChatPage.css";


function ChatPage({
                    onGameClick,
                  }: any) {

  // ==========================
  // FRIENDS
  // ==========================

  const [friends, setFriends] =
      useState<any[]>([]);

  const [selectedFriend, setSelectedFriend] =
      useState<any>(null);

  const [activeChatMode, setActiveChatMode] =
      useState<
          "global" |
          "private" |
          "voice" |
          "ai"
      >("global");


  // ==========================
  // LOAD FRIENDS
  // ==========================

  useEffect(() => {

    const loadFriends =
        async () => {

          try {

            const data =
                await getFriends();

            setFriends(data);

          } catch (error) {

            console.error(
                "Loading friends failed:",
                error
            );

          }

        };


    loadFriends();

  }, []);


  // ==========================
  // REMOVE FRIEND
  // ==========================

  const handleRemoveFriend =
      async (
          friend: any
      ) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to remove ${friend.username} from your friends?`
            );


        if (!confirmed) {
          return;
        }


        try {

          await removeFriend(
              friend.id
          );


          setFriends(
              (currentFriends) =>
                  currentFriends.filter(
                      (currentFriend) =>
                          currentFriend.id !==
                          friend.id
                  )
          );


          if (
              selectedFriend?.id ===
              friend.id
          ) {

            setSelectedFriend(null);

            setActiveChatMode(
                "global"
            );

          }

        } catch (error) {

          console.error(
              "Removing friend failed:",
              error
          );


          alert(
              "Could not remove this friend."
          );

        }

      };


  // ==========================
  // GLOBAL CHAT
  // ==========================

  const openGlobalChat =
      () => {

        setSelectedFriend(null);

        setActiveChatMode(
            "global"
        );

      };


  // ==========================
  // PRIVATE CHAT
  // ==========================

  const openPrivateChat =
      (
          friend: any
      ) => {

        setSelectedFriend(
            friend
        );

        setActiveChatMode(
            "private"
        );

      };


  // ==========================
  // VOICE CHAT
  // ==========================

  const openVoiceChat =
      () => {

        setSelectedFriend(null);

        setActiveChatMode(
            "voice"
        );

      };


  // ==========================
  // AI HELPER
  // ==========================

  const openAIHelper =
      () => {

        setSelectedFriend(null);

        setActiveChatMode(
            "ai"
        );

      };


  // ==========================
  // RETURN
  // ==========================

  return (

      <div className="chat-page">


        {/* ==========================
          BACKGROUND LIGHTS
      ========================== */}

        <div
            className="
          chat-page-glow
          chat-page-glow-left
        "
        />

        <div
            className="
          chat-page-glow
          chat-page-glow-right
        "
        />


        <div className="chat-page-content">


          {/* ==========================
            CHAT CONTAINER
        ========================== */}

          <div className="chat-container">


            {/* ==========================
              SIDEBAR
          ========================== */}

            <aside className="chat-sidebar">


              {/* ==========================
                SIDEBAR HEADER
            ========================== */}

              <div className="chat-sidebar-header">

                <div className="chat-sidebar-title-icon">

                  💬

                </div>


                <div>

                  <h2>
                    Chat
                  </h2>

                  <span>
                  Stay connected
                </span>

                </div>

              </div>


              {/* ==========================
                GLOBAL CHAT
            ========================== */}

              <div
                  className={`chat-user-box ${
                      activeChatMode ===
                      "global"
                          ? "active-chat"
                          : ""
                  }`}
                  onClick={
                    openGlobalChat
                  }
              >

                <div className="online-dot" />

                <span>
                Global Chat
              </span>

              </div>


              {/* ==========================
                FRIENDS TITLE
            ========================== */}

              <div className="friends-title-row">

                <h3 className="friends-title">

                  👥 Friends

                </h3>


                <span className="friends-count">

                {friends.length}

              </span>

              </div>


              {/* ==========================
                FRIENDS
            ========================== */}

              {friends.length === 0 ? (

                  <div className="chat-empty-friends">

                    <div className="chat-empty-icon">
                      👤
                    </div>


                    <p>
                      No friends yet
                    </p>


                    <span>
                  Add players to start
                  private conversations.
                </span>

                  </div>

              ) : (

                  <div className="chat-friends-list">

                    {friends.map(
                        (friend) => (

                            <div
                                key={
                                  friend.id
                                }

                                className={`chat-friend ${
                                    activeChatMode ===
                                    "private" &&
                                    selectedFriend?.id ===
                                    friend.id

                                        ? "active-chat"
                                        : ""
                                }`}
                            >


                              {/* FRIEND MAIN */}

                              <div
                                  className="chat-friend-main"

                                  onClick={() =>
                                      openPrivateChat(
                                          friend
                                      )
                                  }
                              >

                                <div className="chat-avatar-wrapper">

                                  <img
                                      src={
                                        friend.profileImage

                                            ? friend.profileImage.startsWith(
                                                "http"
                                            )

                                                ? friend.profileImage

                                                : `http://localhost:3000${friend.profileImage}`

                                            : "/images/dummy-profile-blue.png"
                                      }

                                      alt={
                                        friend.username
                                      }

                                      className="chat-friend-avatar"
                                  />


                                  <span className="friend-online-dot" />

                                </div>


                                <div className="chat-friend-info">

                          <span className="chat-friend-name">

                            {
                              friend.username
                            }

                          </span>


                                  <small>
                                    Available
                                  </small>

                                </div>

                              </div>


                              {/* REMOVE FRIEND */}

                              <button
                                  type="button"

                                  className="remove-friend-button"

                                  onClick={(event) => {

                                    event.stopPropagation();


                                    handleRemoveFriend(
                                        friend
                                    );

                                  }}

                                  title={`Remove ${friend.username}`}
                              >

                                ✕

                              </button>

                            </div>

                        )
                    )}

                  </div>

              )}


              {/* ==========================
                FEATURES
            ========================== */}

              <div className="chat-sidebar-features">


                <div className="chat-sidebar-section-header">

                  FEATURES

                </div>


                {/* ==========================
                  VOICE CHAT
              ========================== */}

                <button
                    type="button"

                    className={`chat-sidebar-feature ${
                        activeChatMode ===
                        "voice"
                            ? "chat-sidebar-feature-active"
                            : ""
                    }`}

                    onClick={
                      openVoiceChat
                    }
                >

                  <div className="chat-sidebar-feature-icon">

                    🎙️

                  </div>


                  <div className="chat-sidebar-feature-content">

                    <div className="chat-sidebar-feature-title">

                    <span>
                      Voice Chat
                    </span>


                      <span className="chat-sidebar-beta">

                      BETA

                    </span>

                    </div>


                    <span className="chat-sidebar-feature-description">

                    Global Voice Room

                  </span>

                  </div>


                  <span className="chat-sidebar-feature-arrow">

                  ›

                </span>

                </button>


                {/* ==========================
                  AI GAME HELPER
              ========================== */}

                <button
                    type="button"

                    className={`chat-sidebar-feature ${
                        activeChatMode ===
                        "ai"
                            ? "chat-sidebar-feature-active"
                            : ""
                    }`}

                    onClick={
                      openAIHelper
                    }
                >

                  <div className="chat-sidebar-feature-icon">

                    ✨

                  </div>


                  <div className="chat-sidebar-feature-content">

                    <div className="chat-sidebar-feature-title">

                    <span>
                      AI Game Helper
                    </span>


                      <span className="chat-sidebar-beta">

                      BETA

                    </span>

                    </div>


                    <span className="chat-sidebar-feature-description">

                    Game recommendations

                  </span>

                  </div>


                  <span className="chat-sidebar-feature-arrow">

                  ›

                </span>

                </button>


              </div>


            </aside>


            {/* ==========================
              CHAT AREA
          ========================== */}

            <main className="chat-main">


              {activeChatMode ===
              "voice" ? (

                  <VoiceRoom />

              ) : activeChatMode ===
              "ai" ? (

                  <AIHelper
                      onGameClick={
                        onGameClick
                      }
                  />

              ) : activeChatMode ===
              "private" &&
              selectedFriend ? (

                  <PrivateChat
                      friend={
                        selectedFriend
                      }
                  />

              ) : (

                  <Chat />

              )}


            </main>


          </div>


          {/* ==========================
            COMMUNITY FEATURES
        ========================== */}

          <section className="chat-features">


            {/* SHARE */}

            <div className="chat-feature">

              <div className="chat-feature-icon">

                🎮

              </div>


              <div className="chat-feature-text">

                <h3>
                  Share & Connect
                </h3>

                <p>
                  Share gaming experiences,
                  tips and recommendations
                  with other players.
                </p>

              </div>

            </div>


            {/* COMMUNITY */}

            <div className="chat-feature">

              <div className="chat-feature-icon">

                👥

              </div>


              <div className="chat-feature-text">

                <h3>
                  GameHelper Community
                </h3>

                <p>
                  Meet players and build
                  your own gaming network.
                </p>

              </div>

            </div>


            {/* FRIENDLY SPACE */}

            <div className="chat-feature">

              <div
                  className="
                chat-feature-icon
                chat-feature-icon-green
              "
              >

                🛡️

              </div>


              <div className="chat-feature-text">

                <h3>
                  Friendly Space
                </h3>

                <p>
                  A clean environment
                  designed for gaming
                  conversations.
                </p>

              </div>

            </div>


            {/* LIVE CONVERSATIONS */}

            <div className="chat-feature">

              <div
                  className="
                chat-feature-icon
                chat-feature-icon-yellow
              "
              >

                ⚡

              </div>


              <div className="chat-feature-text">

                <h3>
                  Live Conversations
                </h3>

                <p>
                  Global, private, voice
                  and AI features keep your
                  gaming experience in one place.
                </p>

              </div>

            </div>


          </section>


        </div>

      </div>

  );

}


export default ChatPage;