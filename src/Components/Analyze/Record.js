import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSun, faCloudMoon } from '@fortawesome/free-solid-svg-icons';
import { AuthUser, useTheme } from '../../Contexts/ThemeContext';
import Toggle from '../Toggle';
import AudioRecorder from './AudioRecorder';


function Record({ handleScriptsSubmit, setTranscript }) {
    const { theme, toggleTheme } = useTheme()
    const [userInput, setUserInput] = useState('');

    const options = [
        {
            icon: faSun,
            text: "Day",
            value: "light"
        },
        {
            icon: faCloudMoon,
            text: "Dream",
            value: "dark"
        }
    ];

    const handleThemeChange = (newTheme) => {
        toggleTheme(newTheme)
    };

    const handleTranscription = (transcription) => {
        setUserInput(transcription);

    };


    return (
        <div className="recordPage">
            <Toggle options={options} selectedValue={theme} setSelectedValue={handleThemeChange} storageKey={"theme"} />
            <div className='interactionArea'>
                {theme === 'light' ?
                    (
                        <textarea
                            autoFocus
                            className="textArea"
                            placeholder="What's on your mind today?"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                    )
                    : (
                        <textarea
                            autoFocus
                            className="textArea"
                            placeholder="What did you dream?"
                        />
                    )
                }
            </div>

            <div className='RecordFooter' >
                <AudioRecorder onTranscription={handleTranscription} handleScriptsSubmit={handleScriptsSubmit} />
                <button className='button-large' onClick={() => handleScriptsSubmit(userInput)} disabled={!userInput}>Done</button>
            </div>

        </div>

    );
}


export default Record
