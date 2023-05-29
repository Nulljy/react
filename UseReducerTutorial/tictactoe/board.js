import Tr from './tr';

const Board = ({game, dispatch, winner}) => {

    return (
        <table>
            {game && 
            game.map((tr, rowIndex) => (<Tr winner={winner} row={tr} rowIndex ={rowIndex} dispatch={dispatch}/>))}
        </table>
    )
}

export default Board;
