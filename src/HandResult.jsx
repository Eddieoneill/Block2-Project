import CardComboLogic from "./CardComboLogic.js";
import { useEffect, useContext } from "react";
import PokerContext from "./PokerContext";

export default function HandResult({ userCards, centerCards, user, isBot }) {
  const { didReveal, didBotReveal, gameResult, setGameResult } =
    useContext(PokerContext);
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

  let arr = result[0].split(" ");
  let tempResult = `${arr[arr.length - 2]}${arr[arr.length - 1]}`;

  if (!isBot && gameResult.length === 0) {
    setGameResult([[tempResult, result[1]]]);
  } else if (isBot && gameResult.length === 1) {
    setGameResult([...gameResult, [tempResult, result[1]]]);
  }

  return <h2 className="hand-result">{result[0]}</h2>;
}
