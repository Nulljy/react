import { useState } from 'react';
import './App.css';
import Game from './components/Game';
import PutID from './components/PutID';

function App() {
  const[userId, setUserId] = useState('');
  const[history, setHistory] = useState([]);
  const[rank, setRank] = useState([]);

  const rankHistory = rank.length > 0 && rank.map((ran, i) => {
    console.log(`ran ${i}번째: ` + ran.id + " " + ran.history);
    return <div>{i+1}위 - {ran.id} 속도: {ran.history}</div>
  })

  const fromForm = (data) => {
    setUserId(data);
  }

  const getHistory = (histories) => {
    let newHistory = history.slice(0, history.length);
    // 순위 체크 함수
    newHistory = [...newHistory.concat({id:userId, history:histories})];
    setHistory(newHistory);
    checkRank(newHistory);
    setUserId('');
  }

  function checkRank(his) {
    // history의 histories를 받아와서 순서대로 정렬 
    const currentHistory = his.slice(0, his.length);
    const arr = Array(currentHistory.length).fill().map((arr, i) => {
      return i;
    });

    // sort로 증가하는 i와 i+1을 비교해야함 가장 큰걸 오른쪽으로 몰아두기
    for(let i=0; i<currentHistory.length-1; i++) {
      for(let j=i+1; j<currentHistory.length; j++) {
        if(currentHistory[i].history > currentHistory[j].history) {
          let tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
        }
      }
    }
    const rankResult = Array(Math.min(currentHistory.length, 4)).fill().map((el, i) => {
      return currentHistory[arr[i]];
    });
    setRank(rankResult);
  }


  return (
    <div className="App">
      <div className="App-header">
        <div className="header__logo">
          <a href='#'>
            <img alt='#'></img>
          </a>
        </div>
        <div className="header__title">
          반응 속도 테스트
        </div>
        <div className="header__blank"></div>
      </div>
      <div className="App-main">
        <div className="main__blank--1">
          {userId === '' ? <PutID transfer={fromForm}/> : ""}
          
          
        </div>
        <div className="main__content">
          {userId === false ? "" : <Game getPlay={getHistory} userId={userId}/>}
          {console.log("userId value:", userId)}
          {console.log("history value:", history)}
        </div>
        <div className="main__rank-container">
        <div className='main__rank-container__item'>{rank.length === 0 ? "" : rankHistory}</div>
        </div>
      </div>
      <div className="App-footer">
        <div className="footer__blank--1"></div>
        <div className="footer__content">
          <div className="content__averageMs">
            {/* 반응 속도 기록 */}
          </div>
        </div>
        <div className="footer__blank--2"></div>
      </div>
    </div>
  );
}

export default App;
