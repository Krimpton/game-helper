import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  getCurrentUser,
  logout,
} from "./services/authService";
import { searchGames } from "./services/gameService";
import {
  addGameToLibrary,
} from "./services/libraryService";

import Header from "./components/Header";
import Hero from "./components/Hero";
import GameCarousel from "./components/GameCarousel";
import GameModal from "./components/GameModal";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";
import ChatButton from "./components/ChatButton";

import CategoryPage from "./pages/CategoryPage";
import PlatformPage from "./pages/PlatformPage";
import AllGamesPage from "./pages/AllGamesPage";
import BestGamesPage from "./pages/BestGamesPage";
import ProfilePage from "./pages/ProfilePage";
import ImprintPage from "./pages/ImprintPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ChatPage from "./pages/ChatPage";

import "./App.css";


function Home() {

  return (

    <>
      <Hero />

      <GameCarousel />
    </>

  );

}


function App() {

  const [searchResults, setSearchResults] =
    useState<any[]>([]);

  const [selectedGame, setSelectedGame] =
    useState<any>(null);

  const [user, setUser] =
    useState<any>(null);


  // ==========================
  // SEARCH
  // ==========================

  const [searchQuery, setSearchQuery] =
    useState("");

  const [searchPage, setSearchPage] =
    useState(1);

  const [loadingMore, setLoadingMore] =
    useState(false);


  // ==========================
  // LOAD USER
  // ==========================

  useEffect(() => {

    const loadUser = async () => {

      try {

        const currentUser =
          await getCurrentUser();

        setUser(currentUser);

      } catch (error) {

        console.error(
          "Failed to load current user:",
          error
        );

      }

    };


    loadUser();


    const handleProfileUpdated = () => {

      loadUser();

    };


    window.addEventListener(
      "profileUpdated",
      handleProfileUpdated
    );


    return () => {

      window.removeEventListener(
        "profileUpdated",
        handleProfileUpdated
      );

    };

  }, []);


  // ==========================
  // HANDLE SEARCH
  // ==========================

  const handleSearch = async (
    query: string
  ) => {

    if (!query.trim()) {

      return;

    }


    try {

      const results =
        await searchGames(
          query.trim(),
          1
        );


      setSearchQuery(
        query.trim()
      );


      setSearchPage(1);


      setSearchResults(
        results
      );

    } catch (error) {

      console.error(
        "Searching games failed:",
        error
      );

    }

  };


  // ==========================
  // LOAD MORE SEARCH RESULTS
  // ==========================

  const handleLoadMore = async () => {

    if (
      !searchQuery ||
      loadingMore
    ) {

      return;

    }


    try {

      setLoadingMore(true);


      const nextPage =
        searchPage + 1;


      const results =
        await searchGames(
          searchQuery,
          nextPage
        );


      setSearchResults(
        (currentResults) => [
          ...currentResults,
          ...results,
        ]
      );


      setSearchPage(
        nextPage
      );

    } catch (error) {

      console.error(
        "Loading more games failed:",
        error
      );

    } finally {

      setLoadingMore(false);

    }

  };


  // ==========================
  // GAME CLICK
  // ==========================

  const handleGameClick = (
    game: any
  ) => {

    setSelectedGame(game);

  };


  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = async () => {

    console.log(
      "Logout clicked"
    );


    await logout();


    localStorage.removeItem(
      "user"
    );


    setUser(null);

  };


  // ==========================
  // ADD GAME TO LIBRARY
  // ==========================

  const handleAddGameStatus = async (
    game: any,
    status: string
  ) => {

    try {

      await addGameToLibrary(
        {
          id: game.id,

          title: game.title,

          image:
            game.image || null,

          rating:
            game.rating ?? null,

          released:
            game.released || null,
        },

        status as
          | "wishlist"
          | "want_to_play"
          | "playing"
          | "completed"
          | "dropped"
      );


      /*
       * ProfilePage benachrichtigen,
       * damit die Bibliothek neu geladen wird.
       */

      window.dispatchEvent(
        new Event("libraryUpdated")
      );


    } catch (error) {

      console.error(
        "Failed to add game to library:",
        error
      );

      throw error;

    }

  };


  // ==========================
  // RETURN
  // ==========================

  return (

    <BrowserRouter>

      <div className="app">


        {/* ==========================
            HEADER
        ========================== */}

        <Header

          onSearchResults={
            handleSearch
          }

          user={user}

          onLogout={
            handleLogout
          }

        />


        {/* ==========================
            ROUTES
        ========================== */}

        <Routes>


          <Route
            path="/"
            element={
              <Home />
            }
          />


          <Route
            path="/categories/:category"
            element={
              <CategoryPage
                onGameClick={
                  handleGameClick
                }
              />
            }
          />


          <Route
            path="/platforms/:platform"
            element={
              <PlatformPage
                onGameClick={
                  handleGameClick
                }
              />
            }
          />


          <Route
            path="/games"
            element={
              <AllGamesPage
                onGameClick={
                  handleGameClick
                }
              />
            }
          />


          <Route
            path="/games/best"
            element={
              <BestGamesPage
                onGameClick={
                  handleGameClick
                }
              />
            }
          />


          <Route
            path="/profile"
            element={
              <ProfilePage
                onLogout={
                  handleLogout
                }
              />
            }
          />


          <Route
            path="/imprint"
            element={
              <ImprintPage />
            }
          />


          <Route
            path="/about"
            element={
              <AboutPage />
            }
          />


          <Route
            path="/contact"
            element={
              <ContactPage />
            }
          />


          <Route
            path="/privacy"
            element={
              <PrivacyPage />
            }
          />


          <Route
            path="/terms"
            element={
              <TermsPage />
            }
          />


          <Route
            path="/chat"
            element={
              <ChatPage />
            }
          />

        </Routes>


        {/* ==========================
            SEARCH RESULTS
        ========================== */}

        {searchResults.length > 0 && (

          <div className="search-results-section">


            <div className="game-grid">


              {searchResults.map(
                (game) => (

                  <div

                    key={game.id}

                    className="game-card"

                    onClick={() =>
                      setSelectedGame(
                        game
                      )
                    }

                  >


                    <img

                      src={game.image}

                      alt={game.title}

                    />


                    <div className="game-info">


                      <h2>
                        {game.title}
                      </h2>


                      <div className="genre">

                        {game.genres?.join(
                          ", "
                        )}

                      </div>


                      <div className="rating">

                        ⭐ {game.rating}

                      </div>


                    </div>


                  </div>

                )
              )}


            </div>


            {/* ==========================
                LOAD MORE BUTTON
            ========================== */}

            <div className="load-more-container">

              <button

                className="load-more-button"

                onClick={
                  handleLoadMore
                }

                disabled={
                  loadingMore
                }

              >

                {loadingMore
                  ? "Loading..."
                  : "Load more games"
                }

              </button>

            </div>


          </div>

        )}


        {/* ==========================
            GAME MODAL
        ========================== */}

        <GameModal

          game={
            selectedGame
          }

          onClose={() =>
            setSelectedGame(
              null
            )
          }

          onAddGameStatus={
            handleAddGameStatus
          }

        />


        {/* ==========================
            AUTH
        ========================== */}

        {!user && (

          <AuthModal

            onLogin={
              setUser
            }

          />

        )}


        {/* ==========================
            CHAT + FOOTER
        ========================== */}

        <ChatButton />

        <Footer />


      </div>

    </BrowserRouter>

  );

}


export default App;