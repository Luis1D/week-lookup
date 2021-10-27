import React, { useContext } from 'react';
import DateContext from "../context/dateContext.js";

const Search = () => {
    const { date, setTheDate, setWeek, findWeek } = useContext(DateContext)

    const handleChange = e => {
        setTheDate({ value: date.value, query: false, queryData: e.target.value });
    }
    const handleSubmit = e => {
        e.preventDefault();
        setTheDate({ value: new Date(date.queryData), query: true });
        let weekToUse = findWeek(date.value);
        setWeek(weekToUse);
    }
    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <input type="text" placeholder="Search.." onChange={handleChange} className="text-input"/>
                <button type="submit" className="input-btn">Search</button>
            </form>     
        </div>
    )
}

export default Search;