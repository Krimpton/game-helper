import { useEffect, useState } from "react";
import EmojiPicker, {Theme} from "emoji-picker-react";
import {getChatMessages,sendChatMessage,} from "../services/chatService";

import "./Chat.css";


function Chat() {


  const [messages, setMessages] = useState<any[]>([]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("Guest");



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


      if(!response.ok){

        setUsername("Guest");

        return;

      }


      const data = await response.json();


      setUsername(
        data.user.username
      );


    } catch(error){

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


    } catch(error){

      console.error(error);

    }

  };






  useEffect(() => {


    loadCurrentUser();

    loadMessages();



    const interval = setInterval(
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


    if(!message.trim()){

      return;

    }



    try {


      await sendChatMessage(
        username,
        message
      );


      setMessage("");


      loadMessages();


    } catch(error){

      console.error(error);

    }


  };

// ==========================
// EMOJI
// ==========================

const handleEmojiClick = (emojiData: any) => {

  setMessage((prev) => prev + emojiData.emoji);

};

  return (

  <div className="chat-box">

    <div className="chat-header">

      🌎 Global Chat

    </div>




    <div className="messages">

      {

        messages.map((msg:any)=>(

          <div

            key={msg.id}

            className="message"

          >

            <strong>

              {msg.username}

            </strong>

            <p>

              {msg.message}

            </p>

          </div>

        ))

      }

    </div>





    <div className="chat-input">

      <div className="emoji-container">

        <button

          className="emoji-button"

          onClick={() =>
            setShowEmojiPicker(!showEmojiPicker)
          }

        >

          😊

        </button>

        {

          showEmojiPicker && (

            <div className="emoji-picker">

              <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme={Theme.DARK}
                  width={380}
                  height={450}
                  searchDisabled={false}
                  skinTonesDisabled
                  previewConfig={{
                    showPreview: false,
                  }}
                  lazyLoadEmojis
                />
                 </div>

          )

        }

      </div>





      <input

        value={message}

        onChange={(e)=>
          setMessage(e.target.value)
        }

        placeholder="Write a message..."

        onKeyDown={(e)=>{

          if(e.key === "Enter"){

            handleSend();

          }

        }}

      />





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