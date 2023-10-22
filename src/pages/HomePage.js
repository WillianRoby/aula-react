import React, {useState, useEffect} from "react";
import { Timer } from "./Timer";
import { PageHeader } from "./PageHeader";
import './HomePage.css'

const DEFAULT_TIMER = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
}

export function HomePage() {

    const [title, setTitle] = useState('AULA AO VIVO')
    const [subtitle, setSubTitle] = useState('ReactJS - Primeiros Passos')
    const [message, setMessage] = useState('A aula começa em')
    const [endDate, setEndDate] = useState(new Date(2023, 9, 21, 18, 25, 0, 0));
    const [time, setTime] = useState(calcTime(endDate));
    const [tick, setTick] = useState(null);

    function calcTime(endDate) {
        const currentDate = new Date();

        let year = 0;
        if(endDate.getFullYear() > currentDate.getFullYear()) {
            year = endDate.getFullYear() - currentDate.getFullYear();
        }

        if(year < 0) {
            return DEFAULT_TIMER;
        }

        let month = endDate.getMonth() - currentDate.getMonth();

        if(month < 0) {
            month+= 12;
            year--;
        }

        if(month < 0){
            return DEFAULT_TIMER;
        }

        let day = endDate.getDate() - currentDate.getDate();
        if(day < 0) {
            day+= 30;
            month--;
        }
        
        if(day < 0) {
            return DEFAULT_TIMER;
        }

        let hour = endDate.getHours() - currentDate.getHours();
        if(hour < 0) {
            hour+= 24;
            day--;
        }

        let minute = endDate.getMinutes() - currentDate.getMinutes();
        if(minute < 0) {
            minute+= 60;
            hour--;
        }

        let second = endDate.getSeconds() - currentDate.getSeconds();
        if(second < 0) {
            second+= 60;
            minute--;
        }

        const timer = {
            year,
            month,
            day,
            hour,
            minute,
            second
        }
        
        return timer;

    }

    useEffect(() => {

        const {year, month, day, hour, minute, second} = time;
        if(year >= 0 && month >=0 && day >= 0 && hour >= 0 && minute >= 0 && second > 0){
            const tick = setInterval(() => {
                const time = calcTime(endDate);
                setTime(time);
            }, 1000);
            setTick(tick)
        }
        else{
            setTime(DEFAULT_TIMER);
        }

    },[])

    useEffect(() => {
        const {year, month, day, hour, minute, second} = time;
        if(year <= 0 && month <=0 && day <= 0 && hour <= 0 && minute <= 0 && second <= 0){
            window.clearInterval(tick);
        }
    
    },[time])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/data.json');
            if(response.ok){
                const data = await response.json();
                setTitle(data.title);
                setSubTitle(data.subtitle);
                setMessage(data.message);
            }
        }
        fetchData();
    })

    const {year, month, day, hour, minute, second} = time;

    return (
        <div className="page">
            <PageHeader
                title={title}
                subtitle={subtitle}
            />
            <Timer
                message={message}
                year={year}
                month={month}
                day={day}
                hour={hour}
                minute={minute}
                second={second}
            />
        </div>
    )
}