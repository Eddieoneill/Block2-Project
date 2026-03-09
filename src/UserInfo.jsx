import playButtonHoverSound from "./hoverSound.js";
import AppContext from "./AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";

export default function UserInfo() {
  const { account, setAccount, setIsLoggedIn, credit, isLoggedIn } =
    useContext(AppContext);
  const userAccounts = JSON.parse(localStorage.getItem("accounts"));
  const storedCredit = localStorage.getItem("credit");
  const navigate = useNavigate();

  if (!isLoggedIn) return;

  const { userName } = account;

  const logOutButtonPressed = () => {
    let currAccount = userAccounts.filter(
      (account) => account.userName === userName,
    );

    currAccount[0].credit = storedCredit;

    let newAccounts = userAccounts.filter(
      (account) => account.userName !== userName,
    );
    newAccounts.push(currAccount[0]);

    localStorage.setItem(`accounts`, JSON.stringify(newAccounts));
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
