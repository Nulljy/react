import './App.css';
import {createContext, useReducer, useMemo} from 'react';
import Form from './Components/Form';
import Table from './Components/Table';


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
export const OPEN_BOX = 'OPEN_BOX';

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
    table = [];
    for(let k=0; k<row*cell; k++) {
        if(shuffle.includes(k)){
            table.push(CODE.MINE);
            continue;
        }
        table.push(CODE.NORMAL);
    }
    console.log(table + ' 현재의 테이블');
    return table;
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
        case OPEN_BOX:
            let newMap = [...state.tableData];
            let around = [];
            let option = action.opendCell;
            let top = option >= state.data.cell ? true : false;
            let bottom = (state.data.row - 1) * state.data.cell > option ? true : false;
            let left = option%state.data.cell !== 0;
            let right = (option+1)%state.data.cell !== 0;
            if(left) {
                console.log('왼쪽: ' + left);
                around = around.concat(newMap[action.opendCell-1]);
                if(top) {// 왼쪽이 있고 위도 있는 경우
                    console.log('왼쪽: ' + left + ' 위: ' + top);
                    around = around.concat(
                        newMap[action.opendCell - state.data.cell - 1],
                        );
                }
                if(bottom) { // 왼쪽이 있고 아래도 있는 경우
                    console.log('왼쪽: ' + left + ' 아래: ' + bottom);
                    around = around.concat(
                        newMap[action.opendCell + (state.data.cell - 1)],
                        );
                }
            }
            if(right) {
                console.log('오른쪽: ' + right);
                around = around.concat(newMap[action.opendCell+1]);
                if(top) {// 오른쪽이 있고 위도 있는 경우
                    console.log('오른쪽: ' + right + ' 위: ' + top);
                    around = around.concat(
                        newMap[action.opendCell - state.data.cell + 1],
                        );
                }
                if(bottom) { // 오른쪽이 있고 아래도 있는 경우
                    console.log('오른쪽: ' + right + ' 아래: ' + bottom);
                    around = around.concat(
                        newMap[action.opendCell + state.data.cell + 1],
                        );
                }
            }
            if(top) {
                console.log('위: ' + top);
                around = around.concat(newMap[action.opendCell - state.data.cell]);
            }
            if(bottom) {
                console.log('아래: ' + bottom);
                around = around.concat(newMap[action.opendCell + state.data.cell]);
            }
            let count = around.filter(v => {
                return [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(v)}
                ).length;
            console.log(around);
            newMap[action.opendCell] = count;
            return {
                ...state,
                tableData: newMap,
            }
        default:
            return state;
    }
}

const App = (props) => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const {stop, timer, tableData} = state;
    const value = useMemo(() => ({dispatch, tableData, state}), [tableData]);
    return (
        <MyContext.Provider value={value}>
            <div className="App-container">
                <Form/> 
                <Table/>
            </div>
        </MyContext.Provider>
    )
}

export default App;
