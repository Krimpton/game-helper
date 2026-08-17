import { useEffect, useState } from "react";
import EmojiPicker, {
  Theme,
  Categories,
} from "emoji-picker-react";

import {
  getChatMessages,
  sendChatMessage,
} from "../services/chatService";

import "./Chat.css";


// ==========================
// USER COLOR
// ==========================

function getUserColor(name: string) {

  let hash = 0;

  for (let i = 0; i < name.length; i++) {

    hash =
      name.charCodeAt(i) +
      ((hash << 5) - hash);

  }

  const colors = [
    "#66c0f4",
    "#c084fc",
    "#4ade80",
    "#fbbf24",
    "#f87171",
    "#38bdf8",
    "#fb7185",
    "#a78bfa",
    "#34d399",
    "#f97316",
  ];

  return colors[
    Math.abs(hash) % colors.length
  ];
}


function Chat() {


  const [messages, setMessages] =
    useState<any[]>([]);

  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [username, setUsername] =
    useState("Guest");


  // ==========================
  // LOAD CURRENT USER
  // ==========================

  const loadCurrentUser = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/api/auth/me",
        {
          credentials: "include",
        }
      );


      if (!response.ok) {

        setUsername("Guest");

        return;

      }


      const data =
        await response.json();


      setUsername(
        data.user.username
      );


    } catch (error) {

      console.error(
        "Loading user failed:",
        error
      );

    }

  };


  // ==========================
  // LOAD MESSAGES
  // ==========================

  const loadMessages = async () => {

    try {

      const data =
        await getChatMessages();

      setMessages(data);


    } catch (error) {

      console.error(
        "Loading messages failed:",
        error
      );

    }

  };


  // ==========================
  // LOAD + AUTO REFRESH
  // ==========================

  useEffect(() => {

    loadCurrentUser();

    loadMessages();


    const interval =
      setInterval(
        loadMessages,
        2000
      );


    return () => {

      clearInterval(interval);

    };

  }, []);


  // ==========================
  // SEND MESSAGE
  // ==========================

  const handleSend = async () => {

    if (!message.trim()) {

      return;

    }


    try {

      await sendChatMessage(
        username,
        message.trim()
      );


      setMessage("");


      loadMessages();


    } catch (error) {

      console.error(
        "Sending message failed:",
        error
      );

    }

  };


  // ==========================
  // EMOJI
  // ==========================

  const handleEmojiClick = (
    emojiData: any
  ) => {

    setMessage(
      (prev) =>
        prev + emojiData.emoji
    );

  };


  return (

    <div className="chat-box">


      {/* ==========================
          HEADER
      ========================== */}

      <div className="chat-header">

        🌎 Global Chat

      </div>


      {/* ==========================
          MESSAGES
      ========================== */}

      <div className="messages">

        {messages.map((msg: any) => {

          const isOwnMessage =
            msg.username === username;


          const userColor =
            getUserColor(
              msg.username
            );


          return (

            <div

              key={msg.id}

              className={`message ${
                isOwnMessage
                  ? "message-own"
                  : "message-other"
              }`}

              style={
                {
                  "--user-color":
                    userColor,
                } as React.CSSProperties
              }

            >

              <strong>

                {isOwnMessage
                  ? "You"
                  : msg.username}

              </strong>


              <p>

                {msg.message}

              </p>

            </div>

          );

        })}

      </div>


      {/* ==========================
          INPUT
      ========================== */}

      <div className="chat-input">


        {/* EMOJI */}

        <div className="emoji-container">

          <button

            className="emoji-button"

            onClick={() =>
              setShowEmojiPicker(
                !showEmojiPicker
              )
            }

          >

            😊

          </button>


          {showEmojiPicker && (

            <div className="emoji-picker">

              <EmojiPicker

                onEmojiClick={
                  handleEmojiClick
                }

                theme={Theme.DARK}

                width={430}

                height={450}

                searchDisabled={false}

                skinTonesDisabled

                previewConfig={{
                  showPreview: false,
                }}

                lazyLoadEmojis

                categoryIcons={{

                  [Categories.SUGGESTED]:
                    <span>🕘</span>,

                  [Categories.SMILEYS_PEOPLE]:
                    <span>😀</span>,

                  [Categories.ANIMALS_NATURE]:
                    <span>🐻</span>,

                  [Categories.FOOD_DRINK]:
                    <span>🍔</span>,

                  [Categories.TRAVEL_PLACES]:
                    <span>✈️</span>,

                  [Categories.ACTIVITIES]:
                    <span>⚽</span>,

                  [Categories.OBJECTS]:
                    <span>💡</span>,

                  [Categories.SYMBOLS]:
                    <span>🔣</span>,

                  [Categories.FLAGS]:
                    <span>🚩</span>,

                }}

              />

            </div>

          )}

        </div>


        {/* INPUT */}

        <input

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          placeholder="Write a message..."

          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              handleSend();

            }

          }}

        />


        {/* SEND */}

        <button

          onClick={handleSend}

        >

          Send

        </button>


      </div>

    </div>

  );

}


export default Chat;