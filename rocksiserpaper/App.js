import './App.css';
import pic from './rocksiserpaper.png';
import {React, Component} from 'react';

const RSPel = {
  "바위": "0px",
  "가위": "-125px",
  "보": "-246px",
}
const RSPscore = {
  "가위": 1,
  "바위": 2,
  "보": 3,
}

class App extends Component{
  state = {
    result:'',
    imgCoord: "0px",
    score: 0,
    canClick: true,
  }

  interval;

  componentDidMount() {
    this.interval = setInterval(this.changeImg, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeImg = () => {
    const {result, imgCoord, score} = this.state;
    if(imgCoord === RSPel["바위"]) {
      this.setState({
        imgCoord: RSPel["가위"],
      })
    } else if(imgCoord === RSPel["가위"]) {
      this.setState({
        imgCoord: RSPel["보"],
      })
    } else if(imgCoord === RSPel["보"]) {
      this.setState({
        imgCoord: RSPel["바위"],
      })
    }
  }

  getComputerEl = (obj, value) => {
    return Object.keys(obj).find(key => obj[key] === value);
  }

  checkWin = (GameResult) => {
    if(GameResult === -2 || GameResult === 1) {
      this.setState(prevState => { 
        return {
          result:'이겼습니다!',
          score: prevState.score + 1
        }
      });
    } else if(GameResult === -1 || GameResult === 2) {
      this.setState(prevState => { 
        return {
          result:'졌습니다.',
          score: prevState.score -1
        }
      });
    } else if(GameResult === 0) {
      this.setState(prevState => { 
        return {
          result:'비겼어요',
        }
      });
    }
  }

  handleChangeCanClick = () => {
    return this.setState(prevState => {
      return {
        canClick: !prevState.canClick
      }
    })
  }

  handleBtnClick = (choice) => {
    if(!this.state.canClick) return;
    this.handleChangeCanClick();
    clearInterval(this.interval);
    const result = RSPscore[choice] - RSPscore[this.getComputerEl(RSPel, this.state.imgCoord)];
    this.checkWin(result);
    setTimeout(() => {
      this.interval = setInterval(this.changeImg, 50);
    }, 1500);
    setTimeout(this.handleChangeCanClick, 1500);
  }

  render() {
    const {result, imgCoord, score} = this.state;
    return (
      <div className="App">
        <div className="App-container">
          <div id="computer" style={{ background: `no-repeat url(${pic}) ${imgCoord}`}}></div>
          <div id="button-container">
            <button onClick={() => this.handleBtnClick('가위')}>가위</button>
            <button onClick={() => this.handleBtnClick('바위')}>바위</button>
            <button onClick={() => this.handleBtnClick('보')}>보</button>
          </div>
          <div id="status">
            <div className="score">내 점수: {this.state.score}</div>
            <div className="result">{this.state.result}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
