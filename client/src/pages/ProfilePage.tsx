import {
  useEffect,
  useState,
} from "react";

import "./ProfilePage.css";

import GameListModal from "../components/GameListModal";

import {
  getFriends,
  searchUsers,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
} from "../services/friendService";

import {
  getLibrary,
  removeGameFromLibrary,
  updateLibraryGame,
} from "../services/libraryService";

import type {
  LibraryGame,
  LibraryStatus,
} from "../services/libraryService";


const API_URL =
  "http://localhost:3000";


type GameListType =
  | "wishlist"
  | "want_to_play"
  | "playing"
  | "completed"
  | "dropped"
  | "";


function ProfilePage({
  onLogout,
}: any) {

  const storedUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "{}"
    );


  const [user, setUser] =
    useState(storedUser);


  const [isEditing, setIsEditing] =
    useState(false);


  const [savedMessage, setSavedMessage] =
    useState(false);


  const [errorMessage, setErrorMessage] =
    useState("");


  const [uploadingImage, setUploadingImage] =
    useState(false);


  const [uploadingBanner, setUploadingBanner] =
    useState(false);


  const [openList, setOpenList] =
    useState<GameListType>("");


  // =====================================================
  // GAME LIBRARY
  // =====================================================

  const [library, setLibrary] =
    useState<LibraryGame[]>([]);


  const [libraryLoading, setLibraryLoading] =
    useState(true);


  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const [image, setImage] =
    useState(
      user.profileImage
        ? `${API_URL}${user.profileImage}`
        : "/images/dummy-profile-blue.png"
    );


  // =====================================================
  // BANNER
  // =====================================================

  const [banner, setBanner] =
    useState(
      user.banner
        ? `${API_URL}${user.banner}`
        : ""
    );


  // =====================================================
  // PROFILE DATA
  // =====================================================

  const [username, setUsername] =
    useState(
      user.username || ""
    );


  const [aboutMe, setAboutMe] =
    useState(
      user.aboutMe || ""
    );


  const [favoriteGame, setFavoriteGame] =
    useState(
      user.favoriteGame || ""
    );


  const [favoriteGenre, setFavoriteGenre] =
    useState(
      user.favoriteGenre || ""
    );


  const [favoritePlatform, setFavoritePlatform] =
    useState(
      user.favoritePlatform || ""
    );


  // =====================================================
  // SOCIALS
  // =====================================================

  const [discord, setDiscord] =
    useState(
      user.discord || ""
    );


  const [steam, setSteam] =
    useState(
      user.steam || ""
    );


  const [github, setGithub] =
    useState(
      user.github || ""
    );


  const [reddit, setReddit] =
    useState(
      user.reddit || ""
    );


  // =====================================================
  // FRIENDS
  // =====================================================

  const [friends, setFriends] =
    useState<any[]>([]);


  const [friendSearch, setFriendSearch] =
    useState("");


  const [searchResults, setSearchResults] =
    useState<any[]>([]);


  const [friendRequests, setFriendRequests] =
    useState<any[]>([]);


  const [friendMessage, setFriendMessage] =
    useState("");


  // =====================================================
  // LOAD LIBRARY
  // =====================================================

  const loadLibrary =
    async () => {

      try {

        setLibraryLoading(
          true
        );


        const games =
          await getLibrary();


        setLibrary(
          games
        );

      } catch (error) {

        console.error(
          "Failed to load game library:",
          error
        );


        setLibrary([]);

      } finally {

        setLibraryLoading(
          false
        );

      }

    };


  useEffect(() => {

    loadLibrary();


    const handleLibraryUpdated =
      () => {

        loadLibrary();

      };


    window.addEventListener(
      "libraryUpdated",
      handleLibraryUpdated
    );


    return () => {

      window.removeEventListener(
        "libraryUpdated",
        handleLibraryUpdated
      );

    };

  }, []);


  // =====================================================
  // LOAD FRIENDS + REQUESTS
  // =====================================================

  useEffect(() => {

    const loadFriends =
      async () => {

        try {

          const friendsData =
            await getFriends();


          setFriends(
            friendsData
          );

        } catch (error) {

          console.error(
            "Failed to load friends:",
            error
          );

        }

      };


    const loadFriendRequests =
      async () => {

        try {

          const requests =
            await getFriendRequests();


          setFriendRequests(
            requests
          );

        } catch (error) {

          console.error(
            "Failed to load friend requests:",
            error
          );

        }

      };


    loadFriends();

    loadFriendRequests();

  }, []);


  // =====================================================
  // SEARCH USERS
  // =====================================================

  const handleFriendSearch =
    async () => {

      if (
        friendSearch
          .trim()
          .length < 2
      ) {

        setSearchResults([]);

        return;

      }


      try {

        const users =
          await searchUsers(
            friendSearch
          );


        setSearchResults(
          users
        );


        setFriendMessage("");

      } catch (error: any) {

        console.error(
          "User search failed:",
          error
        );


        setSearchResults([]);


        setFriendMessage(
          error.message ||
          "Failed to search users"
        );

      }

    };


  // =====================================================
  // SEND FRIEND REQUEST
  // =====================================================

  const handleSendFriendRequest =
    async (
      userId: number
    ) => {

      try {

        await sendFriendRequest(
          userId
        );


        setFriendMessage(
          "Friend request sent successfully!"
        );


        setSearchResults([]);

        setFriendSearch("");

      } catch (error: any) {

        console.error(
          "Failed to send friend request:",
          error
        );


        setFriendMessage(
          error.message ||
          "Failed to send friend request"
        );

      }

    };


  // =====================================================
  // ACCEPT FRIEND REQUEST
  // =====================================================

  const handleAcceptRequest =
    async (
      requestId: number
    ) => {

      try {

        await acceptFriendRequest(
          requestId
        );


        const updatedFriends =
          await getFriends();


        setFriends(
          updatedFriends
        );


        const updatedRequests =
          await getFriendRequests();


        setFriendRequests(
          updatedRequests
        );


        setFriendMessage(
          "Friend request accepted!"
        );

      } catch (error: any) {

        console.error(
          "Failed to accept friend request:",
          error
        );


        setFriendMessage(
          error.message ||
          "Failed to accept friend request"
        );

      }

    };


  // =====================================================
  // DECLINE FRIEND REQUEST
  // =====================================================

  const handleDeclineRequest =
    async (
      requestId: number
    ) => {

      try {

        await declineFriendRequest(
          requestId
        );


        const updatedRequests =
          await getFriendRequests();


        setFriendRequests(
          updatedRequests
        );


        setFriendMessage(
          "Friend request declined."
        );

      } catch (error: any) {

        console.error(
          "Failed to decline friend request:",
          error
        );


        setFriendMessage(
          error.message ||
          "Failed to decline friend request"
        );

      }

    };


  // =====================================================
  // REMOVE FRIEND
  // =====================================================

  const handleRemoveFriend =
    async (
      userId: number
    ) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to remove this friend?"
        );


      if (!confirmed) {
        return;
      }


      try {

        await removeFriend(
          userId
        );


        const updatedFriends =
          await getFriends();


        setFriends(
          updatedFriends
        );


        setFriendMessage(
          "Friend removed successfully."
        );

      } catch (error: any) {

        console.error(
          "Failed to remove friend:",
          error
        );


        setFriendMessage(
          error.message ||
          "Failed to remove friend"
        );

      }

    };


  // =====================================================
  // GAME LIBRARY BY STATUS
  // =====================================================

  const gameLibrary = {

    wishlist:
      library.filter(
        (game) =>
          game.status ===
          "wishlist"
      ),

    want_to_play:
      library.filter(
        (game) =>
          game.status ===
          "want_to_play"
      ),

    playing:
      library.filter(
        (game) =>
          game.status ===
          "playing"
      ),

    completed:
      library.filter(
        (game) =>
          game.status ===
          "completed"
      ),

    dropped:
      library.filter(
        (game) =>
          game.status ===
          "dropped"
      ),

  };


  // =====================================================
  // MOVE LIBRARY GAME
  // =====================================================

  const handleMoveLibraryGame =
    async (
      libraryId: number,
      newStatus: LibraryStatus
    ) => {

      try {

        setErrorMessage("");


        const updatedGame =
          await updateLibraryGame(
            libraryId,
            {
              status:
                newStatus,
            }
          );


        /*
         * Das lokale React-State wird
         * direkt aktualisiert.
         *
         * Dadurch:
         * - verschwindet das Spiel aus
         *   dem aktuellen Modal
         * - der alte Zähler sinkt
         * - der neue Zähler steigt
         *
         * ohne Reload.
         */

        setLibrary(
          (currentLibrary) =>
            currentLibrary.map(
              (game) =>
                game.id === libraryId
                  ? updatedGame
                  : game
            )
        );


        window.dispatchEvent(
          new Event(
            "libraryUpdated"
          )
        );


      } catch (error: any) {

        console.error(
          "Failed to move library game:",
          error
        );


        setErrorMessage(
          error.message ||
          "Failed to move game."
        );


        throw error;

      }

    };


  // =====================================================
  // REMOVE LIBRARY GAME
  // =====================================================

  const handleRemoveLibraryGame =
    async (
      libraryId: number
    ) => {

      try {

        setErrorMessage("");


        await removeGameFromLibrary(
          libraryId
        );


        setLibrary(
          (currentLibrary) =>
            currentLibrary.filter(
              (game) =>
                game.id !==
                libraryId
            )
        );


        window.dispatchEvent(
          new Event(
            "libraryUpdated"
          )
        );


      } catch (error: any) {

        console.error(
          "Failed to remove library game:",
          error
        );


        setErrorMessage(
          error.message ||
          "Failed to remove game from library."
        );

      }

    };


  // =====================================================
  // PROFILE IMAGE UPLOAD
  // =====================================================

  const handleImageUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        e.target.files?.[0];


      if (!file) {
        return;
      }


      try {

        setUploadingImage(
          true
        );

        setErrorMessage("");


        const formData =
          new FormData();


        formData.append(
          "image",
          file
        );


        const response =
          await fetch(
            `${API_URL}/api/users/me/profile-image`,
            {
              method: "POST",

              credentials:
                "include",

              body: formData,
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to upload profile image."
          );

        }


        const imagePath =
          data.profileImage;


        const imageUrl =
          `${API_URL}${imagePath}`;


        setImage(
          imageUrl
        );


        const updatedUser = {

          ...user,

          profileImage:
            imagePath,

        };


        setUser(
          updatedUser
        );


        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser
          )
        );


        window.dispatchEvent(
          new Event(
            "profileUpdated"
          )
        );


      } catch (error) {

        console.error(
          "Profile image upload error:",
          error
        );


        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to upload profile image."
        );

      } finally {

        setUploadingImage(
          false
        );


        e.target.value =
          "";

      }

    };


  // =====================================================
  // BANNER UPLOAD
  // =====================================================

  const handleBannerUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        e.target.files?.[0];


      if (!file) {
        return;
      }


      try {

        setUploadingBanner(
          true
        );

        setErrorMessage("");


        const formData =
          new FormData();


        formData.append(
          "image",
          file
        );


        const response =
          await fetch(
            `${API_URL}/api/users/me/banner`,
            {
              method: "POST",

              credentials:
                "include",

              body: formData,
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to upload banner."
          );

        }


        const bannerPath =
          data.banner;


        const bannerUrl =
          `${API_URL}${bannerPath}`;


        setBanner(
          bannerUrl
        );


        const updatedUser = {

          ...user,

          banner:
            bannerPath,

        };


        setUser(
          updatedUser
        );


        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser
          )
        );


        window.dispatchEvent(
          new Event(
            "profileUpdated"
          )
        );


      } catch (error) {

        console.error(
          "Banner upload error:",
          error
        );


        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to upload banner."
        );

      } finally {

        setUploadingBanner(
          false
        );


        e.target.value =
          "";

      }

    };


  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const saveProfile =
    async () => {

      try {

        setErrorMessage("");

        setSavedMessage(
          false
        );


        const response =
          await fetch(
            `${API_URL}/api/users/me`,
            {
              method: "PUT",

              credentials:
                "include",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                aboutMe,

                favoriteGame,

                favoriteGenre,

                favoritePlatform,

                discord,

                steam,

                github,

                reddit,

              }),

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to update profile."
          );

        }


        const updatedUser = {

          ...user,

          ...data.user,

        };


        setUser(
          updatedUser
        );


        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser
          )
        );


        window.dispatchEvent(
          new Event(
            "profileUpdated"
          )
        );


        setSavedMessage(
          true
        );


        setIsEditing(
          false
        );


        setTimeout(() => {

          setSavedMessage(
            false
          );

        }, 3000);

      } catch (error) {

        console.error(
          "Save profile error:",
          error
        );


        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to save profile."
        );

      }

    };


  // =====================================================
  // CANCEL EDITING
  // =====================================================

  const cancelEditing =
    () => {

      setUsername(
        user.username || ""
      );


      setAboutMe(
        user.aboutMe || ""
      );


      setFavoriteGame(
        user.favoriteGame || ""
      );


      setFavoriteGenre(
        user.favoriteGenre || ""
      );


      setFavoritePlatform(
        user.favoritePlatform || ""
      );


      setDiscord(
        user.discord || ""
      );


      setSteam(
        user.steam || ""
      );


      setGithub(
        user.github || ""
      );


      setReddit(
        user.reddit || ""
      );


      setImage(
        user.profileImage
          ? `${API_URL}${user.profileImage}`
          : "/images/dummy-profile-blue.png"
      );


      setBanner(
        user.banner
          ? `${API_URL}${user.banner}`
          : ""
      );


      setErrorMessage("");

      setIsEditing(
        false
      );

    };


  // =====================================================
  // LOGOUT
  // =====================================================

  const logoutUser =
    () => {

      onLogout();

    };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="profile-page">

      <div className="profile-card">


        {/* BANNER */}

        <div
          className="profile-banner"

          style={{
            backgroundImage:
              banner

                ? `url("${banner}")`

                : "linear-gradient(135deg,#66c0f4,#9bdcff)",
          }}
        >

          {isEditing && (

            <label className="banner-upload-btn">

              {uploadingBanner
                ? "Uploading..."
                : "Change Banner"}

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleBannerUpload
                }
                disabled={
                  uploadingBanner
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

                {uploadingImage
                  ? "..."
                  : "📷"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageUpload
                  }
                  disabled={
                    uploadingImage
                  }
                />

              </label>

            )}

          </div>


          <div className="profile-main-info">

            {isEditing ? (

              <input
                className="profile-name-input"
                value={username}
                disabled
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


            {/* ABOUT ME */}

            <div className="profile-box">

              <h3>
                👤 About Me
              </h3>


              {isEditing ? (

                <textarea
                  value={aboutMe}
                  onChange={(e) =>
                    setAboutMe(
                      e.target.value
                    )
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


            {/* FAVORITE GAME */}

            <div className="profile-box">

              <h3>
                🎮 Favorite Game
              </h3>


              {isEditing ? (

                <input
                  value={favoriteGame}
                  onChange={(e) =>
                    setFavoriteGame(
                      e.target.value
                    )
                  }

                  placeholder="Your favorite game"
                />

              ) : (

                <p>
                  {favoriteGame || "-"}
                </p>

              )}

            </div>


            {/* FAVORITE GENRE */}

            <div className="profile-box">

              <h3>
                🎲 Favorite Genre
              </h3>


              {isEditing ? (

                <select
                  value={favoriteGenre}
                  onChange={(e) =>
                    setFavoriteGenre(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select Genre
                  </option>

                  <option value="Action">
                    Action
                  </option>

                  <option value="RPG">
                    RPG
                  </option>

                  <option value="Shooter">
                    Shooter
                  </option>

                  <option value="Adventure">
                    Adventure
                  </option>

                  <option value="Puzzle">
                    Puzzle
                  </option>

                  <option value="Strategy">
                    Strategy
                  </option>

                  <option value="Horror">
                    Horror
                  </option>

                </select>

              ) : (

                <p>
                  {favoriteGenre || "-"}
                </p>

              )}

            </div>


            {/* FAVORITE PLATFORM */}

            <div className="profile-box">

              <h3>
                🖥 Favorite Platform
              </h3>


              {isEditing ? (

                <select
                  value={
                    favoritePlatform
                  }

                  onChange={(e) =>
                    setFavoritePlatform(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select Platform
                  </option>

                  <option value="PC">
                    PC
                  </option>

                  <option value="PlayStation">
                    PlayStation
                  </option>

                  <option value="Xbox">
                    Xbox
                  </option>

                  <option value="Nintendo Switch">
                    Nintendo Switch
                  </option>

                </select>

              ) : (

                <p>
                  {
                    favoritePlatform ||
                    "-"
                  }
                </p>

              )}

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="profile-column">


            {/* GAME LIBRARY */}

            <div className="profile-box stats-box">

              <h3>
                🎮 Game Library
              </h3>


              {libraryLoading ? (

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "25px",
                    color: "#8fa3b7",
                  }}
                >
                  Loading library...
                </div>

              ) : (

                <div className="stats">


                  <div
                    className="stat-clickable"

                    onClick={() =>
                      setOpenList(
                        "wishlist"
                      )
                    }
                  >

                    <strong>
                      {
                        gameLibrary
                          .wishlist
                          .length
                      }
                    </strong>

                    <span>
                      ❤️ Wishlist
                    </span>

                  </div>


                  <div
                    className="stat-clickable"

                    onClick={() =>
                      setOpenList(
                        "want_to_play"
                      )
                    }
                  >

                    <strong>
                      {
                        gameLibrary
                          .want_to_play
                          .length
                      }
                    </strong>

                    <span>
                      💭 Want To Play
                    </span>

                  </div>


                  <div
                    className="stat-clickable"

                    onClick={() =>
                      setOpenList(
                        "playing"
                      )
                    }
                  >

                    <strong>
                      {
                        gameLibrary
                          .playing
                          .length
                      }
                    </strong>

                    <span>
                      🔥 Playing
                    </span>

                  </div>


                  <div
                    className="stat-clickable"

                    onClick={() =>
                      setOpenList(
                        "completed"
                      )
                    }
                  >

                    <strong>
                      {
                        gameLibrary
                          .completed
                          .length
                      }
                    </strong>

                    <span>
                      ✅ Completed
                    </span>

                  </div>


                  <div
                    className="stat-clickable"

                    onClick={() =>
                      setOpenList(
                        "dropped"
                      )
                    }
                  >

                    <strong>
                      {
                        gameLibrary
                          .dropped
                          .length
                      }
                    </strong>

                    <span>
                      ❌ Dropped
                    </span>

                  </div>


                </div>

              )}

            </div>


            {/* FRIENDS */}

            <div className="profile-box">

              <h3>
                👥 Friends
              </h3>


              <div className="friend-search">

                <input
                  type="text"
                  placeholder="Search username..."
                  value={friendSearch}

                  onChange={(e) =>
                    setFriendSearch(
                      e.target.value
                    )
                  }

                />


                <button
                  onClick={
                    handleFriendSearch
                  }
                >
                  Search
                </button>

              </div>


              {searchResults.length > 0 && (

                <div className="friend-search-results">

                  {searchResults.map(
                    (searchedUser) => (

                      <div
                        className="friend-search-result"
                        key={
                          searchedUser.id
                        }
                      >

                        <img
                          src={
                            searchedUser.profileImage
                              ? `${API_URL}${searchedUser.profileImage}`
                              : "/images/dummy-profile-blue.png"
                          }

                          alt={
                            searchedUser.username
                          }
                        />


                        <span>
                          {
                            searchedUser.username
                          }
                        </span>


                        <button
                          onClick={() =>
                            handleSendFriendRequest(
                              searchedUser.id
                            )
                          }
                        >
                          Add Friend
                        </button>

                      </div>

                    )
                  )}

                </div>

              )}


              {friendMessage && (

                <p className="friend-message">
                  {friendMessage}
                </p>

              )}


              {friendRequests.length > 0 && (

                <div className="friend-requests">

                  <h4>
                    📩 Friend Requests
                  </h4>


                  {friendRequests.map(
                    (request) => (

                      <div
                        className="friend-request"
                        key={
                          request.id
                        }
                      >

                        <img
                          src={
                            request
                              .sender
                              ?.profileImage
                              ? `${API_URL}${request.sender.profileImage}`
                              : "/images/dummy-profile-blue.png"
                          }

                          alt={
                            request
                              .sender
                              ?.username
                          }
                        />


                        <span>
                          {
                            request
                              .sender
                              ?.username
                          }
                        </span>


                        <button
                          onClick={() =>
                            handleAcceptRequest(
                              request.id
                            )
                          }
                        >
                          Accept
                        </button>


                        <button
                          onClick={() =>
                            handleDeclineRequest(
                              request.id
                            )
                          }
                        >
                          Decline
                        </button>

                      </div>

                    )
                  )}

                </div>

              )}


              <div className="friends-list">

                {friends.length === 0 ? (

                  <p>
                    No friends yet.
                  </p>

                ) : (

                  friends.map(
                    (friend) => (

                      <div
                        className="friend-item"
                        key={
                          friend.id
                        }
                      >

                        <img
                          src={
                            friend.profileImage
                              ? `${API_URL}${friend.profileImage}`
                              : "/images/dummy-profile-blue.png"
                          }

                          alt={
                            friend.username
                          }
                        />


                        <span className="friend-username">

                          {
                            friend.username
                          }

                        </span>


                        <button
                          className="remove-friend-btn"
                          onClick={() =>
                            handleRemoveFriend(
                              friend.id
                            )
                          }
                        >
                          Remove
                        </button>

                      </div>
                    )

                  )

                )}

              </div>

            </div>


            {/* SOCIAL LINKS */}

            <div className="profile-box">

              <h3>
                🌐 Social Links
              </h3>


              {isEditing ? (

                <>

                  <input
                    placeholder="Discord"
                    value={
                      discord
                    }

                    onChange={(e) =>
                      setDiscord(
                        e.target.value
                      )
                    }
                  />


                  <input
                    placeholder="Steam"
                    value={
                      steam
                    }

                    onChange={(e) =>
                      setSteam(
                        e.target.value
                      )
                    }
                  />


                  <input
                    placeholder="GitHub"
                    value={
                      github
                    }

                    onChange={(e) =>
                      setGithub(
                        e.target.value
                      )
                    }
                  />


                  <input
                    placeholder="Reddit"
                    value={
                      reddit
                    }

                    onChange={(e) =>
                      setReddit(
                        e.target.value
                      )
                    }
                  />

                </>

              ) : (

                <>

                  <p>
                    Discord:
                    {" "}
                    {
                      discord || "-"
                    }
                  </p>


                  <p>
                    Steam:
                    {" "}
                    {
                      steam || "-"
                    }
                  </p>


                  <p>
                    GitHub:
                    {" "}
                    {
                      github || "-"
                    }
                  </p>


                  <p>
                    Reddit:
                    {" "}
                    {
                      reddit || "-"
                    }
                  </p>

                </>

              )}

            </div>

          </div>

        </div>


        {/* GAME LIST MODAL */}

        {openList && (

          <GameListModal

            type={
              openList
            }

            games={
              gameLibrary[
                openList as keyof typeof gameLibrary
              ]
            }

            onClose={() =>
              setOpenList("")
            }

            onRemove={
              handleRemoveLibraryGame
            }

            onMove={
              handleMoveLibraryGame
            }

          />

        )}


        {/* BUTTONS */}

        <div className="profile-actions">


          {savedMessage && (

            <div className="save-message">
              ✔ Profile saved
            </div>

          )}


          {errorMessage && (

            <div className="save-message">
              ❌ {errorMessage}
            </div>

          )}


          {isEditing ? (

            <>

              <button
                className="save-btn"

                onClick={
                  saveProfile
                }

                disabled={
                  uploadingImage ||
                  uploadingBanner
                }
              >
                Save Profile
              </button>


              <button
                className="cancel-btn"

                onClick={
                  cancelEditing
                }

                disabled={
                  uploadingImage ||
                  uploadingBanner
                }
              >
                Cancel
              </button>

            </>

          ) : (

            <button
              className="save-btn"

              onClick={() =>
                setIsEditing(
                  true
                )
              }
            >
              ✏ Edit Profile
            </button>

          )}


          <button
            className="logout-btn"
            onClick={
              logoutUser
            }
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;