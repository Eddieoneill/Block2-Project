import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePageButtons from "./HomePageButtons";
import Login from "./Login";
import Poker from "./Poker";
import Blackjack from "./Blackjack";
import HomeScreen from "./HomeScreen";
import "./App.css";
import playButtonHoverSound from "./hoverSound.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  function PlayButton() {
    const audio = new Audio("../public/BackgroundMusic.mp3");
    audio.volume = 0.01;
    const playMusic = (event) => {
      if (event.target.innerHTML === "Play") {
        event.target.innerHTML = "Pause";
        audio.play();
        audio.loop = true;
      } else {
        event.target.innerHTML = "Play";
        audio.pause();
      }
    };
    return (
      <button
        className="music-button"
        onClick={playMusic}
        onMouseEnter={playButtonHoverSound}
      >
        Play
      </button>
    );
  }

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

  return (
    <>
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
    </>
  );
}

export default App;
