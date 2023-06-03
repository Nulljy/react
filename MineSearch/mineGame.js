import './App.css';
import {createContext, useReducer, useMemo, useEffect} from 'react';
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
    halted: true,
});
export const START_GAME = 'START_GAME';
export const OPEN_BOX = 'OPEN_BOX';
export const CLICK_MINE = 'CLICK_MINE';
export const Right_Click_Q = 'Right_Click_Q';
export const Right_Click_F = 'Right_Click_F';
export const Right_Click_N = 'Right_Click_N';
export const INCREMENT_TIME = 'INCREMENT_TIME';

const initialState = {
    tableData: [],
    data: {
        row:0,
        cell:0,
        mine:0,
    },
    timer: 0,

    result: '',
    halted: true,
    openedCount: 0,
}

const plantMine = (row, cell, mine) => {
    let tableData = [];
    let tmp;
    let shuffle = [];
    let candidate = Array(row*cell).fill().map((v, i) => v = i);
    while(candidate.length > row*cell-mine) {
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length), 1)[0]);
    }
    for(let i=0; i<row; i++) {
        tmp = [];
        for(let j=0; j<cell; j++) {
            tmp.push(CODE.NORMAL);
        }
        tableData.push(tmp);
    }
    let rowIndex;
    let cellIndex;
    for(let k=0; k<shuffle.length; k++) {
        rowIndex = Math.floor(shuffle[k] / cell);
        cellIndex = shuffle[k] % cell;
        tableData[rowIndex][cellIndex] = CODE.MINE;
    }
    return tableData;
}

const reducer = (state, action) => {
    switch(action.type) {
        case START_GAME:{
            return {
                ...state,
                data:{
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine
                },
                tableData:plantMine(action.row, action.cell, action.mine),
                openedCount:0,
                halted:false,
                timer: 0,
            }
        }
        case OPEN_BOX:{
            let result;
            let halted;
            let openedCount = 0;
            const tableData = [...state.tableData];
            let checked = []; // 이미 연 칸은 넣어놓기
            tableData.forEach((row, i) => {
                tableData[i] = [...row]; // 불변성을 위해
            })
            const checkAround = (row, cell) => {
                // 조건에 안맞는 애들 걸러내기
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) return;
                if(checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + 'cell');
                }
                if([CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(tableData[row][cell])) return;

                let around = [];
                if(tableData[row-1]) {
                    around = around.concat(
                        tableData[row-1][cell-1],
                        tableData[row-1][cell],
                        tableData[row-1][cell+1],
                    )
                }
                around = around.concat( // 
                    tableData[row][cell-1],
                    tableData[row][cell+1],
                )
                if(tableData[row+1]) {
                    around = around.concat(
                        tableData[row+1][cell-1],
                        tableData[row+1][cell],
                        tableData[row+1][cell+1],
                    )
                }
                const count = around.filter((v, i) => [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(v)).length;
                let near = [];
                if(tableData[row][cell] === CODE.NORMAL) openedCount++;
                tableData[row][cell] = count;

                if(count === 0) {
                    if(row > -1) {
                        if(row -1 > -1) {
                            near.push([row-1,cell-1]); // concat으로 하면 일차원 배열로 합쳐짐
                            near.push([row-1,cell]);
                            near.push([row-1,cell+1]);
                        }
                        near.push([row,cell-1]);
                        near.push([row,cell+1]);
                        if(row+1 < tableData.length) {
                            near.push([row+1,cell-1]);
                            near.push([row+1,cell]);
                            near.push([row+1,cell+1]);
                        }
                        near.forEach((n) => {
                            if(tableData[n[0]][n[1]] !== CODE.OPENED){
                                checkAround(n[0],n[1]);
                            }
                        })
                    }
                }
            }
            checkAround(action.row, action.cell);
            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                result = `${state.timer}초만에 승리하셨습니다!`
                halted = true;
            }
            return {
                ...state,
                tableData: tableData,
                openedCount: state.openedCount + openedCount,
                result: result,
                halted: halted,
            }
        }
        case CLICK_MINE:{
            const tableData = [...state.tableData];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                halted:true,
                tableData: tableData
            }
        }
        case Right_Click_Q:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]; // 포인트
            if(tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData: tableData
            }
        }
        case Right_Click_F:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData: tableData
            }
        }
        case Right_Click_N:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData: tableData
            }
        }

        case INCREMENT_TIME: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
            
        default:
            return state;
    }
}


const App = (props) => {  
    // useReducer
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;
    const value = useMemo(() => ({
        tableData,
        dispatch,
        halted
    }), [tableData, halted]);

    useEffect(() => {
        let time;
        if(halted === false) {
            time = setInterval(() => {
                dispatch({type:INCREMENT_TIME});
            }, 1000);
        }
        return () => {
            clearInterval(time);
        }  
    }, [halted])
    

    return (
        <MyContext.Provider value={value}>
            <div className='App-container'>
                <Form/>
                <div>{timer}</div>
                <Table/>
                <div>{result}</div>
            </div>
        </MyContext.Provider>
    )
}

export default App;
