import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

function AudioRecorder({ onTranscription}) {
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const [transcript, setTranscript] = useState('');
    const recognition = useRef(new window.webkitSpeechRecognition());

    recognition.current.continuous = true; // Enable continuous recognition
    recognition.current.interimResults = true; // Enable interim results

    const toggleRecording = () => {
        if (!recording) {
            recognition.current.start();
            setRecording(true);
        } else {
            recognition.current.stop();
            setRecording(false);
        }
    };

    recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        setTranscript(transcript);
        onTranscription(transcript);
    };

    recognition.current.onend = () => {
        console.log('Recognition ended');
    };

    recognition.current.onerror = (event) => {
        console.error('Recognition error:', event.error);
    };

    return (
        <div>
            <button className='button-large' onClick={toggleRecording}>
                <FontAwesomeIcon icon={recording ? faStop : faPlay} /> {recording ? 'Stop' : 'Speak'}
            </button>
            {/* {transcript && <p>Transcript: {transcript}</p>} */}
        </div>
    );
}

export default AudioRecorder;
