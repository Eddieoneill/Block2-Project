import "./HomeScreen.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import playButtonHoverSound from "./hoverSound.js";
import AppContext from "./AppContext";

export default function HomeScreen({ account, setCredit, credit }) {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);
  if (!account || !isLoggedIn) {
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
    const isConfirmed = window.confirm(
      `Are you sure you want to add $${amount} to account?`,
    );

    if (isConfirmed) {
      localStorage.setItem(`credit`, Number(credit) + amount);
      setCredit(Number(credit) + amount);
    } else {
      alert("payment was cancelled");
    }
  };

  return (
    <div>
      <h1 id="homescreen-title">
        Welcome {account.userName.toUpperCase()} to Ed's Casino!
      </h1>
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
          <img
            src="../public/PaymentType.png"
            alt="Payment type"
            id="payment"
          />
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
