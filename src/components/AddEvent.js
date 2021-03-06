import React, { useContext } from 'react';
import DateContext from "../context/dateContext.js";
import EventContext from "../context/eventContext.js";

const AddEvent = () => {
    const { date, months, days } = useContext(DateContext)
    const { notesList, noteProcess, setNotesList, setNoteProcess } = useContext(EventContext);

    const addNote = (e) => {
        let time = new Date();
        let timeCreated = time.toLocaleTimeString("en-US");  
        const value = e.target.value;
        setNoteProcess({
          list: {
            ...noteProcess.list,
            [e.target.name]: value,
            date: date,
            time: timeCreated,
            category: [e.target.type === "radio" ? e.target.value : ""],
            id: Math.random()
          },
          noteInProgress: true
        })
      }
      const submitNote = e => {
        e.preventDefault()
        setNotesList([...notesList, noteProcess.list]);
        setNoteProcess({ 
          list: {
            title: "",
            description: ""
          },
          noteInProgress: !noteProcess.noteInProgress  
        })
      }
      const cancelNote = () => {
        setNoteProcess({ 
          list: {
            title: "",
            description: ""
          },
          noteInProgress: !noteProcess.noteInProgress  
        })
      }

    return (
        <div className="date-details">
        <div className="wrapper">
          {
            date.value ? <div>
              <h3>{ days[date.value.getDay()] + " " + months[date.value.getMonth()] + " " + date.value.getDate() + " " + date.value.getFullYear() }</h3> 
            </div> : null
          }
          {
            noteProcess.noteInProgress ? <div className="note-actions">
              <span className="submit-note" onClick={ submitNote }>Submit</span>
              <span className="cancel-note" onClick={ cancelNote }>X</span>
            </div>
            : <img src="../add.png" alt="Add Event" className="btn" onClick={ () => setNoteProcess({list: noteProcess.list, noteInProgress: true }) } />
          }
        </div>
        {
          noteProcess.noteInProgress ? 
          <form className="note-form">
            <input name="title" value={ noteProcess.list.title } type="text" placeholder="Title" onChange={ addNote }/>
            <textarea name="description" value={ noteProcess.list.description } type="text" placeholder="Description" onChange={ addNote }/>
            <div className="checkbox-container">
              <label className="radio-btn work-input">
                <input type="radio" name="type" value="work" onChange={ addNote } />
                Work
              </label>
              <label className="radio-btn personal-input">
                <input type="radio" name="type" value="personal" onChange={ addNote } />
                Personal
              </label>
              <label className="radio-btn errand-input">
                <input type="radio" name="type" value="errand" onChange={ addNote } />
                Errand
              </label>
            </div>
          </form>
          : null
        }
      </div>
    )
}

export default AddEvent;