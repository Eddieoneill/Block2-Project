import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePageButtons from "./HomePageButtons";
import Login from "./Login";
import Poker from "./Poker";
import Blackjack from "./Blackjack";
import HomeScreen from "./HomeScreen";
import "./App.css";
import playButtonHoverSound from "./hoverSound.js";
import AppContext from "./AppContext";
import PlayButton from "./PlayButton";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audio, setAudio] = useState(
    new Audio("../public/BackgroundMusic.mp3"),
  );

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

  return (
    <AppContext.Provider
      value={{ isMusicPlaying, setIsMusicPlaying, audio, setAudio }}
    >
      <div className="title-container">
        <h1 id="page-title">Ed's Casino</h1>
        <PlayButton />
      </div>
      <nav className="nav-container">
        <button
          id="home-button"
          className="home-button"
          onClick={() => navigate("/")}
          onMouseEnter={playButtonHoverSound}
        >
          Home
        </button>
        <HomePageButtons />
        <button
          className="home-button"
          id="log-out"
          onMouseEnter={playButtonHoverSound}
        >
          Log-Out
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<HomeScreen account={account} />} />
        <Route
          path="/login"
          element={
            <Login setAccount={setAccount} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/poker" element={<Poker />} />
        <Route path="/blackjack" element={<Blackjack />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
