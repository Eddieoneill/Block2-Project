import "./HomePageButtons.css";
import { useNavigate } from "react-router-dom";
import playButtonHoverSound from "./hoverSound.js";

export default function HomePageButtons() {
  const navigate = useNavigate();

  return (
    <div className="button-container">
      <button
        className="home-button"
        onClick={() => navigate("/poker")}
        onMouseEnter={playButtonHoverSound}
      >
        Poker
      </button>
      <button
        className="home-button"
        onClick={() => navigate("/blackjack")}
        onMouseEnter={playButtonHoverSound}
      >
        Black Jack
      </button>
    </div>
  );
}
