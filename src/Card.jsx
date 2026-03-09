import { useState, useEffect } from "react";
import "./Card.css";
import PokerContext from "./PokerContext";
import { useContext } from "react";

export default function Card({ deckId, setUserCard, isFaceUp, isBot }) {
  const [currCard, setCurrCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const { didReveal, setDidReveal, didBotReveal, setDidBotReveal } =
    useContext(PokerContext);

  const toggleTransform = (event) => {
    if (isBot === true && !didReveal) return;
    let nodes =
      event.target.parentNode.parentNode.parentNode.parentNode.childNodes;
    if (!didReveal || (isBot === true && !didBotReveal)) {
      if (nodes[0].className === "empty") {
        animateFlip(nodes, 1);
      } else {
        animateFlip(nodes, 0);
      }
    } else {
      playCardFlipSound();
    }
    setIsFlipped(!isFlipped);
  };

  const animateFlip = (nodes, i) => {
    if (i >= nodes.length) {
      setDidReveal(true);
      if (isBot === true) {
        setDidBotReveal(true);
      }
      return;
    }
    nodes[i].className = "card-sleeve flipped";
    playCardFlipSound();
    setTimeout(() => animateFlip(nodes, i + 1), 1000);
  };

  const playHoverSound = () => {
    const audio = new Audio("../public/HoverSound.mp3");
    audio.volume = 0.1;
    audio.play();
  };

  const playCardFlipSound = () => {
    const audio = new Audio("../public/CardFlipSound.mp3");
    audio.volume = 0.2;
    audio.play();
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
      <>
        <img
          className="loading"
          src="./LoadingAnimation.gif"
          alt="Loading Animation"
        />
      </>
    );

  if (!currCard) return;

  if (!isFaceUp) {
    return (
      <div
        key={currCard.cards[0].code}
        className={`card-sleeve ${isFlipped ? "flipped" : ""}`}
        onMouseEnter={playHoverSound}
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
      onMouseEnter={playHoverSound}
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
