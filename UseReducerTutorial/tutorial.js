import './App.css';
import {useReducer, useState, useCallback} from 'react';

// 미리 로또 6개를 뽑아놓기, 보너스 번호 1개
function App() {
  const [inputValue, setInputValue] = useState(1);
  const [count, countDispatch] = useReducer(countReducer,0);
  const onChange = useCallback((e) => {
    setInputValue(Number(e.target.value));
  })

  function countReducer(oldCount, action) {
    switch(action.option) {
      case '+':
        return oldCount + action.number;
      case '-':
        return oldCount - action.number;
      case '0':
        return 0;
    } 
  }

  function clickHandle(e) {
    switch(e.target.value) {
      case '+':
        return countDispatch({option: '+', number: inputValue});
      case '-':
        return countDispatch({option: '-', number: inputValue});
      case '0':
        return countDispatch({option: '0'});
    } 
  }

  // function onChange(e) {
  //   setInputValue(Number(e.target.value));
  // }

  return (
    <div className="App">
      <div className="btn">
        <input type="button" onClick={(e) => clickHandle(e)} value='-'></input>
        <input type="button" onClick={(e) => clickHandle(e)} value='0'></input>
        <input type="button" onClick={(e) => clickHandle(e)} value='+'></input>
        <input type="text" onChange={onChange}></input>
      </div>
      <div className="Value">{count}</div>
    </div>
  )
}

export default App;
