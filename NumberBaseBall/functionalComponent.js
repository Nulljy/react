import { useState } from 'react';
import './App.css';

function App() {
  const [quest, setQuest] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [history, setHistory] = useState([]);

  const moves = history.map((hit, move) => {
    return <tr key={hit}>
      <th scope='row'>{move}</th>
      <td>{history[move].first}</td>
      <td>{history[move].second}</td>
      <td>{history[move].third}</td>
      <td>{history[move].result}</td>
    </tr>
  })

  function inputChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!quest) {
      return setQuest(inputValue);
    }

    let result;
    let hit = 0;
    let ball = 0;
    const current = history.slice(0, history.length);

    for(let i=0; i<quest.length; i++) {
      if(quest.includes(inputValue[i])) {
        quest[i] === inputValue[i] ? hit++ : ball++;
      }
    }
    hit === 3 ? result = `${hit}S ${ball}B 홈런!` : result = `${hit}S ${ball}B`;
    const hisElement = [...current.concat({first: inputValue[0], second: inputValue[1], third: inputValue[2], result: result})];
    setHistory(hisElement);
    return;
  }

  return (
    <div className="App">
      <div className='quest-container'>
        <div>처음 시도에는 정답을 입력해주세요</div>
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <input value={inputValue} onChange={inputChange}></input>
          <button>실행</button>
        </form>
      </div>
      <div className='history-container'>
        <table>
        <caption>야구 히스토리</caption>
          <tr>
            <th scope='col'>회차</th>
            <th scope='col'>1번 타자</th>
            <th scope='col'>2번 타자</th>
            <th scope='col'>3번 타자</th>
            <th scope='col'>결과</th>
          </tr>
          {moves}
        </table>
      </div>

    </div>
  );
}

export default App;
