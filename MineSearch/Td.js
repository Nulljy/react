import { useContext, useState, useCallback } from 'react';
import { MyContext, START_GAME, OPEN_BOX, CODE } from '../App';

const TdStyle = (cell) => {
    switch(cell) {
        case CODE.MINE:
        case CODE.NORMAL:
            return {background: "grey"};
        case CODE.OPENED:
            return {background: "white"};
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {background: "yellow"};
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {background: "red"};
        default:
            return {background: "white"};
    }
}
const TdData = (cell) => {
    switch(cell) {
        case CODE.MINE:
            return 'X';
        case CODE.NORMAL:
            return '';
        case CODE.OPENED:
            return '';
        default:
            return cell;
    }
}



const Td = ({cell, cellIndex}) => {
    const {dispatch} = useContext(MyContext);

    const onClick = (e) => {
        console.log(cell);
        switch(cell) {
            case CODE.NORMAL:
                return dispatch({type: OPEN_BOX, opendCell: cellIndex})
        }
    }

    return (
        <td className='cell' style={TdStyle(cell)} onClick={onClick}>
            {TdData(cell)}
            {/* {cell} */}
            {/* {cellIndex} */}
        </td>
    )
}

export default Td;
