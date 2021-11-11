import React, { useContext, useEffect, useState } from 'react';
import DateContext from "../context/dateContext.js";
import EventContext from "../context/eventContext.js";

const Calendar = () => {
    const { date, week, setTheDate, setWeek, findWeek, months, days } = useContext(DateContext)
    const { notesList, eventTypeStats } = useContext(EventContext);
    const [eventOnDay, setEventOnDay] = useState([]);

    const nextMonth = () => {
        let dateRef = new Date(date.value);
        const month = new Date(dateRef.setFullYear(dateRef.getFullYear(), dateRef.getMonth() + 1, 1))
        setTheDate({ value: month });
        let weekToUse = findWeek(month);
        setWeek(weekToUse);
    }
    const prevMonth = () => {
        let dateRef = new Date(date.value);
        const month = new Date(dateRef.setFullYear(dateRef.getFullYear(), dateRef.getMonth() - 1, 1))
        setTheDate({ value: month });
        let weekToUse = findWeek(month);
        setWeek(weekToUse);
    }
    const dateSelectionStyles = day => {
        if (day.getDate() === date.value.getDate()) {
          return "spot-light week-card";
        }
        return "week-card";
    }

    const handleEventData = (day) => {
        let data = [];
        for (let eventType in eventTypeStats) {
            let eventTypeList = eventTypeStats[eventType];
            eventTypeList.forEach(val => {
                if (val.date.value.getDate() === day.getDate()) {
                    data.push(val)
                }
            });
        }
        if (data.length > 0) {
            return data.map(val => <span key={ val.id } className={ val.category + " calendar-status" }></span>)
        }
    }

    useEffect(() => {
        setEventOnDay(notesList);
    }, [notesList])

    return (
        <div className="card-wrapper">
            <div className="month-picker">
            <button className="month-picker-btn" onClick={ prevMonth }>{"<"}</button>
            { date.value ? <h2 className="month">{ months[date.value.getMonth()] + " " + date.value.getFullYear() }</h2> : null }
            <button className="month-picker-btn" onClick={ nextMonth }>{">"}</button>
            </div>
            <div className="card-container">
            {
            week || date.query ? week.map(day => {
                return <div key={day} className={ dateSelectionStyles(day) } onClick={ () => setTheDate({ value: day }) }>
                    <div className="day-container">
                        <span className="day-of-week">{ days[day.getDay()] }</span>
                        <span className="date">{ day.getDate() }</span>
                    </div>

                    <div className="status-container">
                        {
                            eventOnDay.length > 0 ? handleEventData(day)
                            : null
                        }
                    </div>

                </div>
            }) : null
            }
            </div>
        </div>
    )
}

export default Calendar;