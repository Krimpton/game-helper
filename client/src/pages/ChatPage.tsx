import { useEffect, useState } from "react";

import Chat from "../components/Chat";
import PrivateChat from "../components/PrivateChat";

import { getFriends, removeFriend } from "../services/friendService";

import "./ChatPage.css";


function ChatPage() {

  // ==========================
  // FRIENDS
  // ==========================

  const [friends, setFriends] = useState<any[]>([]);

  const [selectedFriend, setSelectedFriend] =
    useState<any>(null);


  // ==========================
  // LOAD FRIENDS
  // ==========================

  useEffect(() => {

    const loadFriends = async () => {

      try {

        const data = await getFriends();

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

  const handleRemoveFriend = async (friend: any) => {

    const confirmed = window.confirm(
      `Are you sure you want to remove ${friend.username} from your friends?`
    );

    if (!confirmed) {
      return;
    }


    try {

      await removeFriend(friend.id);


      // Freund aus der Liste entfernen
      setFriends((currentFriends) =>
        currentFriends.filter(
          (currentFriend) =>
            currentFriend.id !== friend.id
        )
      );


      // Falls gerade der entfernte Freund geöffnet ist,
      // zurück zum Global Chat
      if (selectedFriend?.id === friend.id) {

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
  // SELECT GLOBAL CHAT
  // ==========================

  const openGlobalChat = () => {

    setSelectedFriend(null);

  };


  return (

    <div className="chat-page">

      <div className="chat-container">


        {/* ==========================
            SIDEBAR
        ========================== */}

        <aside className="chat-sidebar">

          <h2>
            💬 Chat
          </h2>


          {/* ==========================
              GLOBAL CHAT
          ========================== */}

          <div
            className={`chat-user-box ${
              selectedFriend === null
                ? "active-chat"
                : ""
            }`}
            onClick={openGlobalChat}
          >

            <div className="online-dot"></div>

            <span>
              Global Chat
            </span>

          </div>


          {/* ==========================
              FRIENDS
          ========================== */}

          <h3 className="friends-title">
            👥 Friends
          </h3>


          {friends.length === 0 ? (

            <p className="chat-info">
              You don't have any friends yet.
            </p>

          ) : (

            <div className="chat-friends-list">

              {friends.map((friend) => (

                <div
                  key={friend.id}
                  className={`chat-friend ${
                    selectedFriend?.id === friend.id
                      ? "active-chat"
                      : ""
                  }`}
                >

                  {/* FRIEND */}

                  <div
                    className="chat-friend-main"
                    onClick={() =>
                      setSelectedFriend(friend)
                    }
                  >

                    <img
                      src={
                        friend.profileImage
                          ? friend.profileImage.startsWith("http")
                            ? friend.profileImage
                            : `http://localhost:3000${friend.profileImage}`
                          : "/images/dummy-profile-blue.png"
                      }
                      alt={friend.username}
                      className="chat-friend-avatar"
                    />


                    <span>
                      {friend.username}
                    </span>

                  </div>


                  {/* REMOVE FRIEND BUTTON */}

                  <button
                    className="remove-friend-button"
                    onClick={(event) => {

                      event.stopPropagation();

                      handleRemoveFriend(friend);

                    }}
                    title={`Remove ${friend.username}`}
                  >

                    ✕

                  </button>

                </div>

              ))}

            </div>

          )}

        </aside>


        {/* ==========================
            CHAT AREA
        ========================== */}

        <main className="chat-main">

          {selectedFriend ? (

            <PrivateChat
              friend={selectedFriend}
            />

          ) : (

            <Chat />

          )}

        </main>


      </div>

    </div>

  );

}


export default ChatPage;