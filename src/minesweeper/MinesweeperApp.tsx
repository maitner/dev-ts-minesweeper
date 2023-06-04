import { useEffect, useReducer } from "react"
import { ActionTypes, GameData, initialState, reducer } from "./state"
import MineField from "./MineField"
import Header from "./Header"

export const localStorageKey = "minesweeper_state";


function initalizeGameState(state: GameData): GameData{

    const storedStateData = localStorage.getItem(localStorageKey);

    //in a real app, there should be some stored data versioning
    //maybe if the game is in a cleared|dead state there is no need to load
    if(storedStateData){
        return JSON.parse(storedStateData) as GameData;
    }

    return state;
}


export default function MinesweeperApp(){

    const [state,dispatch] = useReducer( reducer, initialState(), initalizeGameState )

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
    }, [state]);

    function handleFieldSweep(id:number){
        dispatch( {type: ActionTypes.FieldSweep, fieldId:id} )
    }

    function handleFieldFlag(id:number){
        dispatch( {type:ActionTypes.FieldFlag,fieldId:id} )
    }

    function handleReset(){
        dispatch( {type:ActionTypes.Reset} )
    }

    let flagCount = 0;

    for( let f of state.fields ){
        if(f.hasFlag){
            flagCount++;
        }
    }

    return (<div className="game">
        <Header 
            handleReset={handleReset}
            mineCount={state.mineCount}
            flagCount={flagCount}
            gameState={state.gameState}
            timeStampStart={state.timeStampStart}
            timeStampEnd={state.timeStampEnd}
        />
        <MineField
            sizeX={state.sizeX}
            sizeY={state.sizeY}
            fields={state.fields}
            gameState={state.gameState}
            handleFieldSweep={handleFieldSweep}
            handleFieldFlag={handleFieldFlag}            
        />
    </div>)
}