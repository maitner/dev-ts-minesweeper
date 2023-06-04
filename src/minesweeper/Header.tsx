import { useEffect, useState } from "react";
import { IconReset } from "./IconsLib";
import { GameState } from "./state"

export interface HeaderProps {
    gameState: GameState,
    handleReset: () => void,
    mineCount: number,
    flagCount: number,
    timeStampStart: null | number,
    timeStampEnd: null | number
}

export default function Header({gameState,handleReset,mineCount,flagCount,timeStampStart,timeStampEnd}:HeaderProps){

    const flags = (mineCount - flagCount);

    const [now,setNow] = useState( Date.now() );

    //when game is running initalize setinterval and refresh counter every 250ms 
    useEffect(() => {
        if( gameState == GameState.Running ){
            const interval = setInterval(() => {
                setNow( _n => Date.now() );
            }, 250);
            return () => clearInterval(interval);
        }
    }, [gameState]);
    

    let time = 0;

    if( gameState == GameState.Running ){
        if(timeStampStart !== null){
            time = Math.floor( (now - timeStampStart) / 1000 );
        }
    } else if( gameState == GameState.Cleared || gameState == GameState.Dead ){
        if( timeStampEnd !== null && timeStampStart !== null ){
            time = Math.floor( (timeStampEnd - timeStampStart) / 1000 );
        }
    }
    
    //time can be -1 when now is smaller then start timestamp and that can happen because of state managemnet fun; smooths the start
    time = Math.max(time,0);

    return <div className="header">
        <div className="header-flags">{flags}</div>
        <div className="header-reset"><button onClick={handleReset}><IconReset/></button></div>
        <div className="header-time">{time}</div>
    </div>
}