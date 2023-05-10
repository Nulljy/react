import {useState, useRef, useEffect} from 'react';
import './Game.css';

function Game(props) {
    const [status, setStatus] = useState('게임을 시작하시려면 화면을 클릭해주세요.');
    const [isActive, setIsActive] = useState('start');
    const [history, setHistory] = useState([]);
    const [id, setID] = useState(props.userId);
    const gameTimeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    useEffect(() => {
        setID(props.userId);
    }, [props.userId]);

    const resultHistory = history.slice(0, history.length).map((li, i) => {
        if(i === 2) {
            return (<div>
                <li key={li+i+'third'}>{i+1}회차: {li.result}ms</li>
                <li key={li+i+'avar'}>평균 속도는 {history.slice(0, history.length).reduce((acc, cur) => {
                    return acc + cur.result;
                }, 0) / history.length}입니다.</li>
                <li key={li+i}><button onClick={reStart}>재시작</button></li>
            </div>)
        }
        return <li key={li+i}>{i+1}회차: {li.result}ms</li>
    })

    function reStart() {
        clearTimeout(gameTimeout.current);
        const newGame = ['start'];
        setIsActive(newGame[0]);
        setStatus('게임을 시작하시려면 화면을 클릭해주세요.');
        const currentPlay = Math.floor(history.slice(0, 3).reduce((acc, cur) => {
            return acc + cur.result;
        }, 0) / history.length);
        console.log('최근 플레이 결과: ' + currentPlay);
        props.getPlay(currentPlay);
        setID('');
        setHistory([...history.slice(0,0)]);
    }

    function time() {
        startTime.current = new Date().getTime();
        setIsActive('go');
        setStatus('Go!!');
    }

    function handleClick() {
        if(history.length === 3) {
            endTime.current = new Date().getTime();
            let result = endTime.current - startTime.current;
            setHistory(prevHistory => [...prevHistory, {result: result}]);
            console.log(history);
            setIsActive('stop');
            setStatus('제출하기를 눌러주세요.');
        }
        if(isActive === "start") {
            setIsActive('ready');
            setStatus('화면이 녹색이 되면 클릭하세요.');
            gameTimeout.current = setTimeout(time, Math.floor(Math.random() * 1000 + 2000));
        }else if(isActive === "ready") {
            clearTimeout(gameTimeout.current);
            setIsActive('ban');
            setStatus('아직 화면이 녹색이 아닙니다.');
        } else if(isActive === "ban") {
            setIsActive('ready');
            setStatus('화면이 녹색이 되면 클릭하세요.');
            gameTimeout.current = setTimeout(time, Math.floor(Math.random() * 1000 + 2000));
        } else if(isActive === "go") {
            endTime.current = new Date().getTime();
            let result = endTime.current - startTime.current;
            setHistory([...history.concat({result: result})]);
            setIsActive('ready');
            setStatus('화면이 녹색이 되면 클릭하세요.');
            console.log(history);
            gameTimeout.current = setTimeout(time, Math.floor(Math.random() * 1000 + 2000));
        }
    }

    return ( 
        <div className="Game-grid-container">
            {id !== '' ? <div className={`Game ${isActive}`} onClick={handleClick}>
                <div className="GameFont">{status}</div>
            </div> : ""}
            <div>
                <ul>
                    {resultHistory}
                </ul>
            </div>
        </div>
    )
}

export default Game;
