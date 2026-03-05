import "./HomePageButtons.css";
import { useNavigate } from "react-router-dom";

export default function HomePageButtons() {
  const navigate = useNavigate();

  return (
    <div className="button-container">
      <button className="home-button" onClick={() => navigate("/poker")}>
        Poker
      </button>
      <button className="home-button">Black Jack</button>
    </div>
  );
}
