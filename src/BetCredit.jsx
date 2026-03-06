import AppContext from "./AppContext";
import { useContext } from "react";
import "./BetCredit.css";
import playButtonHoverSound from "./hoverSound.js";

export default function BetCredit({ betAmount, setBetAmount }) {
  const { credit } = useContext(AppContext);

  const addBet = () => {
    if (betAmount + 100 > credit && betAmount < credit) {
      setBetAmount(credit);
    } else if (betAmount + 100 > credit) {
      alert("You can't bet more then you have");
      return;
    }
    setBetAmount(betAmount + 100);
  };
  const subtractBet = () => {
    if (betAmount - 100 < 0) return;
    setBetAmount(betAmount - 100);
  };

  const betAll = () => {
    setBetAmount(credit);
  };

  return (
    <div className="bet-container">
      <div>
        <br />
        <div className="bet">Bet: </div>
        <div className="bet">${betAmount}</div>
      </div>
      <button id="allin" className="bet-button" onClick={betAll}>
        ALL-IN
      </button>
      <div className="bet-button-container">
        <button
          className="bet-button"
          onClick={subtractBet}
          onMouseEnter={playButtonHoverSound}
        >
          -
        </button>
        <button
          className="bet-button"
          onClick={addBet}
          onMouseEnter={playButtonHoverSound}
        >
          +
        </button>
      </div>
    </div>
  );
}
