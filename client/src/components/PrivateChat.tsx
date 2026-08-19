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

function PrivateChat({ friend }: PrivateChatProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // ==========================
  // LOAD MESSAGES
  // ==========================

  const loadMessages = async () => {
    try {
      const data = await getPrivateMessages(friend.id);

      setMessages(data.messages || []);
    } catch (error) {
      console.error("Loading private messages failed:", error);
    }
  };

  // ==========================
  // LOAD + AUTO REFRESH
  // ==========================

  useEffect(() => {
    loadMessages();

    const interval = setInterval(() => {
      loadMessages();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [friend.id]);

  // ==========================
  // SEND MESSAGE
  // ==========================

  const handleSend = async () => {
    if (!message.trim()) {
      return;
    }

    try {
      await sendPrivateMessage(
        friend.id,
        message.trim()
      );

      setMessage("");

      loadMessages();
    } catch (error) {
      console.error(
        "Sending private message failed:",
        error
      );
    }
  };

  // ==========================
  // EMOJI
  // ==========================

  const handleEmojiClick = (emojiData: any) => {
    setMessage(
      (prev) => prev + emojiData.emoji
    );
  };

  return (
    <div className="private-chat">

      {/* HEADER */}

      <div className="private-chat-header">

        <img
          src={
            friend.profileImage
              ? friend.profileImage.startsWith("http")
                ? friend.profileImage
                : `http://localhost:3000${friend.profileImage}`
              : "/images/dummy-profile-blue.png"
          }
          alt={friend.username}
          className="private-chat-avatar"
        />

        <div>
          <h3>{friend.username}</h3>
          <span>Private Chat</span>
        </div>

      </div>


      {/* MESSAGES */}

      <div className="private-messages">

        {messages.length === 0 ? (

          <div className="private-chat-empty">
            No messages yet. Say hello! 👋
          </div>

        ) : (

          messages.map((msg: any) => (

            <div
              key={msg.id}
              className={`private-message ${
                Number(msg.senderId) === Number(friend.id)
                  ? "received"
                  : "sent"
              }`}
            >

              <strong>
                {Number(msg.senderId) === Number(friend.id)
                  ? friend.username
                  : "You"}
              </strong>

              <p>
                {msg.message}
              </p>

            </div>

          ))

        )}

      </div>


      {/* INPUT */}

      <div className="private-chat-input">

        <div className="private-emoji-container">

          <button
            className="private-emoji-button"
            onClick={() =>
              setShowEmojiPicker(
                !showEmojiPicker
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


        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder={`Message ${friend.username}...`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />


        <button onClick={handleSend}>
          Send
        </button>

      </div>

    </div>
  );
}

export default PrivateChat;