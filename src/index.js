import React, {useState, useEffect} from 'react';
import  ReactDOM  from 'react-dom';
import './index.css'
//테스트
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
    )
  }

function Board(props) {

  function renderSquare(i) {
    return <Square
      onClick={() => props.onClick(i)}
      value={props.squares[i]}
    />
  }

  return (
    <div>
      <div>{props.squares}</div>
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
  )
}

function Modal(props) {
  return (
    <div className="modal-container">
      <div className="modal">
        <div>승리한 플레이어: {props.winner}</div>
        <button onClick={props.reStart}>재시작</button>
      </div>
    </div>
  )
}

function Game() {
  
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null)
    }
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [closeModal, setModal] = useState(0);

  const current = history[history.length-1];
  const winner = calculateWin(current.squares);
  const status =  winner? 
  "승리한 플레이어: " + winner :
  "다음 플레이어: " + (xIsNext ? "X" : "O");

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key = {move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  function jumpTo(move) {
    setHistory(history.slice(0, move+1));
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
  }

  function handleClick(i){
    const newHistory = history.slice(0, history.length);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if(calculateWin(squares) || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: squares }]));
    setXIsNext(!xIsNext);
  }


  function calculateWin(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for(let i=0; i<lines.length; i++) {
      let [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }


  function handleCloseModal() {
    const newHistory = history.splice(0, 1);
    setHistory(newHistory);
  }

  useEffect(() => {
    if(winner) {
      setModal(1);
    } else {
      setModal(0);
    }
  }, [winner]);

    return (
      <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={handleClick}/>
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{moves}</ol>
          </div>
          { closeModal === 0 ? "" : <Modal winner={winner} reStart={handleCloseModal}/>}
      </div>
    )
  
}

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);