import './App.css';
import pic from './rocksiserpaper.png';
import {React, useState, useEffect, useRef, useCallback} from 'react';

const RSPel = {
  "바위": "0px",
  "가위": "-115px",
  "보": "-246px",
}
const RSPscore = {
  "가위": 1,
  "바위": 2,
  "보": 3,
}

function App() {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState('0px');
  const [score, setScore] = useState(0);
  const [canClick, setCanClick] = useState(true);
  const interval = useRef(null);

  // useCallback은 콜백 함수를 메모이제이션하여 동일한 함수 인스턴스를 재사용하는데 사용된다.
  // useEffect의 의존성 배열은 해당 의존성에 따라 useEffect의 실행 시기를 결정한다.
  // useCallback의 메모이제이션은 처음 렌더링할 때만 생성되고, 이후의 렌더링에서는 동일한  
  // 함수 인스턴스를 사용한다.

  /**아래의 useCallback과 useEffect에서는 useEffect가 첫 컴포넌트 렌더시에 실행이 되고 
   * 그로 인해 changeImg가 실행되며 useCallback의 실행을 통해 메모이제이션을 하게 되고 
   * changeImg의 의존성 배열에 포함된 imgCoord의 참조가 바뀌지 않는다면 렌더시에 동일한     함수를 사용하게 되어 불필요한 렌더를 줄이게 된다. 하지만 밑의 함수에서는 매번 상태를 바꾸기 때문에 useEffect의 changeImg가 의존성 배열에 포함된 것을 충족하게 되어 계속 돌아간다.
   * 
   * 지금의 의문점: handleClick에서의 changeImg 실행이 useEffect에 영향을 주지 않는가?
   * 
   * canClick 상태를 변경하고, clearInterval을 사용하여 이전에 실행 중이던 interval을 멈춥니다. 그리고 일정 시간이 지난 후에 다시 setCanClick 함수를 사용하여 canClick 상태를 변경하고, 새로운 interval을 설정하여 changeImg 함수를 주기적으로 실행합니다. 라고 한다.
  */
  const changeImg = useCallback(() => {
    if(imgCoord === RSPel["바위"]) {
      setImgCoord(RSPel["가위"]);
    } else if (imgCoord === RSPel["가위"]) {
      setImgCoord(RSPel["보"]);
    } else {
      setImgCoord(RSPel["바위"]);
    }
  }, [imgCoord])

  useEffect(() => {
    interval.current = setInterval(changeImg, 150);
    return () => clearInterval(interval.current);
  }, [changeImg])

  const handleClick = (userRSP) => {
    if(canClick === false) return;
    // 일단 멈춘다.
    setCanClick(false);
    clearInterval(interval.current);
    const result = RSPscore[userRSP] - RSPscore[getComputerEl(RSPel, imgCoord)];
    console.log(result);
    checkWin(result);
    setTimeout(() => {
      setCanClick(true);
      interval.current = setInterval(changeImg, 150);
    }, 1000);
  }

  function checkWin(GameResult) {
    if(GameResult === -2 || GameResult === 1) {
      setResult('이겼습니다!');
      setScore(prev => prev + 1);
    } else if(GameResult === -1 || GameResult === 2) {
      setResult('졌습니다!');
      setScore(prev => prev - 1);
    } else if(GameResult === 0) {
      setResult('비겼습니다!');
    }
  }

  function getComputerEl(RSPel, imgCoord) {
    // RSPel 객체에서 key들만 뽑아서 RSPel[key]의 밸류와 imgCoord가 같은 키를 리턴
    return Object.keys(RSPel).find(key => RSPel[key]===imgCoord);
  }


    return (
      <div className="App">
        <div className="App-container" >
          <div className="Game">
            <div id="computer" style={{background: `no-repeat url(${pic}) ${imgCoord}`}}>
            </div>
            <div id="button-container">
              <button onClick={() => handleClick('가위')}>가위</button>
              <button onClick={() => handleClick('바위')}>바위</button>
              <button onClick={() => handleClick('보')}>보</button>
            </div>
            <div id="status">
            <div className="score">내 점수: {score}</div>
            <div className="result">{result}</div>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default App;
