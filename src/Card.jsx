import { useState, useEffect } from "react";
import "./Card.css";

export default function Card({ deckId, setUserCards, isFaceUp }) {
  const [currCard, setCurrCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleTransform = (event) => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((res) => res.json())
      .then((data) => {
        setCurrCard(data);
        setIsLoading(false);
        setUserCards(data.cards[0]);
      });
  }, []);

  if (isLoading) return <div>Loading</div>;

  if (!currCard) return;

  if (!isFaceUp) {
    return (
      <div
        key={currCard.cards[0].code}
        className={`card-sleeve ${isFlipped ? "flipped" : ""}`}
      >
        <div className="card-sleeve-inner">
          <div className="front" onClick={toggleTransform}>
            <img
              className="card"
              src="https://deckofcardsapi.com/static/img/back.png"
              alt={currCard.cards[0].code}
            />
          </div>
          <div className="back" onClick={toggleTransform}>
            <img
              className="card"
              src={currCard.cards[0].image}
              alt={currCard.cards[0].code}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={currCard.cards[0].code}
      className={`card-sleeve ${isFlipped ? "flipped" : ""}`}
    >
      <div className="card-sleeve-inner">
        <div className="back" onClick={toggleTransform}>
          <img
            className="card"
            src="https://deckofcardsapi.com/static/img/back.png"
            alt={currCard.cards[0].code}
          />
        </div>
        <div className="front" onClick={toggleTransform}>
          <img
            className="card"
            src={currCard.cards[0].image}
            alt={currCard.cards[0].code}
          />
        </div>
      </div>
    </div>
  );
}
