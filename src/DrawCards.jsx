import Card from "./Card";
import { useState, useEffect } from "react";

export default function DrawCards({
  count,
  deckId,
  newDeck,
  setUserCards,
  isFaceUp,
}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < count; i++) {
      tempArray.push(
        <Card
          key={tempArray.length}
          deckId={deckId}
          setUserCards={setUserCards}
          isFaceUp={isFaceUp}
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
