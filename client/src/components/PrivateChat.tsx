import { useEffect, useState } from "react";
import EmojiPicker, {
  Theme,
  Categories,
} from "emoji-picker-react";

import {
  getPrivateMessages,
  sendPrivateMessage,
} from "../services/privateChatService";

import "./PrivateChat.css";


interface PrivateChatProps {
  friend: {
    id: number;
    username: string;
    profileImage?: string;
  };
}


function PrivateChat({
                       friend,
                     }: PrivateChatProps) {

  const [messages, setMessages] =
      useState<any[]>([]);

  const [message, setMessage] =
      useState("");

  const [showEmojiPicker, setShowEmojiPicker] =
      useState(false);

  const [sending, setSending] =
      useState(false);


  // ==========================
  // LOAD MESSAGES
  // ==========================

  const loadMessages = async () => {

    try {

      const data =
          await getPrivateMessages(
              friend.id
          );


      setMessages(
          data.messages || []
      );

    } catch (error) {

      console.error(
          "Loading private messages failed:",
          error
      );

    }

  };


  // ==========================
  // LOAD + AUTO REFRESH
  // ==========================

  useEffect(() => {

    loadMessages();


    const interval =
        setInterval(
            loadMessages,
            2000
        );


    return () => {

      clearInterval(interval);

    };

  }, [friend.id]);


  // ==========================
  // SEND MESSAGE
  // ==========================

  const handleSend = async () => {

    const trimmedMessage =
        message.trim();


    if (
        !trimmedMessage ||
        sending
    ) {

      return;

    }


    try {

      setSending(true);


      await sendPrivateMessage(
          friend.id,
          trimmedMessage
      );


      setMessage("");

      setShowEmojiPicker(false);


      await loadMessages();

    } catch (error) {

      console.error(
          "Sending private message failed:",
          error
      );

    } finally {

      setSending(false);

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


  // ==========================
  // AVATAR
  // ==========================

  const friendAvatar =
      friend.profileImage

          ? friend.profileImage.startsWith(
              "http"
          )

              ? friend.profileImage

              : `http://localhost:3000${friend.profileImage}`

          : "/images/dummy-profile-blue.png";


  return (

      <div className="private-chat">


        {/* ==========================
          HEADER
      ========================== */}

        <div className="private-chat-header">


          <div className="private-chat-user">

            <div className="private-avatar-wrapper">

              <img
                  src={friendAvatar}
                  alt={friend.username}
                  className="private-chat-avatar"
              />


              <span className="private-online-dot" />

            </div>


            <div className="private-chat-user-info">

              <h3>
                {friend.username}
              </h3>


              <span>
              Private conversation
            </span>

            </div>

          </div>


          <div className="private-chat-status">

            <span className="private-status-dot" />

            Online

          </div>

        </div>


        {/* ==========================
          MESSAGES
      ========================== */}

        <div className="private-messages">


          {messages.length === 0 ? (

              <div className="private-chat-empty">

                <div className="private-chat-empty-icon">
                  💬
                </div>


                <strong>
                  No messages yet
                </strong>


                <span>
              Start a conversation with{" "}
                  {friend.username}
            </span>

              </div>

          ) : (

              messages.map(
                  (msg: any) => {

                    const isReceived =
                        Number(
                            msg.senderId
                        ) ===
                        Number(
                            friend.id
                        );


                    return (

                        <div
                            key={msg.id}

                            className={`private-message ${
                                isReceived
                                    ? "received"
                                    : "sent"
                            }`}
                        >

                          <strong>

                            {isReceived
                                ? friend.username
                                : "You"}

                          </strong>


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
          INPUT
      ========================== */}

        <div className="private-chat-input">


          {/* EMOJI */}

          <div className="private-emoji-container">

            <button
                type="button"

                className="private-emoji-button"

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

                <div className="private-emoji-picker">

                  <EmojiPicker

                      onEmojiClick={
                        handleEmojiClick
                      }

                      theme={
                        Theme.DARK
                      }

                      width={430}

                      height={450}

                      searchDisabled={
                        false
                      }

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


          {/* MESSAGE INPUT */}

          <input

              value={message}

              onChange={(e) =>
                  setMessage(
                      e.target.value
                  )
              }

              placeholder={`Message ${friend.username}...`}

              autoComplete="off"

              disabled={sending}

              onKeyDown={(e) => {

                if (
                    e.key === "Enter" &&
                    !e.shiftKey
                ) {

                  e.preventDefault();

                  handleSend();

                }

              }}

          />


          {/* SEND */}

          <button
              type="button"

              onClick={
                handleSend
              }

              disabled={
                  sending ||
                  !message.trim()
              }
          >

            {sending
                ? "Sending..."
                : "Send"}

          </button>

        </div>

      </div>

  );

}


export default PrivateChat;