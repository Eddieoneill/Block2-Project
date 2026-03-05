import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePageButtons from "./HomePageButtons";
import Login from "./Login";
import Poker from "./Poker";
import "./App.css";

function HomeScreen({ account }) {
  if (!account) {
    return <div>Account was not created</div>;
  }

  console.log(account);
  return <h1>Welcome {account.userName} to Ed's Casino!</h1>;
}
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

  return (
    <>
      <h1 id="page-title">Ed's Casino</h1>
      <nav className="nav-container">
        <button
          id="home-button"
          className="home-button"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <HomePageButtons />
        <button className="home-button" id="log-out">
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
      </Routes>
    </>
  );
}

export default App;
