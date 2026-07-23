import "./GameModal.css";
import { useState } from "react";


function GameModal({
  game,
  onClose,
  onAddGameStatus,
}: any) {


  const [selectedStatus, setSelectedStatus] = useState("");

  if (!game) return null;



  const statuses = [
    {
      id: "wishlist",
      label: "❤️ Wishlist"
    },
    {
      id: "want_to_play",
      label: "💭 Want To Play"
    },
    {
      id: "playing",
      label: "🔥 Playing"
    },
    {
      id: "completed",
      label: "✅ Completed"
    },
    {
      id: "dropped",
      label: "❌ Dropped"
    }
  ];



  const handleAddGame = () => {

    if(!selectedStatus){
      return;
    }


    if(onAddGameStatus){

      onAddGameStatus(
        game,
        selectedStatus
      );

    }


  };




  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >


      <div
        className="modal-content"
        onClick={(e)=>e.stopPropagation()}
      >


        <img
          src={game.image}
          alt={game.title}
        />



        <div className="modal-info">


          <h2>
            {game.title}
          </h2>



          <div className="genre">
            {game.genres?.join(", ")}
          </div>



          <div className="platforms">
            {game.platforms?.join(", ")}
          </div>



          <div className="rating">
            ⭐ {game.rating}
          </div>



          <h3>
            Add to library
          </h3>


          <div className="status-buttons">


          {
            statuses.map((status)=>(

              <button

                key={status.id}

                className={
                  selectedStatus === status.id
                  ? "selected-status"
                  : ""
                }

                onClick={() =>
                  setSelectedStatus(status.id)
                }

              >

                {status.label}

              </button>


            ))
          }


          </div>




          <button

            className="add-game-btn"

            onClick={handleAddGame}

          >

            Add Game

          </button>





          <button

            className="close-btn"

            onClick={onClose}

          >

            Close

          </button>



        </div>


      </div>


    </div>

  );

}


export default GameModal;