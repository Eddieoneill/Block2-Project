import "./HomeScreen.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import playButtonHoverSound from "./hoverSound.js";

export default function HomeScreen({ account, setCredit, credit }) {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  if (!account) {
    useEffect(() => {
      navigate("/login");
    });
    return;
  }

  const updateAmount = (event) => {
    let key = event.key;
    const currValue = Number(event.target.value + key);
    if (key === "Enter" || key === "Tab" || !currValue) return;

    setAmount(currValue);
  };

  const updateCredit = () => {
    if (amount <= 0) {
      alert("please put in a valid amount");
      return;
    }

    setCredit(credit + amount);
  };

  return (
    <div>
      <h1 id="homescreen-title">Welcome {account.userName}, to Ed's Casino!</h1>
      <h2 id="funds-title">Add Funds!</h2>
      <div className="payment-container">
        <div className="textbox-container">
          <div className="payment-title">Amount: </div>
          <input
            type="number"
            className="payment-input"
            onKeyDown={updateAmount}
          />
        </div>
        <div className="textbox-container">
          <div className="payment-title">Card Number: </div>
          <input type="number" className="payment-input" />
          <div>Card Type</div>
        </div>
        <div className="textbox-container">
          <div className="payment-title">Name on card: </div>
          <input type="text" className="payment-input" />
        </div>
        <div className="textbox-container">
          <div className="payment-title">Exp Data: </div>
          <input type="number" className="payment-input" />
        </div>
        <div className="textbox-container">
          <div className="payment-title">CVR: </div>
          <input type="number" className="payment-input" />
        </div>
      </div>
      <button
        id="payment-button"
        onClick={updateCredit}
        onMouseEnter={playButtonHoverSound}
      >
        Make Payment
      </button>
    </div>
  );
}
