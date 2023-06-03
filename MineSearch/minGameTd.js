import { useContext, useCallback } from 'react';
import { MyContext, OPEN_BOX,CLICK_MINE, Right_Click_N, Right_Click_Q, Right_Click_F, CODE } from '../App';

const TdStyle = (cell) => {
    switch(cell) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: "grey"
            }
        case CODE.OPENED:
            return {
                background: "white"
            }
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: "yellow"
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: "red"
            }    
        default:
            return {
                background: "white"
            }
    }
}
const TdData = (cell) => {
    switch(cell) {
        case CODE.NORMAL:
        case CODE.OPENED:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.CLICKED_MINE:
            return '펑';
        default:
            return cell || '';
    }
}





const Td = ({cell, cellIndex, rowIndex}) => {
    const {dispatch, tableData, halted} = useContext(MyContext);

    const onClick = useCallback((e) => {
        console.log(cell);
        if(halted) return;
        switch(cell) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch({type:OPEN_BOX, row:rowIndex, cell:cellIndex})
                return;
            case CODE.MINE:
                dispatch({type:CLICK_MINE, row:rowIndex, cell:cellIndex})
                return;
            default:
                return;
        }
    }, [cell, halted])

    const onRightClick = useCallback((e) => {
        e.preventDefault();
        if(halted) return;
        switch(cell) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type:Right_Click_Q, row:rowIndex, cell:cellIndex})
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({type:Right_Click_F, row:rowIndex, cell:cellIndex})
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({type:Right_Click_N, row:rowIndex, cell:cellIndex})
                return;
            default:
                return;
        }
        
    }, [cell, halted])

    return (
        <td key={cellIndex + rowIndex} className='cell' style={TdStyle(cell)} onClick={onClick} onContextMenu={onRightClick}>
            {TdData(cell)}
        </td>
    )
}

export default Td;
