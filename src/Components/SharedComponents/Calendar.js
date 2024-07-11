import React, { useState, useContext } from 'react';
import { ThemeProvider, AuthUser } from '../../Contexts/Context';

const Calendar = ({ options, selectedValue, setSelectedValue, storageKey}) => {
    const handleClick = (value) =>{
        setSelectedValue(value); 
    }
    const calendarContainer = {
        display:'flex',
        gap:'8px',
        

    }


    return (
        <div style={calendarContainer}>
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`button-small-subtle ${option.value === selectedValue ? 'selected' : ''}`}
                    onClick = {()=>handleClick(option.value)}
                    
                > 
                    {option.text}
                </button>
            ))}
        </div>
    );
};

export default Calendar;