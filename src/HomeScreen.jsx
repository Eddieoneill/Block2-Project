import "./HomeScreen.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen({ account, setCredit }) {
  const navigate = useNavigate();
  if (!account) {
    useEffect(() => {
      navigate("/login");
    });
    return;
  }

  return (
    <div>
      <h1 id="homescreen-title">Welcome {account.userName}, to Ed's Casino!</h1>
      <h2 id="funds-title">Add Funds!</h2>
      <div className="payment-container">
        <div className="textbox-container">
          <div className="payment-title">Amount: </div>
          <input type="text" className="payment-input" />
        </div>
        <div className="textbox-container">
          <div className="payment-title">Card Number: </div>
          <input type="text" className="payment-input" />
          <div>Card Type</div>
        </div>
        <div className="textbox-container">
          <div className="payment-title">Name on card: </div>
          <input type="text" className="payment-input" />
        </div>
        <div className="textbox-container">
          <div className="payment-title">Exp Data: </div>
          <input type="text" className="payment-input" />
        </div>
        <div className="textbox-container">
          <div className="payment-title">CVR: </div>
          <input type="text" className="payment-input" />
        </div>
      </div>
      <button id="payment-button">Make Payment</button>
    </div>
  );
}
