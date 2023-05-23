import './App.css';
import pic from './rocksiserpaper.png';
import {React, useState, useEffect, useRef, useCallback} from 'react';
import Ball from './components/balls';

// 미리 로또 6개를 뽑아놓기, 보너스 번호 1개
function getWinNum() {
  let lotto = Array(45).fill().map((v, i) => v = i+1);
  let shuffle = [];
  while(lotto.length > 0) {
    // 랜덤으로 1개씩 뽑아서 shuffle에 넣기
    let randomIndex = Math.floor(Math.random()*lotto.length);
    let randomNum = lotto[randomIndex];
    lotto.splice(randomIndex, 1);
    shuffle.push(randomNum);
  }
  shuffle = shuffle.splice(0, 7).sort((a, b) => a - b);
  return shuffle;
}

function App() {
// 로또는 45개의 숫자중 6개를 맞춰야 1등 
// 뽑기를 누를때마다 45개의 숫자를 섞은 후 6개씩 꺼내오기
// interval을 줘서 볼 한개당 1초씩 걸리게 뽑기
  const [myLotto, setMyLotto] = useState(getWinNum());
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState([]);
  const [visibleBtn, setVisibleBtn] = useState(false);
  
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect')
    for(let i=0; i<myLotto.length-1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, myLotto[i]]);
      }, i * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus([myLotto[6]]);
      setVisibleBtn((prev) => !prev);
    }, 6500);

    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      })
    }
  }, [timeouts.current]);

  const handleClick = () => {
    console.log('onClick');
    setMyLotto(getWinNum());
    setWinBalls([]);
    setBonus([]);
    setVisibleBtn((prev) => !prev);
    timeouts.current = [];
  }

    return (
      <div className="App">
        <div className="Game-container">
          <div className="Game">
            <div className="Game-number">
              <div className="title">로또번호</div>
              <div className="number">
                {winBalls.length > 0 && winBalls.map((v, i) => {
                  return <Ball number={v}/>
                })}
              </div>
            </div>
            <div className="Game-bonus">
              <div className="title">보너스번호</div>
              <div className="number">
                {bonus.length > 0 && bonus.map((v, i) => {
                  return <Ball number={v}/>
                })}
              </div>
            </div>
          </div>
          <div className="btn-container">
            {visibleBtn === true && <button onClick={handleClick}>뽑기</button>}
          </div>
        </div>
      </div>
    );
  
}

export default App;
