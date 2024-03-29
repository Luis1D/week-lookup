import './App.css';
import React, { useState, useEffect } from 'react';
import DateContext from "./context/dateContext.js";
import EventContext from "./context/eventContext.js";
import AddEvent from './components/AddEvent.js';
import Calendar from './components/Calendar.js';
import EventFeed from './components/EventFeed.js';
import Search from './components/Search.js';

function App() {
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
  const [date, setTheDate] = useState({ value: new Date(), query: false, queryData: "" });
  const [week, setWeek] = useState(findWeek(date.value));
  const [noteProcess, setNoteProcess] = useState({ list: { title: "", description: "", category: "" }, noteInProgress: false });
  const [notesList, setNotesList] = useState([]);
  const [eventTypeStats, setEventTypeStats] = useState({ errand: [], personal: [], work: [] });
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  
  useEffect(() => {
    if (notesList.length > 0) {
      notesList.forEach(val => {
        setEventTypeStats({ errand: [...notesList.filter(e => e.type === "errand")], personal: [...notesList.filter(e => e.type === "personal")], work: [...notesList.filter(e => e.type === "work")] })
      })
    } else {
      setEventTypeStats({ errand: [], personal: [], work: [] })
    }
  }, [notesList])

  console.log(eventTypeStats);

  return (
    <DateContext.Provider value={{ date, week, setTheDate, setWeek, findWeek, months, days }}>
      <EventContext.Provider value={{ notesList, noteProcess, setNotesList, setNoteProcess }}>
        <div className="App">
          <Search />
          <Calendar />
          <AddEvent />
          <EventFeed />
        </div>
      </EventContext.Provider>
    </DateContext.Provider>
  );
}

export default App;
