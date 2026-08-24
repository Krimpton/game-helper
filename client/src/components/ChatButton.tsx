import "./ChatButton.css";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faComments,
} from "@fortawesome/free-solid-svg-icons";


function ChatButton() {

    const navigate = useNavigate();

    const unreadCount = 3;


    const openChat = () => {

        navigate("/chat");

    };


    return (

        <button
            type="button"

            className="chat-button"

            onClick={
                openChat
            }

            title="Open Chat"

            aria-label="Open Chat"
        >

            <FontAwesomeIcon
                icon={
                    faComments
                }
            />


            {unreadCount > 0 && (

                <span className="chat-unread-badge">

          {unreadCount > 9
              ? "9+"
              : unreadCount
          }

        </span>

            )}


            <span className="chat-button-label">

      </span>

        </button>

    );

}


export default ChatButton;