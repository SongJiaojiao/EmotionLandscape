import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudMoon, faCheck, faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../Contexts/ThemeContext';
import Toggle from '../Toggle';
import loadingGif from '../../Img/loading.gif';

function Record({ handleScriptsSubmit }) {
    const { theme, toggleTheme } = useTheme();
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recording, setRecording] = useState(false);
    const [recordInput, setRecordInput] = useState(false)
    const [writeInput, setWriteInput] = useState(false)
    const [inputMethod, setInputMethod] = useState(null)
    const recognition = useRef(new window.webkitSpeechRecognition());


    recognition.current.continuous = true; // Enable continuous recognition
    recognition.current.interimResults = true; // Enable interim results

    useEffect(() => {
        if (recording && inputMethod !== 'record') {
            setInputMethod('record');
        }
    }, [recording]);

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
        toggleTheme(newTheme);
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
        if (inputMethod !== 'record') {
            setInputMethod('type');
        }
    };

    const handleTranscription = (transcription) => {
        setUserInput(transcription);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        handleScriptsSubmit(userInput);
    };

    const toggleRecording = () => {
        if (!recording) {
            recognition.current.start();
            setRecording(true);
            setRecordInput(true)
        } else {
            recognition.current.stop();
            setRecording(false);
            handleSubmit()
        }
    };

    const toggleWriteInput = () => {
        handleSubmit()
    }

    recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        handleTranscription(transcript);
        setIsLoading(false); // Hide loading icon after transcription
    };

    recognition.current.onend = () => {
        console.log('Recognition ended');
    };

    recognition.current.onerror = (event) => {
        console.error('Recognition error:', event.error);
        setIsLoading(false); // Hide loading icon on error
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
                            onChange={handleInputChange}
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

            <div style={RecordFooter}>
                {inputMethod !== 'type' &&
                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                        <button className='button-large' onClick={toggleRecording} disabled={isLoading}>
                            {recording ? (
                                <FontAwesomeIcon icon={faStop} />
                            ) : isLoading ? (
                                <img src={loadingGif} alt="Loading" style={{ width: '24px', height: '24px' }} />
                            ) : (
                                <FontAwesomeIcon icon={faMicrophone} />
                            )}
                        </button>
                    </div>}


                {userInput && !recordInput && (
                    <button className='button-large' onClick={toggleWriteInput} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                        {isLoading ? (
                            <img src={loadingGif} alt="Loading" style={{ width: '24px', height: '24px' }} />
                        ) : (
                            <FontAwesomeIcon icon={faCheck} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Record;

const RecordFooter = {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    width: "100%",
    maxWidth: '480px',
    position: "relative",
};
