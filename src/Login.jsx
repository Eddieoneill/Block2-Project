import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import playButtonHoverSound from "./hoverSound.js";

export default function Login({ setAccount, setIsLoggedIn, setCredit }) {
  const navigate = useNavigate();
  const storedUserName = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");
  const storedCredit = localStorage.getItem("credit");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const createButtonPressed = () => {
    if (userName === "" || password === "") {
      alert("Please enter useName and password");
      return;
    }

    localStorage.setItem(`username`, userName);
    localStorage.setItem(`password`, password);
    localStorage.setItem(`credit`, 200);
    localStorage.setItem(`logged-in`, true);

    setAccount({ userName, password });
    setCredit(200);
    setIsLoggedIn(true);
    navigate("/");
  };

  const loginButtonPressed = () => {
    if (userName === "" || password === "" || !storedUserName) {
      alert("username or password is incorrect");
      return;
    }

    if (userName === storedUserName && password === storedPassword) {
      localStorage.setItem(`logged-in`, true);
      setAccount({ userName, password });
      setCredit(Number(storedCredit));
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("username or password is incorrect");
    }
  };

  const updateUserName = (event) => {
    let key = event.key;

    if (key === "Enter" || key === "Tab") return;
    setUserName(event.target.value + key);
  };

  const updatePassword = (event) => {
    let key = event.key;

    if (key === "Enter" || key === "Tab") return;
    setPassword(event.target.value + key);
  };

  return (
    <div className="login-container">
      <div className="grid-container">
        <div className="grid-column">
          <div className="login-title">Username: </div>
          <input
            className="login-text"
            id="userName"
            type="text"
            onKeyDown={updateUserName}
          />
        </div>
        <div className="grid-column">
          <div className="login-title">Password: </div>
          <input
            className="login-text"
            id="password"
            type="password"
            onKeyDown={updatePassword}
          />
        </div>
        <div className="confirm">
          <button
            className="login-button"
            id="login"
            onClick={loginButtonPressed}
            onMouseEnter={playButtonHoverSound}
          >
            Login
          </button>
          <button
            className="login-button"
            id="create"
            onClick={createButtonPressed}
            onMouseEnter={playButtonHoverSound}
          >
            Create
          </button>
        </div>
        ;
      </div>
    </div>
  );
}
