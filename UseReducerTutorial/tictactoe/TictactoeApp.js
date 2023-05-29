import './App.css';
import {useReducer, useEffect, useState, useCallback} from 'react';
import Board from './components/board';

const checkWin = (arr) => {
  const lines = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]],
  ] 
  for(let i=0; i<lines.length; i++) {
    const [a, b, c] = lines[i];
    if(arr[a[0]][a[1]] && arr[a[0]][a[1]] === arr[b[0]][b[1]] && arr[a[0]][a[1]] === arr[c[0]][c[1]]) {
      return arr[a[0]][a[1]];
    }
  }
  return null;
}

const initialState = {
  history: [],
  row: 0,
  col: 0,
  mine: 0,
  isX: true,
  status: null,
  game: [],
  winner: null,
}

export const CLICK_CELL = 'CLICK_CELL';
export const INPUT_ROW = 'INPUT_ROW';
export const INPUT_CELL = 'INPUT_CELL';
export const INPUT_MINE = 'INPUT_MINE';
export const FORM_SUBMIT = 'FORM_SUBMIT';
export const FORM_RESET = 'FORM_RESET';

// 틱택토
function App() {
  // useReducer로 state관리 실습
  const reducer = (state, action) => {
    switch(action.type) {
      case INPUT_ROW:
        return {
          ...state,
          row: action.row,
        }
        case INPUT_CELL:
          return {
            ...state,
            col: action.col,
          }
        case INPUT_MINE:
          return {
            ...state,
            mine: action.mine,
          }
        case FORM_SUBMIT:
          return {
            ...state,
            game: action.game,
          }
        case CLICK_CELL:
          let newBoard = [...state.game];
          let rowIndex = action.rowIndex;
          let cellIndex = action.cellIndex;
          let prevIsX = state.isX;
          newBoard[rowIndex][cellIndex] = prevIsX ? 'X' : 'O';
          let winner = checkWin(newBoard);
          return winner ? {
            ...state,
            game: newBoard,
            isX: !prevIsX,
            status: `${prevIsX ? 'X' : 'O'}님의 승리입니다!`,
            winner: winner,
          } : {
            ...state,
            game: newBoard,
            isX: !prevIsX,
            status: `${prevIsX ? 'O' : 'X'}님의 턴입니다.`
          };
          case FORM_RESET:
            return {
              ...state,
              isX: true,
              status: null,
              game: [],
              winner: null,
            }
        default:
          return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const inputRowValue = (e) => {
    return dispatch({type: INPUT_ROW, row: e.target.value});
  }
  const inputColValue = (e) => {
    return dispatch({type: INPUT_CELL, col: e.target.value});
  }
  const inputMineValue = (e) => {
    return dispatch({type: INPUT_MINE, mine: e.target.value});
  }
  const handleResetBtn = (e) => {
    return dispatch({type: FORM_RESET});
  }
  const onSubmit = (e) => {
    e.preventDefault();
    let newGame = [];
    let Row;
    for(let i=0; i<state.row; i++) {
      Row = [];
      for(let j=0; j<state.col; j++) {
        Row.push(null);
      }
      newGame.push(Row);
    }
    console.log(newGame);
    return dispatch({type: FORM_SUBMIT, game: newGame}); 
    // [[null,null,null], [null,null,null], [null,null,null]]
  }

  useEffect(() => {
    console.log('제출완료: ' + state.game);
  }, [state.game])

  return (
   <div className="App">
    <div className="App-container">
      <div className="Input-container">
        <input type='text' placeholder='row' onChange={inputRowValue}></input>
        <input type='text' placeholder='col' onChange={inputColValue}></input>
        <input type='text' placeholder='mine' onChange={inputMineValue}></input>
        <input type='button' onClick={onSubmit} value="제출"></input>
      </div>
      <div className="Game">
        <Board game={state.game} dispatch={dispatch} winner={state.winner}/>
      </div>
      <div className="status">
        {state.status}
      </div>
      <div className="reset">
        {state.winner && <button onClick={handleResetBtn}>리셋</button>}
      </div>
    </div>
   </div>
  )
}

export default App;
