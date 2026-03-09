import playButtonHoverSound from "./hoverSound.js";
import AppContext from "./AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";

export default function UserInfo() {
  const { account, setAccount, setIsLoggedIn, credit } = useContext(AppContext);
  const navigate = useNavigate();

  if (!account) return;

  const { userName } = account;

  const logOutButtonPressed = () => {
    localStorage.setItem(`logged-in`, false);
    setAccount(null);
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <div className="userInfo-container">
      <div>
        <div>Username: {userName}</div>
        <div>Credit: ${credit}</div>
      </div>
      <button
        className="logout-button"
        id="log-out"
        onMouseEnter={playButtonHoverSound}
        onClick={logOutButtonPressed}
      >
        Log-Out
      </button>
    </div>
  );
}
