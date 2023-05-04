import {useState} from 'react';

function App(){
  // 맨 끝 철자에 맞는 답 제시
  // 맞으면 히스토리에 추가 
  // 히스토리는 왼쪽으로 움직이고 사라지게
  const [value, setValue] = useState("");
  const [quest, setQuest] = useState("");
  const [cnt, setCnt] = useState(0);
  const [status, setStatus] = useState("제시어를 입력해주세요.");
  const [history, sethistory] = useState([]);

  function handleSubmit(e){
    e.preventDefault();
    if(!cnt) {
      setQuest(value)
      const newHistory = history.slice(0, 0);
      newHistory.push(value);
      setValue("");
      setCnt(cnt+1);
      setStatus("");
      sethistory(newHistory);
      return;
    } 
    if(value[0] === quest[quest.length-1] && !history.includes(value)) {
      setQuest(value);
      const newHistory = history.slice(0, 3);
      newHistory.push(value);
      if(cnt >= 3) {
        const length = history.length;
        const History = history.slice(length-2, length);
        History.push(value);
        setValue("");
        setCnt(cnt+1);
        setStatus("정답입니다!");
        sethistory(History);
        return;
      }
      setValue("");
      setCnt(cnt+1);
      setStatus("정답입니다!");
      sethistory(newHistory);
    } else {
      setValue("");
      setStatus("틀렸습니다!");
    };
  }

  function handleType(e){
    setValue(e.target.value);
  }

    return (
      <div className="App">
        <div className='container'>
          <div className='questBox'>
            {quest}
          </div>
          <div className='answer-container'>
            <form onSubmit={handleSubmit}>
              <input type='text' value={value} onChange={handleType}></input>
              <button type='submit'>제출</button>
            </form>
          </div>
          <div className='status'>{status}</div>
          <div className='history-container'>
            <ol>
              {history.map((his, move) => {
                return <li key={move.toString()}>
                <button>{his}</button></li>
              })}
            </ol>
          </div>
        </div>
      </div>
    );
}

export default App;
