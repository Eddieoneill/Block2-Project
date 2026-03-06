import playButtonHoverSound from "./hoverSound.js";
import AppContext from "./AppContext";
import { useContext } from "react";
import "./UserInfo.css";

export default function UserInfo() {
  const { account, setAccount, setIsLoggedIn, credit } = useContext(AppContext);

  if (!account) return;

  const { userName } = account;

  const logOutButtonPressed = () => {
    setAccount(null);
    setIsLoggedIn(false);
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
