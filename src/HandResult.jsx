import CardComboLogic from "./CardComboLogic.js";
import { useEffect, useContext } from "react";
import PokerContext from "./PokerContext";

export default function HandResult({ userCards, centerCards, user, isBot }) {
  const { didReveal, didBotReveal } = useContext(PokerContext);
  let uCards = userCards;
  let cCards = centerCards;

  if (
    userCards.length < 2 ||
    centerCards.length < 5 ||
    !didReveal ||
    (!didBotReveal && isBot)
  ) {
    return;
  }

  useEffect(() => {
    if (uCards.length > 2) {
      uCards = uCards.splice(0, 2);
    }

    if (cCards.length > 5) {
      cCards = cCards.splice(0, 5);
    }
  }, [userCards, centerCards]);

  let result = CardComboLogic.getBestCombo(uCards, cCards, user);

  return <h2 className="hand-result">{result}</h2>;
}
