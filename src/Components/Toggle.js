import React, { useState, useContext } from 'react';
import { ThemeProvider, AuthUser } from '../Contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Toggle = ({ options, selectedValue, setSelectedValue, storageKey}) => {
    const handleClick = (value) =>{
        setSelectedValue(value); 
    }


    return (
        <div className="toggle-container">
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`button-medium-secondary ${option.value === selectedValue ? 'selected' : ''}`}
                    onClick = {()=>handleClick(option.value)}
                    
                >  <FontAwesomeIcon icon={option.icon}/>
                    {option.text}
                </button>
            ))}
        </div>
    );
};

export default Toggle;