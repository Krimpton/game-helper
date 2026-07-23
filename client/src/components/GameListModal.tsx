import "./GameListModal.css";


function GameListModal({
  type,
  games,
  onClose,
  onRemove,
}: any) {


  const titles: any = {
    wishlist: "❤️ Wishlist",
    want_to_play: "💭 Want To Play",
    playing: "🔥 Playing",
    completed: "✅ Completed",
    dropped: "❌ Dropped",
  };


  return (

    <div
      className="game-list-overlay"
      onClick={onClose}
    >


      <div
        className="game-list-modal"
        onClick={(e)=>e.stopPropagation()}
      >


        <div className="game-list-header">

          <h2>
            {titles[type] || "🎮 Game List"}
          </h2>


          <button
            onClick={onClose}
          >
            ✕
          </button>


        </div>




        <div className="game-list-content">


          {
            !games || games.length === 0 ? (

              <p className="empty-list">
                No games added yet.
              </p>

            ) : (


              games.map((game:any)=>(

                <div
                  className="game-list-item"
                  key={game.id}
                >


                  <img
                    src={game.image}
                    alt={game.title}
                  />



                  <div className="game-list-info">

                    <h3>
                      {game.title}
                    </h3>


                    <p>
                      ⭐ {game.rawRating || game.rating || "-"}
                    </p>


                    <span>
                      {game.genres?.join(", ")}
                    </span>


                  </div>




                  <button

                    className="remove-game-btn"

                    onClick={() =>
                      onRemove(game.id)
                    }

                  >

                    Remove

                  </button>



                </div>


              ))

            )
          }


        </div>


      </div>


    </div>

  );

}


export default GameListModal;