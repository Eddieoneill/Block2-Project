import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

export default function Login({ setAccount, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const buttonPressed = () => {
    setAccount({ userName, password });
    setIsLoggedIn(true);
    navigate("/");
  };

  const updateUserName = (event) => {
    let key = event.key;

    if (key === "Enter") return;
    setUserName(event.target.value + key);
  };

  const updatePassword = (event) => {
    let key = event.key;

    if (key === "Enter") return;
    setPassword(event.target.value + key);
  };

  return (
    <div className="login-container">
      <div className="grid-container">
        <div className="grid-column">
          <div>Username: </div>
          <input
            className="login-text"
            id="userName"
            type="text"
            onKeyDown={updateUserName}
          />
        </div>
        <div className="grid-column">
          <div>Password: </div>
          <input
            className="login-text"
            id="password"
            type="text"
            onKeyDown={updatePassword}
          />
        </div>
        <div className="confirm">
          <button id="login" onClick={buttonPressed}>
            Login
          </button>
          <button id="create" onClick={buttonPressed}>
            Create
          </button>
        </div>
        ;
      </div>
    </div>
  );
}
