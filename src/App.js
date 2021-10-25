import './App.css';
import React, { useState } from 'react';

function App() {
  const [date, setTheDate] = useState();
  const [week, setWeek] = useState();
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

  // const handleChange = e => {
  //   setTheDate(e.target.value);
  // }
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   let week = findWeek(date);
  //   setWeek(week);
  // }

  const defaultWeek = () => {
    let today = new Date();
    setTheDate(today);
    let currentWeek = findWeek(today)
    setWeek(currentWeek);
  }

  const nextMonth = () => {
    
  }

  const prevMonth = () => {

  }

  return (
    <div className="App">
      {/* <form onSubmit={ handleSubmit }>
        <input type="text" placeholder="XX/XX/XXXX" onChange={handleChange} className="text-input"/>
        <input type="submit" className="input-btn"/>
      </form>
      <hr /> */}
      <div className="card-wrapper">
        <div className="month-picker">
          <button className="month-picker-btn" onClick={ prevMonth }>{"<"}</button>
          { date ? <h2 className="month">{ months[date.getMonth()] + " " + date.getFullYear() }</h2> : null }
          <button className="month-picker-btn" onClick={ nextMonth }>{">"}</button>
        </div>
        <div className="card-container">
        {
          week ? week.map(day => {
            return <div key={day} className={ day.getDate() === date.getDate() ? "spot-light week-card" : "week-card" }>
              <span className="day-of-week">{ days[day.getDay()] }</span>
              <span className="date">{ day.getDate() }</span>
            </div>
          }) : defaultWeek()
        }
        </div>
      </div>
    </div>
  );
}

export default App;
