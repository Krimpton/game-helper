import "./GameModal.css";
import { useState } from "react";


function GameModal({
  game,
  onClose,
  onAddFavorite,
  onAddWishlist,
}: any) {


  const [refresh, setRefresh] = useState(false);


  if (!game) return null;



  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );



  const favorites = user.favorites || [];

  const wishlist = user.wishlist || [];



  const isFavorite = favorites.some(
    (g:any) => g.id === game.id
  );



  const isWishlist = wishlist.some(
    (g:any) => g.id === game.id
  );




  const handleFavorite = () => {

    if(isFavorite){
      return;
    }


    if(onAddFavorite){

      onAddFavorite(game);

      setRefresh(!refresh);

    }

  };




  const handleWishlist = () => {


    if(isWishlist){
      return;
    }



    if(onAddWishlist){

      onAddWishlist(game);

      setRefresh(!refresh);

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





          <div className="game-actions">


            <button

              className="favorite-btn"

              onClick={handleFavorite}

              disabled={isFavorite}

            >

              {
                isFavorite
                ? "⭐ Added"
                : "⭐ Add Favorite"
              }

            </button>






            <button

              className="wishlist-btn"

              onClick={handleWishlist}

              disabled={isWishlist}

            >

              {
                isWishlist
                ? "❤️ Added"
                : "❤️ Add Wishlist"
              }

            </button>


          </div>






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