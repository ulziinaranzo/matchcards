"use client";
import { useState } from "react";
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
    }
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
    </div>
  );
}
