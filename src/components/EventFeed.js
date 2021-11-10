import React, { useContext, useState } from 'react';
import DateContext from "../context/dateContext.js";
import EventContext from "../context/eventContext.js";

const EventFeed = () => {
    const { date, months } = useContext(DateContext)
    const { notesList, setNotesList } = useContext(EventContext);

    const deleteNote = id => {
        let filteredList = notesList.filter(note => {
          return note.id !== id;
        })
        setNotesList(filteredList);
    }

    return (
        <div>
            {
                date.value ? <div className="events">
                    <h3>{`All events for ${months[date.value.getMonth()]}`}</h3>
                    {
                        notesList.length > 0 ?
                        notesList.map(note => {
                        if (note.date.value.getMonth() === date.value.getMonth()) {
                            return <div key={ note.id } className="notes-details-container">
                                <div className="title-desc">
                                    <div className="title-status-container">
                                        <span className={ note.category + " feed-status"}></span>
                                        <span className="title">{ note.title }</span>
                                    </div>
                                    <span className="date">{ note.date.value.toLocaleString().split(",")[0] }</span>
                                    <span className="description">{ note.description }</span>
                                </div>
                                <div className="date-delete-container" onClick={ () => deleteNote(note.id) }>X</div>
                            </div>
                        }
                        return <div key={ Math.random() }>No events found..</div>
                        }) : <div key={ Math.random() }>No events found..</div>
                    }
                </div> : null
            }
        </div>
    )
}

export default EventFeed;