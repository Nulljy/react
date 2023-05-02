import './App.css';
import {useState} from 'react';

function App() {
  // 뭐뭐 했는지
  // 입력시 정답인지 아닌지 체크후 리턴
  const [history, setHistory] = useState({
    value: ''
  });
  const [first, setFirst] = useState({
    gugu: Math.floor(Math.random()*9) + 1
  })
  const [second, setSecond] = useState({
    gugu: Math.floor(Math.random()*9) + 1
  })
  const [result, setResult] = useState({
    status: null
  })


  // 불변성으로 인한 재 랜더링
  function onHandleSubmit(e) {
    e.preventDefault();
    if(parseInt(history.value) === first.gugu * second.gugu) {
      setResult({status: '정답입니다.'});
      setHistory({value: ''});
      setFirst({gugu: Math.floor(Math.random()*9) + 1});
      setSecond({gugu: Math.floor(Math.random()*9) + 1});
    } else {
      setResult({status: '땡'});
      setHistory({
        value: '',
      })
    }
  }
  

  return (
    <div className="App">
      <div className="container">
        <div className="quest">
        {first.gugu} 곱하기 {second.gugu}는?
        </div>
        <div className="answer">
          <form onSubmit={onHandleSubmit}>
            <input type="number" value={history.value}  onChange={(e) => setHistory({value:e.target.value})
            } name="gugudan" id="input" placeholder="내용을 입력해주세요"></input>
            <button type='submit'>입력!</button>
          </form>
        </div>
        <div className="status">
          {result.status ? result.status : ''}
        </div>
      </div>
    </div>
  );
}

export default App;
