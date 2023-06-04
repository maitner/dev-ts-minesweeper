import { ReactNode } from "react";
import { GameField, GameState } from "./state";
import { IconFlag, IconMine } from "./IconsLib";

export interface MineFieldCellProps {
    field: GameField,
    gameState: GameState,
    handleFieldSweep: (id:number) => void,
    handleFieldFlag: (id:number) => void,    
}

export function MineFieldCell({field,gameState,handleFieldSweep,handleFieldFlag}:MineFieldCellProps){

    let content: ReactNode = "";

    const fieldClass = ["field"];

    if( field.sweeped ){
        if( field.hasMine ){
            fieldClass.push( "field-sweeped-mine" );
        } else if ( field.adjacentMines > 0 ) {
            fieldClass.push( "field-sweeped-adjacent" );
        } else {
            fieldClass.push( "field-sweeped-empty" );
        }
    } else {
        fieldClass.push( "field-unsweeped" );
    }


    if( field.sweeped ){
        if( field.hasMine ){
            content = <IconMine />;
        } else if ( field.adjacentMines > 0 ) {
            content = field.adjacentMines;
        }
    } else {
        if(field.hasFlag){
            content = <IconFlag />
        }
    }

    //when game is finished and player foubnd all mines show mine in every uncleared field
    if( gameState == GameState.Cleared && !field.sweeped && field.hasMine ){
        content = <IconMine />;
    }

    function handleOnClick(){
        handleFieldSweep(field.id)
    }

    function handleOnContextMenu(e: React.SyntheticEvent){
        e.preventDefault();
        handleFieldFlag(field.id)
    }

    return  <div className={ fieldClass.join(" ") } onClick={handleOnClick} onContextMenu={handleOnContextMenu}>{content}</div>

    return <div></div>
}