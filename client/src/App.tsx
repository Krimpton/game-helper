import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import GameCarousel from "./components/GameCarousel";

import CategoryPage from "./pages/CategoryPage";
import PlatformPage from "./pages/PlatformPage";

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
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/categories/:category"
            element={<CategoryPage />}
            />
            <Route
            path="/platforms/:platform"
            element={<PlatformPage />}
            />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;