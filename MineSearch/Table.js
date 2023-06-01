import { useContext, useState, useCallback } from 'react';
import { MyContext, START_GAME } from '../App';
import Tr from './Tr';
const Table = () => {
    const {dispatch, tableData, state} = useContext(MyContext);
    // tableData = [-1,-1,-1,-1,-1,-1,-7,-1,-1,-1,...] 
    // Tr과 Td 꼭 배열안에 넣고 해야하나?
    return (
        <table>
            {tableData.map((v, i) => {
                if((i+1)%state.data.cell === 0) {
                    return <Tr rowIndex={Math.floor((i+1)/state.data.cell)}/>
                }
            })}
        </table>
        
    )
}

export default Table;
