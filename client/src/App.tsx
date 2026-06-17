import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import GameCarousel from "./components/GameCarousel";
import "./App.css";

function App() {
  return (
     <div className="app">
      <Header />
      <Hero />
      <GameCarousel/>
    </div>
  );
}

export default App;