"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

// Хувьсагчийн эхлэх утга
const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024;

export default function Home() {
  // const [board, setBoard] = useState(["🤬", "😊", "🥰", "😹", "😝", "😎", "☠️", "😊", "😝", "🤗", "🥰", "😹", "🤬", "😎", "🤗", "☠️"]);
  // const [saveBoard, setSaveBoard] = useState(new Array(16).fill(""));
  // const [screenWidth, setScreenWidth] = useState(1024); // Ширээний хэмжээ
  // const [selectedCards, setSelectedCards] = useState([]); // Сонгогдсон картуудын индексууд
  // const [disableClick, setDisableClick] = useState(false); // Карт дарахад хязгаарлах
  // const [win, setWin] = useState(false); // Хожлын нөхцөл


    const [board, setBoard] = useState(["🤬", "😊", "🥰", "😹", "😝", "😎", "☠️", "😊", "😝", "🤗", "🥰", "😹", "🤬", "😎", "🤗", "☠️"]);
    const [selectedCards, setSelectedCards] = useState([]); // Сонгогдсон картуудын индексүүд
  
    const handleClick = (index) => {
      if (selectedCards.includes(index)) return; // Давхар дарахаас сэргийлэх
  
      setSelectedCards([...selectedCards, index]); // Шинээр сонгосон картын индексийг хадгалах
    };
  
    return (
      <div>
        <h3>Сонгогдсон картууд:</h3>
        <p>{selectedCards.join(", ")}</p> {/* Сонгогдсон картуудын индексүүдийг харуулах */}
  
        <div>
          {board.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              style={{
                width: "50px",
                height: "50px",
                display: "inline-block",
                border: "1px solid black",
                margin: "5px",
                textAlign: "center",
                lineHeight: "50px",
                backgroundColor: selectedCards.includes(index) ? "lightgray" : "white", // Сонгогдсон картын өнгийг өөрчлөх
              }}
            >
              {selectedCards.includes(index) ? item : "?"} {/* Сонгогдсон картын emoji-г харуулах */}
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  // Ширээний хэмжээг шинэчлэх
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setScreenWidth(window.innerWidth);
//     }
//   }, []);

// const handleClick = (index) => {
//   // Do nothing if card is already revealed or clicking is disabled
//   if (disableClick || saveBoard[index]) return;

//   // Reveal the clicked card
//   const newBoard = [...saveBoard];
//   newBoard[index] = board[index];
//   setSaveBoard(newBoard);

//   // Add the clicked card to the list of selected cards
//   const updatedSelectedCards = [...selectedCards, index];
//   setSelectedCards(updatedSelectedCards);

//   // If two cards are selected, check if they match
//   if (updatedSelectedCards.length === 2) {
//     // Disable further clicks while checking the cards
//     setDisableClick(true);
    
//     const [firstIndex, secondIndex] = updatedSelectedCards;

//     // If the cards match, reset the selected cards
//     if (board[firstIndex] === board[secondIndex]) {
//       setSelectedCards([]); // Clear selected cards
//       setDisableClick(false); // Enable clicking again
//       checkWin(newBoard); // Check if the player has won
//     } else {
//       // If they don't match, hide the cards again after a delay
//       setTimeout(() => {
//         const resetBoard = [...newBoard];
//         resetBoard[firstIndex] = "";
//         resetBoard[secondIndex] = "";
//         setSaveBoard(resetBoard); // Reset the cards
//         setSelectedCards([]); // Clear selected cards
//         setDisableClick(false); // Enable clicking again
//       }, 1000); // Wait 1 second before resetting the cards
//     }
//   }
// };

// Function to check if all cards are revealed (player wins)
// const checkWin = (newBoard) => {
//   if (!newBoard.includes("")) {
//     setWin(true); // Player wins when all cards are revealed
//     alert("YOU WIN"); // Show win message
//   }
// };

  
//   return (
//     <div className={styles.container}>
//       <div className={styles.box}>
//         {saveBoard.map((item, index) => (
//           <div key={index} className={styles.card} onClick={() => handleClick(index)}>
//             {item || ""} {/* Хоосон картуудын оронд ямар нэг утга байхгүй бол hooson string */}
//           </div>
//         ))}
//       </div>
//       {win && <div className={styles.winMessage}>You Win!</div>} {/* Хожлын мессеж */}
//     </div>
//   );