"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

// Initial board with emojis
const board = [
  "🤬",
  "😊",
  "🥰",
  "😹",
  "😝",
  "😎",
  "☠️",
  "😊",
  "😝",
  "🤗",
  "🥰",
  "😹",
  "🤬",
  "😎",
  "🤗",
  "☠️",
];

export default function Home() {
  const [saveBoard, setSaveBoard] = useState(new Array(16).fill(null));
  const [selectedCards, setSelectedCards] = useState([]);
  const [disableClick, setDisableClick] = useState(false);
  const [win, setWin] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerA, setTimerA] = useState(false);

  useEffect(() => {
    let timer;
    if (timerA && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerA(false);
      setWin(false);
    }
    return () => clearInterval(timer);
  }, [timerA, timeLeft]);

  const handleClick = (index) => {
    if (disableClick || saveBoard[index]) return;

    const newBoard = [...saveBoard];
    newBoard[index] = board[index];
    setSaveBoard(newBoard);

    const updatedSelectedCards = [...selectedCards, index];
    setSelectedCards(updatedSelectedCards);

    if (updatedSelectedCards.length === 2) {
      setDisableClick(true);

      const [firstIndex, secondIndex] = updatedSelectedCards;
      if (board[firstIndex] === board[secondIndex]) {
        setSelectedCards([]);
        setDisableClick(false);
        checkWin(newBoard);
      } else {
        setTimeout(() => {
          const resetBoard = [...newBoard];
          resetBoard[firstIndex] = null;
          resetBoard[secondIndex] = null;
          setSaveBoard(resetBoard);
          setSelectedCards([]);
          setDisableClick(false);
        }, 1000);
      }
    }
  };

  const checkWin = (newBoard) => {
    if (!newBoard.includes(null)) {
      setWin(true);
      setTimerA(false);
    }
  };

  const startGame = () => {
    setSaveBoard(new Array(16).fill(null));
    setSelectedCards([]);
    setDisableClick(false);
    setWin(false);
    setTimeLeft(60);
    setTimerA(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {saveBoard.map((item, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => handleClick(index)}
          >
            {item || ""}
          </div>
        ))}
      </div>
      {win && <div className={styles.winMessage}>You Win!</div>}
      {!win && timeLeft > 0 && (
        <div className={styles.timer}>Time Left: {timeLeft}s</div>
      )}
      {timeLeft === 0 && !win && (
        <div className={styles.loseMessage}>Time's up! You Lose.</div>
      )}
      <button className={styles.startButton} onClick={startGame}>
        Start New Game
      </button>
    </div>
  );
}
