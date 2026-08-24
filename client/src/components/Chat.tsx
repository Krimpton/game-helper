import {
  useEffect,
  useState,
} from "react";

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

function getUserColor(
    name: string
) {

  let hash = 0;


  for (
      let i = 0;
      i < name.length;
      i++
  ) {

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
  Math.abs(hash) %
  colors.length
      ];

}


// ==========================
// FORMAT MESSAGE TIME
// ==========================

function formatMessageTime(
    msg: any
) {

  const rawDate =
      msg.createdAt ||
      msg.created_at ||
      msg.timestamp ||
      msg.date;


  if (!rawDate) {
    return "";
  }


  const date =
      new Date(rawDate);


  if (
      Number.isNaN(
          date.getTime()
      )
  ) {

    return "";

  }


  return date.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
  );

}


// ==========================
// CHAT
// ==========================

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

  const loadCurrentUser =
      async () => {

        try {

          const response =
              await fetch(
                  "http://localhost:3000/api/auth/me",
                  {
                    credentials:
                        "include",
                  }
              );


          if (!response.ok) {

            setUsername(
                "Guest"
            );

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


          setUsername(
              "Guest"
          );

        }

      };


  // ==========================
  // LOAD MESSAGES
  // ==========================

  const loadMessages =
      async () => {

        try {

          const data =
              await getChatMessages();


          setMessages(
              data
          );

        } catch (error) {

          console.error(
              "Loading messages failed:",
              error
          );

        }

      };


  // ==========================
  // INITIAL LOAD + REFRESH
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

      clearInterval(
          interval
      );

    };

  }, []);


  // ==========================
  // SEND MESSAGE
  // ==========================

  const handleSend =
      async () => {

        const trimmedMessage =
            message.trim();


        if (!trimmedMessage) {
          return;
        }


        try {

          await sendChatMessage(
              username,
              trimmedMessage
          );


          setMessage("");

          setShowEmojiPicker(
              false
          );


          await loadMessages();

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

  const handleEmojiClick =
      (
          emojiData: any
      ) => {

        setMessage(
            (currentMessage) =>
                currentMessage +
                emojiData.emoji
        );

      };


  // ==========================
  // RETURN
  // ==========================

  return (

      <div className="chat-box">


        {/* ==========================
          CHAT HEADER
      ========================== */}

        <div className="chat-header">

          <div className="chat-header-main">

            <div className="chat-header-icon">

              🌎

            </div>


            <div>

              <h2>
                Global Chat
              </h2>


              <span>
              Chat with the GameHelper community
            </span>

            </div>

          </div>


          <div className="chat-online">

            <span className="chat-online-dot" />

            Online

          </div>

        </div>


        {/* ==========================
          MESSAGES
      ========================== */}

        <div className="messages">

          {messages.length === 0 ? (

              <div className="chat-empty-state">

            <span>
              💬
            </span>

                <p>
                  No messages yet.
                </p>

                <small>
                  Start the conversation!
                </small>

              </div>

          ) : (

              messages.map(
                  (msg: any) => {

                    const isOwnMessage =
                        msg.username ===
                        username;


                    const userColor =
                        getUserColor(
                            msg.username ||
                            "Guest"
                        );


                    const messageTime =
                        formatMessageTime(
                            msg
                        );


                    return (

                        <div
                            key={
                              msg.id
                            }

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


                          {/* MESSAGE HEADER */}

                          <div className="message-header">

                            <strong>

                              {isOwnMessage
                                  ? "You"
                                  : msg.username
                              }

                            </strong>


                            {messageTime && (

                                <span className="message-time">

                        {messageTime}

                      </span>

                            )}

                          </div>


                          {/* MESSAGE TEXT */}

                          <p>
                            {msg.message}
                          </p>


                        </div>

                    );

                  }
              )

          )}

        </div>


        {/* ==========================
          INPUT BAR
      ========================== */}

        <div className="chat-input">


          {/* ==========================
            EMOJI
        ========================== */}

          <div className="emoji-container">

            <button
                type="button"

                className="emoji-button"

                aria-label="Open emoji picker"

                onClick={() =>
                    setShowEmojiPicker(
                        (current) =>
                            !current
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

                      theme={
                        Theme.DARK
                      }

                      width={
                        430
                      }

                      height={
                        450
                      }

                      searchDisabled={
                        false
                      }

                      skinTonesDisabled

                      previewConfig={{
                        showPreview:
                            false,
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


          {/* ==========================
            MESSAGE INPUT
        ========================== */}

          <input
              type="text"

              value={
                message
              }

              onChange={(e) =>
                  setMessage(
                      e.target.value
                  )
              }

              placeholder="Write a message..."

              autoComplete="off"

              onKeyDown={(e) => {

                if (
                    e.key ===
                    "Enter" &&
                    !e.shiftKey
                ) {

                  e.preventDefault();

                  handleSend();

                }

              }}
          />


          {/* ==========================
            SEND BUTTON
        ========================== */}

          <button
              type="button"

              onClick={
                handleSend
              }

              disabled={
                !message.trim()
              }
          >

            Send

          </button>

        </div>

      </div>

  );

}


export default Chat;