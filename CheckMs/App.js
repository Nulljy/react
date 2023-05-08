import './App.css';
import Game from './components/Game';

function App() {

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
        <div className="main__blank--1"></div>
        <div className="main__content">
          <Game/>
        </div>
        <div className="main__rank-container">
          {/* 랭크 컴포넌트 */}
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
