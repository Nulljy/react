import { useContext, useState, useCallback } from 'react';
import { MyContext, START_GAME } from '../App';

const Form = () => {
    const [row, setRow] = useState(5);
    const [cell, setCell] = useState(5);
    const [mine, setMine] = useState(5);
    const {dispatch} = useContext(MyContext);

    const InputRow = (e) => {
        setRow(e.target.value);
    }
    const InputCell = (e) => {
        setCell(e.target.value);
    }
    const InputMine = (e) => {
        setMine(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        return dispatch({type: START_GAME, row, cell, mine});
    }

    return (
        <div className="From-container">
            <form>
                <input onChange={InputRow} value={row} placeholder='row'/>
                <input onChange={InputCell} value={cell} placeholder='cell'/>
                <input onChange={InputMine} value={mine} placeholder='mine'/>
                <button onClick={onSubmit}>시작</button>
            </form>
        </div>
    )
}

export default Form;
