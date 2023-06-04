import { MineFieldCell } from "./MineFieldCell";
import { GameField, GameState } from "./state";

export interface MineFieldRowProps {
    fields: GameField[],
    gameState: GameState,
    handleFieldSweep: (id:number) => void,
    handleFieldFlag: (id:number) => void,    
}

export default function MineFieldRow( {fields, gameState, handleFieldSweep, handleFieldFlag}: MineFieldRowProps ){


    return <div className="fieldrow" >{fields.map( f => <MineFieldCell key={f.id} field={f}  gameState={gameState} handleFieldSweep={handleFieldSweep} handleFieldFlag={handleFieldFlag} /> )}</div>
}