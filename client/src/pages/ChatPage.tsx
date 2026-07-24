import Chat from "../components/Chat";
import "./ChatPage.css";


function ChatPage() {

  return (

    <div className="chat-page">

      <div className="chat-container">


        <aside className="chat-sidebar">

          <h2>
            💬 Chat
          </h2>


          <div className="chat-user-box">

            <div className="online-dot"></div>

            <span>
              Global Chat
            </span>

          </div>


          <p className="chat-info">

            Friends and private chats
            will appear here later.

          </p>


        </aside>



        <main className="chat-main">

          <Chat />

        </main>


      </div>


    </div>

  );

}


export default ChatPage;