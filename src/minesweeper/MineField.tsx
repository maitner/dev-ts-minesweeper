import { ReactNode } from "react";
import { GameField, GameState } from "./state";
import MineFieldRow from "./MineFieldRow";

export interface MineFieldProps{
    sizeX: number,
    sizeY: number,
    fields: GameField[],
    gameState: GameState,
    handleFieldSweep: (id:number) => void,
    handleFieldFlag: (id:number) => void,    

}

export default function MineField( {sizeX,sizeY,fields,gameState,handleFieldSweep,handleFieldFlag}: MineFieldProps ){

    const rows: ReactNode[] = [];

    for( let y = 0; y < sizeY; y++){
        const row = [];
        for( let x = 0; x < sizeX; x++){
            const field = fields[ (y * sizeY + x) ];
            row.push( field )
        }

        rows.push( <MineFieldRow
                key={"row_" + y} 
                fields={row}
                gameState={gameState}
                handleFieldSweep={handleFieldSweep}
                handleFieldFlag={handleFieldFlag}
            ></MineFieldRow> );
    }

    return (<div className="fields">{ rows }</div>)
}