import {React, Component} from 'react';

class App extends Component {
  // 맨 끝 철자에 맞는 답 제시
  // 맞으면 히스토리에 추가 
  // 히스토리는 왼쪽으로 움직이고 사라지게
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      quest: "",
      cnt: 0,
      status: "제시어를 입력해주세요.",
      history: []
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.state.cnt) {
      this.setState({quest: this.state.value});
      const newHistory = this.state.history.slice(0, 0);
      newHistory.push(this.state.value);
      return this.setState({value: "", cnt: this.state.cnt+1, status:"", history: newHistory});
    } 
    if(this.state.value[0] === this.state.quest[this.state.quest.length-1]) {
      this.setState({quest: this.state.value});
      const newHistory = this.state.history.slice(0, 3);
      newHistory.push(this.state.value);
      if(this.state.cnt >= 3) {
        const length = this.state.history.length;
        const History = this.state.history.slice(length-2, length);
        History.push(this.state.value);
        return this.setState({value: "", cnt: this.state.cnt+1, status: "정답입니다!", history: History});
      }
      this.setState({value: "", cnt: this.state.cnt+1, status: "정답입니다!", history: newHistory});
    } else {
      this.setState({value: "", status: "틀렸습니다!"});
    };
  }

  handleType = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <div className='container'>
          <div className='questBox'>
            {this.state.quest}
          </div>
          <div className='answer-container'>
            <form onSubmit={this.handleSubmit}>
              <input type='text' value={this.state.value} onChange={this.handleType}></input>
              <button type='submit'>제출</button>
            </form>
          </div>
          <div className='status'>{this.state.status}</div>
          <div className='history-container'>
            <ol>
              {this.state.history.map((his, move) => {
                return <li key={move.toString()}>
                <button>{his}</button></li>
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
