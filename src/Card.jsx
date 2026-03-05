import { useState, useEffect } from "react";
import "./Card.css";

export default function Card({
  deckId,
  setUserCard,
  isFaceUp,
  setDidRevel,
  didReveal,
  setIsBot,
}) {
  const [currCard, setCurrCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleTransform = (event) => {
    let nodes =
      event.target.parentNode.parentNode.parentNode.parentNode.childNodes;
    if (!didReveal || setIsBot !== undefined) {
      animateFlip(nodes, 0);
    }
    setIsFlipped(!isFlipped);
  };

  const animateFlip = (nodes, i) => {
    if (i >= nodes.length) {
      setDidRevel(true);
      if (setIsBot !== undefined) setIsBot(false);
      return;
    }
    nodes[i].className = "card-sleeve flipped";
    setTimeout(() => animateFlip(nodes, i + 1), 1000);
  };

  useEffect(() => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((res) => res.json())
      .then((data) => {
        setCurrCard(data);
        setIsLoading(false);
        setUserCard(data.cards[0]);
      });
  }, []);

  if (isLoading)
    return (
      <img
        className="loading"
        src="./LoadingAnimation.gif"
        alt="Loading Animation"
      />
    );

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
