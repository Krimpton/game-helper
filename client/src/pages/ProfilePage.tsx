import { useState } from "react";
import "./ProfilePage.css";
import GameListModal from "../components/GameListModal";

function ProfilePage() {

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );


  const [user, setUser] = useState(storedUser);


  const [isEditing, setIsEditing] = useState(false);

  const [savedMessage, setSavedMessage] = useState(false);


  const [openList, setOpenList] = useState("");
  
  // PROFILE IMAGE

  const [image, setImage] = useState(
    user.profileImage ||
    "/images/dummy-profile-blue.png"
  );


  // BANNER

  const [banner, setBanner] = useState(
    user.banner || ""
  );


  // PROFILE DATA

  const [username, setUsername] = useState(
    user.username || ""
  );


  const [aboutMe, setAboutMe] = useState(
    user.aboutMe || ""
  );


  const [favoriteGame, setFavoriteGame] = useState(
    user.favoriteGame || ""
  );


  const [favoriteGenre, setFavoriteGenre] = useState(
    user.favoriteGenre || ""
  );


  const [favoritePlatform, setFavoritePlatform] = useState(
    user.favoritePlatform || ""
  );


  // SOCIALS

  const [discord, setDiscord] = useState(
    user.discord || ""
  );


  const [steam, setSteam] = useState(
    user.steam || ""
  );


  const [github, setGithub] = useState(
    user.github || ""
  );


  const [reddit, setReddit] = useState(
    user.reddit || ""
  );


  // DUMMY DATA

  const friends = [
    "Alex",
    "Sarah",
    "Mike",
    "Emma"
  ];


  const favorites =
    user.favorites || [];


  const wishlist =
    user.wishlist || [];



  // ======================
  // IMAGE UPLOAD
  // ======================


  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;


    const reader = new FileReader();


    reader.onloadend = () => {

      setImage(
        reader.result as string
      );

    };


    reader.readAsDataURL(file);

  };



  // ======================
  // BANNER UPLOAD
  // ======================


  const handleBannerUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;


    const reader = new FileReader();


    reader.onloadend = () => {

      setBanner(
        reader.result as string
      );

    };


    reader.readAsDataURL(file);

  };



  // ======================
  // SAVE PROFILE
  // ======================


  const saveProfile = () => {


    const updatedUser = {

      ...user,

      username,

      profileImage: image,

      banner,

      aboutMe,

      favoriteGame,

      favoriteGenre,

      favoritePlatform,


      discord,

      steam,

      github,

      reddit,


      favorites: user.favorites || [],

      wishlist: user.wishlist || []

    };



    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );



    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );



    const updatedUsers =
      users.map((u:any) =>
        u.username === user.username
        ? updatedUser
        : u
      );



    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );


    setUser(updatedUser);


    setSavedMessage(true);


    setTimeout(() => {

      setSavedMessage(false);

    },3000);



    setIsEditing(false);

  };



  const logout = () => {

    localStorage.removeItem("user");

    window.location.reload();

  };



  return (
    <div className="profile-page">


      <div className="profile-card">


        {/* BANNER */}

        <div
          className="profile-banner"

          style={{
            backgroundImage:
            banner
            ? `url(${banner})`
            :
            "linear-gradient(135deg,#66c0f4,#9bdcff)"
          }}

        >


          {isEditing && (

          <label
            className="banner-upload-btn"
          >

            Change Banner

            <input

              type="file"

              accept="image/*"

              onChange={
                handleBannerUpload
              }

            />

          </label>

          )}


        </div>

                {/* PROFILE HEADER */}

        <div className="profile-header">


          <div className="profile-avatar-wrapper">

            <img
              src={image}
              alt="Profile"
              className="profile-avatar"
            />


            {isEditing && (

              <label className="avatar-upload-btn">

                📷

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

              </label>

            )}

          </div>



          <div className="profile-main-info">

            {isEditing ? (

              <input
                className="profile-name-input"
                value={username}
                onChange={(e)=>
                  setUsername(e.target.value)
                }
              />

            ) : (

              <h1>
                {username}
              </h1>

            )}



            {!isEditing && (

              <p className="profile-about-preview">

                {aboutMe ||
                "No description added yet."}

              </p>

            )}

          </div>


        </div>





        {/* PROFILE CONTENT */}


        <div className="profile-grid">



          {/* LEFT SIDE */}


          <div className="profile-column">


            <div className="profile-box">


              <h3>
                👤 About Me
              </h3>



              {isEditing ? (

                <textarea

                  value={aboutMe}

                  onChange={(e)=>
                    setAboutMe(e.target.value)
                  }

                  placeholder="Tell something about yourself..."

                />

              ) : (

                <p>

                  {aboutMe ||
                  "No description yet."}

                </p>

              )}


            </div>





            <div className="profile-box">


              <h3>
                🎮 Favorite Game
              </h3>


              {isEditing ? (

                <input

                  value={favoriteGame}

                  onChange={(e)=>
                    setFavoriteGame(e.target.value)
                  }

                  placeholder="Your favorite game"

                />

              ) : (

                <p>

                  {favoriteGame || "-"}

                </p>

              )}


            </div>





            <div className="profile-box">


              <h3>
                🎲 Favorite Genre
              </h3>



              {isEditing ? (

                <select

                  value={favoriteGenre}

                  onChange={(e)=>
                    setFavoriteGenre(e.target.value)
                  }

                >

                  <option value="">
                    Select Genre
                  </option>

                  <option>
                    Action
                  </option>

                  <option>
                    RPG
                  </option>

                  <option>
                    Shooter
                  </option>

                  <option>
                    Adventure
                  </option>

                  <option>
                    Puzzle
                  </option>

                  <option>
                    Strategy
                  </option>

                  <option>
                    Horror
                  </option>


                </select>


              ) : (

                <p>

                  {favoriteGenre || "-"}

                </p>

              )}


            </div>





            <div className="profile-box">


              <h3>
                🖥 Favorite Platform
              </h3>


              {isEditing ? (

                <select

                  value={favoritePlatform}

                  onChange={(e)=>
                    setFavoritePlatform(e.target.value)
                  }

                >

                  <option value="">
                    Select Platform
                  </option>

                  <option>
                    PC
                  </option>

                  <option>
                    PlayStation
                  </option>

                  <option>
                    Xbox
                  </option>

                  <option>
                    Nintendo Switch
                  </option>


                </select>


              ) : (

                <p>

                  {favoritePlatform || "-"}

                </p>

              )}



            </div>



          </div>







          {/* RIGHT SIDE */}



          <div className="profile-column">





            <div className="profile-box stats-box">


              <h3>
                ⭐ Library
              </h3>


              <div className="stats">


                  <div
                    className="stat-clickable"
                    onClick={() => setOpenList("favorites")}
                  >

                    <strong>
                      {favorites.length}
                    </strong>

                    <span>
                      Favorites
                    </span>

                  </div>




                  <div
                    className="stat-clickable"
                    onClick={() => setOpenList("wishlist")}
                  >

                    <strong>
                      {wishlist.length}
                    </strong>

                    <span>
                      Wishlist
                    </span>

                  </div>


                </div>


            </div>


            <div className="profile-box">


              <h3>
                👥 Friends
              </h3>



              <div className="friends-list">


                {friends.map((friend)=>(

                  <p key={friend}>

                    👤 {friend}

                  </p>

                ))}


              </div>


            </div>








            <div className="profile-box">


              <h3>
                🌐 Social Links
              </h3>



              {isEditing ? (

                <>

                <input
                  placeholder="Discord"
                  value={discord}
                  onChange={(e)=>
                    setDiscord(e.target.value)
                  }
                />


                <input
                  placeholder="Steam"
                  value={steam}
                  onChange={(e)=>
                    setSteam(e.target.value)
                  }
                />


                <input
                  placeholder="GitHub"
                  value={github}
                  onChange={(e)=>
                    setGithub(e.target.value)
                  }
                />


                <input
                  placeholder="Reddit"
                  value={reddit}
                  onChange={(e)=>
                    setReddit(e.target.value)
                  }
                />

                </>


              ) : (


                <>

                <p>
                  Discord:
                  {" "}
                  {discord || "-"}
                </p>


                <p>
                  Steam:
                  {" "}
                  {steam || "-"}
                </p>


                <p>
                  GitHub:
                  {" "}
                  {github || "-"}
                </p>


                <p>
                  Reddit:
                  {" "}
                  {reddit || "-"}
                </p>


                </>


              )}



            </div>



          </div>


        </div>




        {
            openList && (

            <GameListModal

              type={openList}

              games={
                openList === "favorites"
                ? favorites
                : wishlist
              }


              onClose={() =>
                setOpenList("")
              }


              onRemove={(id:number)=>{


                const updatedUser = {

                  ...user,

                  favorites:
                  openList === "favorites"

                  ? favorites.filter(
                      (game:any)=>game.id !== id
                    )

                  : favorites,



                  wishlist:
                  openList === "wishlist"

                  ? wishlist.filter(
                      (game:any)=>game.id !== id
                    )

                  : wishlist

                };



                localStorage.setItem(
                  "user",
                  JSON.stringify(updatedUser)
                );


                setUser(updatedUser);


              }}

            />

            )
          }

        {/* BUTTONS */}


        <div className="profile-actions">


          {savedMessage && (

            <div className="save-message">

              ✔ Profile saved

            </div>

          )}



          {isEditing ? (

            <>

            <button
              className="save-btn"
              onClick={saveProfile}
            >

              Save Profile

            </button>


            <button
              className="cancel-btn"
              onClick={() =>
                setIsEditing(false)
              }
            >

              Cancel

            </button>


            </>


          ) : (

            <button

              className="save-btn"

              onClick={() =>
                setIsEditing(true)
              }

            >

              ✏ Edit Profile

            </button>


          )}




          <button

            className="logout-btn"

            onClick={logout}

          >

            Logout

          </button>



        </div>



      </div>


    </div>
  );

}

export default ProfilePage;