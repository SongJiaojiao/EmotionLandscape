import React, { useState, useContext } from 'react';
import { ThemeProvider, AuthUser } from '../Contexts/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tabs = ({ options, selectedValue, setSelectedValue, storageKey }) => {
    const handleClick = (value) => {
        setSelectedValue(value);
    }


    return (
        <div className="toggle-container">
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`button-medium-secondary ${option.value === selectedValue ? 'selected' : ''}`}
                    onClick={() => handleClick(option.value)}

                >  {option.icon && <FontAwesomeIcon icon={option.icon} />}
                    {option.text}
                </button>
            ))}
        </div>
    );
};

export default Tabs;