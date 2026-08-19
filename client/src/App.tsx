import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCurrentUser, logout } from "./services/authService";
import socket from "./services/socketService";

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

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const [user, setUser] = useState<any>(null);



  useEffect(() => {

    getCurrentUser()
      .then((user) => {

        setUser(user);

      });

  }, []);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);



  const handleGameClick = (game:any) => {

    setSelectedGame(game);

  };


  const handleLogout = async () => {

  console.log("Logout clicked");

  await logout();

  localStorage.removeItem("user");

  setUser(null);

};


  // ==========================
  // ADD GAME TO LIBRARY
  // ==========================


  const handleAddGameStatus = (
    game:any,
    status:string
  ) => {


    const currentUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );



    const games = currentUser[status] || [];



    const alreadyExists = games.some(
      (g:any) => g.id === game.id
    );



    if(alreadyExists){

      return;

    }




    const updatedUser = {

      ...currentUser,

      [status]: [
        ...games,
        game
      ]

    };




    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );



    setUser(updatedUser);


  };







  return (

    <BrowserRouter>

      <div className="app">


        <Header

          onSearchResults={setSearchResults}

          user={user}

          onLogout={handleLogout}

        />




        <Routes>


          <Route 
            path="/" 
            element={<Home />} 
          />


          <Route 
            path="/categories/:category" 
            element={
              <CategoryPage 
                onGameClick={handleGameClick} 
              />
            } 
          />


          <Route 
            path="/platforms/:platform" 
            element={
              <PlatformPage 
                onGameClick={handleGameClick} 
              />
            } 
          />


          <Route 
            path="/games" 
            element={
              <AllGamesPage 
                onGameClick={handleGameClick} 
              />
            } 
          />


          <Route 
            path="/games/best" 
            element={
              <BestGamesPage 
                onGameClick={handleGameClick}
              />
            } 
          />



          <Route 
            path="/profile" 
            element={
              <ProfilePage 
                onLogout={handleLogout}
              />
            } 
          />



          <Route 
            path="/imprint" 
            element={<ImprintPage />} 
          />


          <Route 
            path="/about" 
            element={<AboutPage />} 
          />


          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />


          <Route 
            path="/privacy" 
            element={<PrivacyPage />} 
          />


          <Route 
            path="/terms" 
            element={<TermsPage />} 
          />

          <Route 
            path="/chat" 
            element={<ChatPage />} 
          />

        </Routes>






        {searchResults.length > 0 && (

          <div className="game-grid">


            {searchResults.map((game) => (


              <div

                key={game.id}

                className="game-card"

                onClick={() => 
                  setSelectedGame(game)
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

                    {game.genres?.join(", ")}

                  </div>



                  <div className="rating">

                    ⭐ {game.rating}

                  </div>



                </div>


              </div>


            ))}


          </div>

        )}







        <GameModal

          game={selectedGame}

          onClose={() => 
            setSelectedGame(null)
          }

          onAddGameStatus={handleAddGameStatus}

        />






        {!user && (

          <AuthModal

            onLogin={setUser}

          />

        )}





        <ChatButton />
        <Footer />



      </div>


    </BrowserRouter>

  );

}


export default App;