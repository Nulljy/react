import Td from './td';


const Tr = ({row, rowIndex, dispatch, winner}) => {

    return (
        <tr>
            {row &&
                row.map((td, tdIndex) => <Td winner={winner} cell={td} rowIndex={rowIndex} cellIndex={tdIndex} dispatch={dispatch}/>)}
        </tr>
    )
}

export default Tr;
