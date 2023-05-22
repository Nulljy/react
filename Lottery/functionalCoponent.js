import './App.css';
import pic from './rocksiserpaper.png';
import {React, useState, useEffect, useRef, useCallback} from 'react';



function App() {
// 로또는 45개의 숫자중 6개를 맞춰야 1등 
// 뽑기를 누를때마다 45개의 숫자를 섞은 후 6개씩 꺼내오기
  let lotto = Array(45).fill().map((v, i) => v = i+1);
  const [myLotto, setMyLotto] = useState([...lotto.sort(() => Math.random() - 0.5).slice(0, 6)]);

  function handleClick(arr) {
    let tmp = lotto.slice(0, 45).sort(() => Math.random() - 0.5).slice(0, 6);
    setMyLotto(tmp);
  }

    return (
      <div className="App">
        <div className="Game-container">
          <div className="Game">
            <ul>
              {myLotto.map((v, i) => {
                return <li key={i.toString()}>{v}</li>
              })}
            </ul>
          </div>
          <div className="btn-container">
            <button onClick={() => handleClick(lotto)}>뽑기</button>
          </div>
        </div>
      </div>
    );
  
}

export default App;
