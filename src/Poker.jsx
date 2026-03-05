import "./Poker.css";
import DrawCards from "./DrawCards";
import { useState, useEffect } from "react";
import playButtonHoverSound from "./hoverSound.js";
import HandResult from "./HandResult.jsx";
import PokerContext from "./PokerContext";

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
      value={{ didReveal, setDidReveal, didBotReveal, setDidBotReveal }}
    >
      <button
        className="new-game-button"
        onClick={startNewGame}
        onMouseEnter={playButtonHoverSound}
      >
        New Game
      </button>
      <div className="card-container">
        <div className="player-hand">
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
    </PokerContext.Provider>
  );
}
