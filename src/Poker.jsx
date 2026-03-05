import "./Poker.css";
import DrawCards from "./DrawCards";
import CardComboLogic from "./CardComboLogic.js";
import { useState, useEffect } from "react";

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
  const [didReveal, setDidRevel] = useState(false);
  const [isBot, setIsBot] = useState(true);

  const startNewGame = () => {
    setIsLoading(true);
    setNewGameId(newGameId + 1);
    setDidRevel(false);
    setCenterCards([]);
    setPlayerCards([]);
    setBotCards([]);
    setBotCard(null);
    setPlayerCard(null);
    setCenterCard(null);
    setIsBot(true);
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
            setUserCard={setBotCard}
            isFaceUp={false}
            setDidRevel={setDidRevel}
            didReveal={didReveal}
            setIsBot={setIsBot}
          />
          <HandResult
            className="hand-result"
            userCards={botCards}
            centerCards={centerCards}
            user={"Bot"}
            didReveal={didReveal}
            isBot={isBot}
          />
        </div>
        <div className="center-cards">
          <DrawCards
            count={5}
            deckId={newDeck.deck_id}
            newDeck={newDeck}
            setUserCard={setCenterCard}
            isFaceUp={false}
            setDidRevel={setDidRevel}
            didReveal={didReveal}
          />
        </div>
        <div className="player-hand">
          <DrawCards
            count={2}
            deckId={newDeck.deck_id}
            newDeck={newDeck}
            setUserCard={setPlayerCard}
            isFaceUp={true}
            setDidRevel={setDidRevel}
            didReveal={didReveal}
          />
          <HandResult
            userCards={playerCards}
            centerCards={centerCards}
            user={"You"}
            didReveal={didReveal}
            isBot={false}
          />
        </div>
      </div>
    </div>
  );
}

function HandResult({ userCards, centerCards, user, didReveal, isBot }) {
  if (userCards.length < 2 || centerCards.length < 5 || !didReveal || isBot)
    return;
  let uCards = userCards;
  let cCards = centerCards;
  useEffect(() => {
    if (uCards.length > 2) {
      uCards = uCards.splice(0, 2);
    }

    if (cCards.length > 5) {
      cCards = cCards.splice(0, 5);
    }
  }, [userCards, centerCards]);

  console.log(uCards, cCards);
  let result = CardComboLogic.getBestCombo(uCards, cCards, user);

  return <h2 className="hand-result">{result}</h2>;
}
