import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleClick = (i) => {
    // handle click event

    if (winner || board[i] || isDraw) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    const newWinner = calculateWinner(newBoard);

    // Check for a draw
    if (!newWinner && newBoard.every((square) => square)) {
      setIsDraw(true);
    }

    setWinner(newWinner);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null)); // Reset the board to an empty state
    setXIsNext(true); // Set the starting player (X) as the first player again
    setWinner(null); // Reset the winner
    setIsDraw(false); //make the draw false
  };
  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  const status = isDraw
    ? "Match is draw"
    : winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
    <h2>Instruction To Play the Game</h2>
      <p> Player 1 called X</p>
      <p> Player 2 called O</p>
      <p>
        After Each click next Player will get chance to click on the box which
        will be written on the box
      </p>
      <p>
        if any one of the two Player able to click on the three consecutive
        boxes then that player is <b>winner</b>
      </p>
      <div>
        <div className="board">
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      </div>
      <button className="restart-button" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  // function to declare winner
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
