import './App.css';
import React, { useState } from 'react';

function App() {
  const [date, setDate] = useState();
  const [week, setWeek] = useState();

  const findWeek = (dateInput) => {
    let firstHalf = new Date(dateInput);
    let secondHalf = new Date(dateInput);
    let dateObjHelper = new Date(dateInput);
    let count = dateObjHelper.getDay();
    let forward = [[firstHalf.toLocaleString('en-us', {
      weekday: 'long' }), firstHalf.toLocaleString()]];
    let backward = [];
    while (count > 0) {
      firstHalf.setDate(firstHalf.getDate() -1);
      backward.unshift([firstHalf.toLocaleString('en-us',
      { weekday: 'long' }), firstHalf.toLocaleString()]);
      count--;
    }
    count = dateObjHelper.getDay();
    while (count < 6) {
      secondHalf.setDate(secondHalf.getDate() + 1);
      forward.push([secondHalf.toLocaleString('en-us',
      { weekday: 'long' }), secondHalf.toLocaleString()]);
      count++;
    }
    const fullWeek = backward.concat(forward);
    return fullWeek;
  }

  const handleChange = e => {
    setDate(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    let week = findWeek(date);
    setWeek(week);
  }

  return (
    <div className="App">
      <h1>Week Lookup</h1>
      <form onSubmit={ handleSubmit }>
        <input type="text" placeholder="XX/XX/XXXX" onChange={handleChange} />
        <input type="submit"/>
      </form>
      {
        week ? week.map(day => {
          return <div key={day[1]}>
            <span>{day[0] + " - "}</span>
            <span>{day[1].split(",")[0]}</span>
          </div>
        }) : null
      }
    </div>
  );
}

export default App;
