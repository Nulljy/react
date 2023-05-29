import { useCallback } from 'react';
import {CLICK_CELL} from '../App';

const Td = ({cell, rowIndex, cellIndex, dispatch, winner}) => {
    const onClickTd = useCallback(() => {
        if(cell !== null) return;
        if(winner) return;
        console.log(rowIndex, cellIndex);
        return dispatch({type: CLICK_CELL, rowIndex:rowIndex, cellIndex:cellIndex});
    }, [cell, winner])

    return (
        <td onClick={onClickTd}>
           {cell} 
        </td>
    )
}

export default Td;
