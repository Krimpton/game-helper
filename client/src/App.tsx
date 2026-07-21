import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import GameCarousel from "./components/GameCarousel";
import GameModal from "./components/GameModal";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";

import CategoryPage from "./pages/CategoryPage";
import PlatformPage from "./pages/PlatformPage";
import AllGamesPage from "./pages/AllGamesPage";
import BestGamesPage from "./pages/BestGamesPage";
import ProfilePage from "./pages/ProfilePage";


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

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
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
          <Route path="/" element={<Home />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/platforms/:platform" element={<PlatformPage />} />
          <Route path="/games" element={<AllGamesPage />} />
          <Route path="/games/best" element={<BestGamesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

        {searchResults.length > 0 && (
          <div className="game-grid">
            {searchResults.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => setSelectedGame(game)}
              >
                <img
                  src={game.image}
                  alt={game.title}
                />

                <div className="game-info">
                  <h2>{game.title}</h2>

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
          onClose={() => setSelectedGame(null)}
        />

        {!user && (
          <AuthModal
            onLogin={setUser}
          />
        )}

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;