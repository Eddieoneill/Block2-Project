import PokerContext from "./PokerContext";
import { useContext } from "react";

export default function DisplayResultAnimation() {
  const { gameResult, isRemoved } = useContext(PokerContext);
  if (isRemoved) return;

  if (gameResult.length < 2) return;

  return calculateResult(gameResult[0], gameResult[1]);
}

const calculateResult = (player, bot) => {
  const { setIsRemoved } = useContext(PokerContext);
  const winAnimation = (
    <img
      className="result-animation"
      src="./Win.gif"
      alt="Loading Animation"
      onClick={() => removeSelf()}
    />
  );
  const loseAnimation = (
    <img
      className="result-animation"
      src="./Lose.gif"
      alt="Loading Animation"
      onClick={() => removeSelf()}
    />
  );
  const drawAnimation = (
    <img
      className="result-animation"
      src="./Draw.gif"
      alt="Loading Animation"
      onClick={() => removeSelf()}
    />
  );
  const dict = {
    "RoyalFlush!": 10,
    "StraightFlush!": 9,
    "gotQuads!": 8,
    "FullHouse!": 7,
    "gotFlush!": 6,
    "gotStraight!": 5,
    "aKind!": 4,
    "TwoPair!": 3,
    "aPair!": 2,
    "ACEHigh!": 1,
    "KINGHigh!": 0,
    "QUEENHigh!": -1,
    "JACKHigh!": -2,
    "10High!": -3,
    "9High!": -4,
    "8High!": -5,
    "7High!": -6,
    "6High!": -7,
    "5High!": -8,
    "4High!": -9,
    "3High!": -10,
    "2High!": -11,
  };
  const playerResult = dict[player];
  const botResult = dict[bot];

  console.log(playerResult, botResult);
  const removeSelf = () => {
    setIsRemoved(true);
  };

  if (playerResult > botResult) {
    return winAnimation;
  } else if (playerResult < botResult) {
    return loseAnimation;
  } else {
    return drawAnimation;
  }
};
