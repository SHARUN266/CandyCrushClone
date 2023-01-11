import { useEffect, useState } from "react";
import blue from "./images/blue-candy.png";
import green from "./images/green-candy.png";
import orange from "./images/orange-candy.png";
import red from "./images/red-candy.png";
import yellow from "./images/yellow-candy.png";
import blank from "./images/blank.png"
import purpule from "./images/purple-candy.png"
const width = 8;
const candyColors = [blue, green, orange, red, yellow,purpule];
function App() {
  const [squareDrag, setSquareDrag] = useState(null);
  const [squarePlace, setSquarePlace] = useState(null);

  const [board, setBoard] = useState([]);
  const checkForColumnThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decideColor = board[i];
      if (columnOfThree.every((square) => board[square] === decideColor)) {
        columnOfThree.forEach((square) => (board[square] = blank));
        return true;
      }
    }
  };
  const checkForRowThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decideColor = board[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (rowOfThree.every((square) => board[square] === decideColor)) {
        rowOfThree.forEach((square) => (board[square] = blank));
        return true;
      }
    }
  };
  const checkForRowFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decideColor = board[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (rowOfFour.every((square) => board[square] === decideColor)) {
        rowOfFour.forEach((square) => (board[square] =blank));
        return true;
      }
    }
  };
  const checkForColumnFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decideColor = board[i];
      if (columnOfFour.every((square) => board[square] === decideColor)) {
        columnOfFour.forEach((square) => (board[square] = blank));
        return true;
      }
    }
  };
  const moveintoSquareBelow = () => {
    for (var i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && board[i] === "") {
        let randomColor = Math.floor(Math.random() * board.length);
        board[i] = board[randomColor];
      }
      if (board[i + width] === blank) {
        board[i + width] = board[i];
        board[i] = blank;
      }
    }
  };

  const createBoard = () => {
    const randomColorArrangment = [];
    for (var i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangment.push(randomColor);
    }
    setBoard(randomColorArrangment);
  };
  useEffect(() => {
    createBoard();
  }, []);
  useEffect(() => {
    let timer = setInterval(() => {
      checkForColumnThree();
      checkForColumnFour();
      checkForRowThree();
      checkForRowFour();
      moveintoSquareBelow();
      setBoard([...board]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnThree,
    moveintoSquareBelow,
    checkForRowFour,
    checkForRowThree,
    checkForColumnFour,
    board,
  ]);
  const dragStart = (e) => {
    setSquareDrag(e.target);
  };
  const dragEnd = () => {
    let replace = squarePlace.getAttribute("data-id");
    let Dragged = squareDrag.getAttribute("data-id");
    board[replace] = squareDrag.getAttribute('src');
    board[Dragged] = squarePlace.getAttribute('src');
    const validMoves = [
      Dragged - 1,
      Dragged - width,
      Dragged + 1,
      Dragged + width,
    ];
    const valiMove = validMoves.includes(replace);
    const isColumnFour = checkForColumnFour();
    const isColumnThree = checkForColumnThree();
    const isRowFour = checkForRowFour();
    const isRowThree = checkForRowThree();
    if (
      replace &&
      valiMove &&
      (isRowThree || isRowFour || isColumnFour || isColumnThree)
    ) {
      setSquareDrag(null);
      setSquarePlace(null);
    } else {
      board[replace] = squarePlace.getAttribute('src');
      board[Dragged] = squareDrag.getAttribute('src');
      setBoard([...board]);
    }
  };
  const dragDrop = (e) => {
    setSquarePlace(e.target);
  };
  return (
    <div className="App">
      <div className="game">
        {board.map((e, i) => (
          <img
            key={i + 1}
            data-id={i}
            src={e}
            draggable={true}
            onDragOver={(e) => e.preventDefault()}
            onDrag={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
           // style={{ background: e }}
            alt={e}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
