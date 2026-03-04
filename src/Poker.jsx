import "./Poker.css";
import DrawCards from "./DrawCards";
import { useState, useEffect } from "react";

export default function Poker() {
  const [newGameId, setNewGameId] = useState(0);
  const [newDeck, setNewDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [botCards, setBotCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [centerCards, setCenterCards] = useState([]);

  const startNewGame = () => {
    setIsLoading(true);
    setNewGameId(newGameId + 1);
  };

  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => res.json())
      .then((data) => {
        setNewDeck(data);
        setIsLoading(false);
      });
  }, [newGameId]);

  if (isLoading) return <div>Loading...</div>;
  if (!newDeck) return;

  return (
    <div>
      <button className="new-game-button" onClick={startNewGame}>
        New Game
      </button>
      <div className="card-container">
        <div className="player-hand">
          <DrawCards
            count={2}
            deckId={newDeck.deck_id}
            newDeck={newDeck}
            setUserCards={setBotCards}
            isFaceUp={false}
          />
        </div>
        <div className="center-cards">
          <DrawCards
            count={5}
            deckId={newDeck.deck_id}
            newDeck={newDeck}
            setUserCards={setCenterCards}
            isFaceUp={false}
          />
        </div>
        <div className="player-hand">
          <DrawCards
            count={2}
            deckId={newDeck.deck_id}
            newDeck={newDeck}
            setUserCards={setPlayerCards}
            isFaceUp={true}
          />
        </div>
      </div>
    </div>
  );
}
