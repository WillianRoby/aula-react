import React from "react";
import { TimerBox } from "./TimerBox";
import './Timer.css';

export function Timer(props) {

    return(
        <div className="timer">
            <h3>{props.message}</h3>
            <div className="timer-content">
                <TimerBox title="Ano" value={props.year}/>
                <TimerBox title="Meses" value={props.month}/>
                <TimerBox title="Dias" value={props.day}/>
                <TimerBox title="Horas" value={props.hour}/>
                <TimerBox title="Minutos" value={props.minute}/>
                <TimerBox title="Segundos" value={props.second}/>
            </div>
        </div>
    )

}