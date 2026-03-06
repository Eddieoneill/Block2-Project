import "./Poker.css";
import DrawCards from "./DrawCards";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import playButtonHoverSound from "./hoverSound.js";
import HandResult from "./HandResult.jsx";
import PokerContext from "./PokerContext";
import DisplayResultAnimation from "./DisplayResultAnimation";
import AppContext from "./AppContext";
import BetCredit from "./BetCredit";

export default function Poker() {
  const [newGameId, setNewGameId] = useState(0);
  const [newDeck, setNewDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [botCard, setBotCard] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [centerCard, setCenterCard] = useState(null);
  const [botCards, setBotCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [centerCards, setCenterCards] = useState([]);
  const [didReveal, setDidReveal] = useState(false);
  const [didBotReveal, setDidBotReveal] = useState(false);
  const [gameResult, setGameResult] = useState([]);
  const [isRemoved, setIsRemoved] = useState(false);
  const [appliedFuns, setAppliedFuns] = useState(false);
  const { isLoggedIn, credit } = useContext(AppContext);
  const [betAmount, setBetAmount] = useState(0);
  const navigate = useNavigate();

  if (!isLoggedIn) navigate("/login");

  if (credit <= 0 && !didReveal) {
    navigate("/");
    useEffect(() => {
      alert("Please add funds before playing the game!");
    }, []);
  }

  const startNewGame = () => {
    setIsLoading(true);
    setNewGameId(newGameId + 1);
    setDidReveal(false);
    setCenterCards([]);
    setPlayerCards([]);
    setBotCards([]);
    setBotCard(null);
    setPlayerCard(null);
    setCenterCard(null);
    setDidBotReveal(false);
    setGameResult([]);
    setIsRemoved(false);
    setAppliedFuns(false);
    setBetAmount(0);
  };

  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => res.json())
      .then((data) => {
        setNewDeck(data);
        setIsLoading(false);
      });
  }, [newGameId]);

  useEffect(() => {
    if (!botCard) return;
    setBotCards([...botCards, botCard]);
  }, [botCard]);

  useEffect(() => {
    if (!playerCard) return;
    setPlayerCards([...playerCards, playerCard]);
  }, [playerCard]);

  useEffect(() => {
    if (!centerCard) return;
    setCenterCards([...centerCards, centerCard]);
  }, [centerCard]);

  if (isLoading)
    return (
      <img
        className="loading"
        src="./LoadingAnimation.gif"
        alt="Loading Animation"
      />
    );
  if (!newDeck) return;

  return (
    <PokerContext.Provider
      value={{
        didReveal,
        setDidReveal,
        didBotReveal,
        setDidBotReveal,
        gameResult,
        setGameResult,
        isRemoved,
        setIsRemoved,
        appliedFuns,
        setAppliedFuns,
      }}
    >
      <div className="card-container">
        <div className="player-hand">
          <br className="empty" />
          <DrawCards
            count={2}
            deckId={newDeck.deck_id}
            newDeck={newDeck}
            setUserCard={setBotCard}
            isFaceUp={false}
            isBot={true}
          />
          <HandResult
            className="hand-result"
            userCards={botCards}
            centerCards={centerCards}
            user={"Bot"}
            isBot={true}
          />
        </div>
        <div className="center-cards">
          <DrawCards
            count={5}
            deckId={newDeck.deck_id}
            newDeck={newDeck}
            setUserCard={setCenterCard}
            isFaceUp={false}
            isBot={false}
          />
        </div>
        <div className="player-hand">
          <BetCredit betAmount={betAmount} setBetAmount={setBetAmount} />
          <DrawCards
            count={2}
            deckId={newDeck.deck_id}
            newDeck={newDeck}
            setUserCard={setPlayerCard}
            isFaceUp={true}
            isBot={false}
          />
          <HandResult
            userCards={playerCards}
            centerCards={centerCards}
            user={"You"}
            isBot={false}
          />
        </div>
      </div>
      <button
        className="new-game-button"
        onClick={startNewGame}
        onMouseEnter={playButtonHoverSound}
      >
        New Game
      </button>
      <DisplayResultAnimation betAmount={betAmount} />
    </PokerContext.Provider>
  );
}
