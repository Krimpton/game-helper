import { useEffect, useState } from "react";

import Chat from "../components/Chat";
import PrivateChat from "../components/PrivateChat";

import {
  getFriends,
  removeFriend,
} from "../services/friendService";

import "./ChatPage.css";


function ChatPage() {

  // ==========================
  // FRIENDS
  // ==========================

  const [friends, setFriends] =
      useState<any[]>([]);

  const [selectedFriend, setSelectedFriend] =
      useState<any>(null);


  // ==========================
  // LOAD FRIENDS
  // ==========================

  useEffect(() => {

    const loadFriends = async () => {

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

  const handleRemoveFriend = async (
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

  const openGlobalChat = () => {

    setSelectedFriend(null);

  };


  // ==========================
  // RETURN
  // ==========================

  return (

      <div className="chat-page">


        {/* ==========================
          BACKGROUND LIGHTS
      ========================== */}

        <div className="chat-page-glow chat-page-glow-left" />

        <div className="chat-page-glow chat-page-glow-right" />


        <div className="chat-page-content">


          {/* ==========================
            CHAT CONTAINER
        ========================== */}

          <div className="chat-container">


            {/* ==========================
              SIDEBAR
          ========================== */}

            <aside className="chat-sidebar">

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
                      selectedFriend === null
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
                                key={friend.id}

                                className={`chat-friend ${
                                    selectedFriend?.id ===
                                    friend.id
                                        ? "active-chat"
                                        : ""
                                }`}
                            >


                              {/* ==========================
                          FRIEND MAIN
                      ========================== */}

                              <div
                                  className="chat-friend-main"

                                  onClick={() =>
                                      setSelectedFriend(
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

                            {friend.username}

                          </span>


                                  <small>

                                    Available

                                  </small>

                                </div>

                              </div>


                              {/* ==========================
                          REMOVE FRIEND
                      ========================== */}

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

            </aside>


            {/* ==========================
              CHAT AREA
          ========================== */}

            <main className="chat-main">

              {selectedFriend ? (

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


            <div className="chat-feature">

              <div className="chat-feature-icon chat-feature-icon-green">

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


            <div className="chat-feature">

              <div className="chat-feature-icon chat-feature-icon-yellow">

                ⚡

              </div>


              <div className="chat-feature-text">

                <h3>
                  Live Conversations
                </h3>

                <p>
                  Global and private chats
                  keep your conversations
                  in one place.
                </p>

              </div>

            </div>


          </section>


        </div>

      </div>

  );

}


export default ChatPage;