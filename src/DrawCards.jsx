import Card from "./Card";
import { useState, useEffect } from "react";

export default function DrawCards({
  count,
  deckId,
  newDeck,
  setUserCard,
  isFaceUp,
  isBot,
}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < count; i++) {
      tempArray.push(
        <Card
          key={tempArray.length}
          deckId={deckId}
          setUserCard={setUserCard}
          isFaceUp={isFaceUp}
          isBot={isBot}
        />,
      );
    }
    setCards(tempArray);
  }, [newDeck]);

  if (cards.length === 0) return;

  return (
    <>
      {cards.map((card, i) => {
        if (i >= count) return;
        return card;
      })}
    </>
  );
}
