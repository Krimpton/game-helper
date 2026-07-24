import "./ChatButton.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function ChatButton() {
  const navigate = useNavigate();

  return (
    <button
      className="chat-button"
      onClick={() => navigate("/chat")}
      title="Open Chat"
    >
      <FontAwesomeIcon icon={faComments} />
    </button>
  );
}

export default ChatButton;