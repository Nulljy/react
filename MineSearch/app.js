import './App.css';
import {createContext, useReducer, useMemo} from 'react';
import Form from './Components/Form';


export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
}
export const MyContext = createContext({
    game: [],
    stop: true,
    dispatch: () => {},
});
export const START_GAME = 'START_GAME';
const initialState = {
    tableData: [],
    data: {
        row:0,
        cell:0,
        mine: 0,
    },
    stop: true,
    timer: 0,
}
const createMap = (row, cell, mine) => {
    let table = [];
    let shuffle = [];
    if(row*cell < mine) return; // 마인의 갯수가 더 많으면 리턴
    for(let i=0; i<row*cell; i++) {
        table.push(i); // [0,1,2,3,4,5] 나중에 나누기한게 ROW, 남은게 CELL
    }
    // 마인심기
    // 자리 중복 안되게 마인을 심어야한다.
    for(let j=0; j<mine; j++) {
        shuffle.push(table.splice(Math.floor(Math.random()*table.length), 1)[0]);
    }
    console.log(shuffle + ' 마인의 인덱스');
    table = [];
    for(let k=0; k<row*cell; k++) {
        if(shuffle.includes(k)){
            table.push(CODE.MINE);
            continue;
        }
        table.push(CODE.NORMAL);
    }
}

function reducer(state, action) {
    switch(action.type) {
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                tableData: createMap(action.row, action.cell, action.mine),
                stop: false,
            }
        default:
            return state;
    }
}

const App = (props) => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const {stop, timer, tableData} = state;
    const value = useMemo(() => ({dispatch}), []);
    return (
        <MyContext.Provider value={value}>
            <Form/>
        </MyContext.Provider>
    )
}

export default App;
