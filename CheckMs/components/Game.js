import {useState} from 'react';
import './Game.css';

function Game(props) {
    const [status, setStatus] = useState('게임을 시작하시려면 화면을 클릭해주세요.');
    const [isActive, setIsActive] = useState('start');
    const [check1, setCheck1] = useState();
    const [check2, setCheck2] = useState();

    if(isActive === "ready") {
        let gameTimeout = setTimeout(time, Math.floor(Math.random() * 3000 + 1000));
    }

    function time() {
        setCheck1(new Date().getTime());
        setIsActive('go');
        setStatus('Go!!');
    }

    function handleClick() {
        if(isActive === "start") {
            setIsActive('ready');
            setStatus('화면이 녹색이 되면 클릭하세요.');
        }else if(isActive === "ready") {
            setIsActive('ban');
            setStatus('아직 화면이 녹색이 아닙니다.');
        } else if(isActive === "ban") {
            setIsActive('ready');
            setStatus('화면이 녹색이 되면 클릭하세요.');
        } else if(isActive === "go") {
            setCheck2(new Date().getTime());
            setIsActive('ready');
            setStatus('화면이 녹색이 되면 클릭하세요.');
        }
    }

    return (
        <div className="Game-grid-container">
                <div className={`Game ${isActive}`} onClick={handleClick}>
                    <div className="GameFont">{status}</div>
                </div>
                <div>{check2 - check1}</div>
        </div>
    )
}

export default Game;