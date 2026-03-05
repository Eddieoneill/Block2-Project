import { useContext } from "react";
import AppContext from "./AppContext.jsx";
import playButtonHoverSound from "./hoverSound.js";

export default function PlayButton() {
  const { isMusicPlaying, setIsMusicPlaying, audio, setAudio } =
    useContext(AppContext);
  console.log(isMusicPlaying);
  const playMusic = (event) => {
    audio.volume = 0.1;
    if (!isMusicPlaying) {
      event.target.innerHTML = "Pause";
      audio.play();
      audio.loop = true;
      setIsMusicPlaying(true);
    } else {
      let newAudio = new Audio("../public/BackgroundMusic.mp3");
      event.target.innerHTML = "Play BGM";
      audio.pause();
      setIsMusicPlaying(false);
      setAudio(newAudio);
    }
  };

  if (isMusicPlaying) {
    return (
      <button
        className="music-button"
        onClick={playMusic}
        onMouseEnter={playButtonHoverSound}
      >
        Pause
      </button>
    );
  } else {
    return (
      <button
        className="music-button"
        onClick={playMusic}
        onMouseEnter={playButtonHoverSound}
      >
        Play BGM
      </button>
    );
  }
}
