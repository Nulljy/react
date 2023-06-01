import { useContext, useState, useCallback } from 'react';
import { MyContext, START_GAME } from '../App';
import Td from './Td';

const Tr = ({rowIndex}) => {
    const {dispatch, tableData, state} = useContext(MyContext);
    
    return (
        <tr className='row'>
            {tableData.map((v, i) => {
                if((state.data.cell * (rowIndex-1) < (i+1)) && (i+1) <= (state.data.cell * rowIndex)) {
                    return <Td cell = {v} cellIndex = {i}/>
                }
            })}
        </tr>
    )
}

export default Tr;
