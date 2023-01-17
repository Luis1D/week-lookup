import React, { useContext } from 'react';
import DateContext from "../context/dateContext.js";
import EventContext from "../context/eventContext.js";

const Calendar = () => {
    const { date, week, setTheDate, setWeek, findWeek, months, days } = useContext(DateContext)
    const { notesList } = useContext(EventContext);

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
                            notesList.length > 0 ? notesList.map(note => {
                                if (note.date.value.getDate() === day.getDate() && note.date.value.getMonth() === day.getMonth() && note.date.value.getFullYear() === day.getFullYear()) {
                                    return <span key={ note.id } className={ note.category + " calendar-status" }></span>
                                }
                            })
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