import './App.css';
import React, { useState } from 'react';

function App() {
  const [date, setTheDate] = useState({ value: new Date(), query: false, queryData: "" });
  const [week, setWeek] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const findWeek = (dateInput) => {
    let dateObj = new Date(dateInput);
    let lastDay = new Date(dateObj.setFullYear(dateObj.getFullYear(), dateObj.getMonth() + 1, 0));
    let count = 1;
    let monthArr = [];
    while (count <= lastDay.getDate()) {
      let dayInFocus = new Date(dateObj.setFullYear(dateObj.getFullYear(), dateObj.getMonth(), count)); 
      monthArr.push(dayInFocus)
      count++;
    }
    return monthArr;
  }

  const handleChange = e => {
    setTheDate({ value: date.value, query: false, queryData: e.target.value });
  }
  const handleSubmit = e => {
    e.preventDefault();
    setTheDate({ value: new Date(date.queryData), query: true });
    let week = findWeek(date.value);
    setWeek(week);
  }

  const defaultWeek = () => {
    let currentWeek = findWeek(date.value)
    setWeek(currentWeek);
  }

  const nextMonth = () => {
    const month = new Date(date.value.setFullYear(date.value.getFullYear(), date.value.getMonth() + 1, 1))
    setTheDate(month);
    let week = findWeek(month);
    setWeek(week);
  }
  const prevMonth = () => {
    const month = new Date(date.value.setFullYear(date.value.getFullYear(), date.value.getMonth() - 1, 1))
    setTheDate(month);
    let week = findWeek(month);
    setWeek(week);
  }

  const dateSelectionStyles = day => {
    if (day.getDate() === date.value.getDate()) {
      return "spot-light week-card";
    }
    return "week-card";
  }
  
  return (
    <div className="App">
      <form onSubmit={ handleSubmit }>
        <input type="text" placeholder="Lookup a date.." onChange={handleChange} className="text-input"/>
        <input type="submit" className="input-btn"/>
      </form>
      <div className="card-wrapper">
        <div className="month-picker">
          <button className="month-picker-btn" onClick={ prevMonth }>{"<"}</button>
          { date.value ? <h2 className="month">{ months[date.value.getMonth()] + " " + date.value.getFullYear() }</h2> : null }
          <button className="month-picker-btn" onClick={ nextMonth }>{">"}</button>
        </div>
        <div className="card-container">
        {
          week || date.query ? week.map(day => {
            return <div 
              key={day} 
              className={ dateSelectionStyles(day) }
              onClick={ () => setTheDate({ value: day }) }
              >
              <span className="day-of-week">{ days[day.getDay()] }</span>
              <span className="date">{ day.getDate() }</span>
            </div>
          }) : defaultWeek()
        }
        </div>
      </div>
      <div className="date-details">
        {
          date.value ? <div>
            <h3>{ days[date.value.getDay()] + " " + months[date.value.getMonth()] + " " + date.value.getDate() + " " + date.value.getFullYear() }</h3> 
          </div> : null
        }
      </div>
    </div>
  );
}

export default App;
