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
import UserInfo from "./UserInfo";

function App() {
  const storedUserName = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");
  const storedCredit = localStorage.getItem("credit");
  const storedLoginStatus = localStorage.getItem("logged-in");
  const [account, setAccount] = useState(() => {
    return storedUserName && storedPassword
      ? { userName: storedUserName, password: storedPassword }
      : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    storedLoginStatus ? storedLoginStatus : false,
  );
  const navigate = useNavigate();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audio, setAudio] = useState(
    new Audio("../public/BackgroundMusic.mp3"),
  );
  const [credit, setCredit] = useState(() =>
    storedCredit ? Number(storedCredit) : 0,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <AppContext.Provider
      value={{
        isMusicPlaying,
        setIsMusicPlaying,
        audio,
        setAudio,
        account,
        setAccount,
        setIsLoggedIn,
        isLoggedIn,
        credit,
        setCredit,
      }}
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
        <UserInfo setIsLoggedIn={setIsLoggedIn} />
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              account={account}
              setCredit={setCredit}
              credit={credit}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setAccount={setAccount}
              setIsLoggedIn={setIsLoggedIn}
              setCredit={setCredit}
            />
          }
        />
        <Route path="/poker" element={<Poker />} />
        <Route path="/blackjack" element={<Blackjack account={account} />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
