import "./ChatButton.css";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faComments,
} from "@fortawesome/free-solid-svg-icons";


function ChatButton() {

  const navigate = useNavigate();


  const openChat = () => {

    navigate("/chat");

  };


  return (

      <button
          type="button"
          className="chat-button"
          onClick={openChat}
          title="Open Chat"
          aria-label="Open Chat"
      >

        <FontAwesomeIcon
            icon={faComments}
        />

        <span className="chat-button-label">

      </span>

      </button>

  );

}


export default ChatButton;