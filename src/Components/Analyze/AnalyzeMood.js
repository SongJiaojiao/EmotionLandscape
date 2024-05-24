import { useContext, useState } from 'react'
import Record from './Record';
import Result from './Result';
import SingleAnalysis from './SingleAnalysis';

export default function AnalyzeMood() {

    const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;


    const getArrayFromSessionStorage = (key) => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? storedValue.split(',') : [];
    };

    const [userTranscript, setuserTranscript] = useState(() => sessionStorage.getItem('userTranscript') || '');
    const [emotions, setEmotions] = useState(() => getArrayFromSessionStorage('emotions'));

    const [themes, setThemes] = useState(() => getArrayFromSessionStorage('themes'));
    const [valenceList, setValenceList] = useState(() => getArrayFromSessionStorage('valenceList'));
    const [arousalList, setArousalList] = useState(() => getArrayFromSessionStorage('arousalList'));
    const timestamp = new Date().toISOString();
    const [showResult, setshowResult] = useState(() => sessionStorage.getItem('showResult') || false);

    const save_transcript = async (userInput) => {
        try {
            console.log('userTranscript in api', userInput);

            const response = await fetch(`${API_URL}/save_transcript`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ transcript: userInput, timestamp })
            });
            console.log('responseUI ', response);

            if (!response.ok) {
                throw new Error('Failed to request help from the backend');
            }
            const data = await response.json();
            setEmotions(data.emotions)
            setThemes(data.themes)
            setArousalList(data.arousal)
            setValenceList(data.valence)
            setshowResult(true);
            sessionStorage.setItem('showResult', true)
            sessionStorage.setItem('emotions', data.emotions)
            sessionStorage.setItem('themes', data.themes)
            sessionStorage.setItem('arousalList', data.arousal)
            sessionStorage.setItem('valenceList', data.valence)

        } catch (error) {
            console.error('An error occurred:', error);
        }

    };
    
    

    const handleScriptsSubmit = async (userInput) => {
        sessionStorage.setItem('userTranscript', userInput);
        setuserTranscript(userInput);
        await save_transcript(userInput);
       

    };


    const updateshowResult = () => {
        if (showResult) {
            setshowResult('');
            sessionStorage.setItem('showResult', '');
        }

    }




    return (

        <div className='container' >

            {!showResult ? (

                <Record handleScriptsSubmit={handleScriptsSubmit} />
            ) : (

                <Result

                    updateshowResult={updateshowResult}


                />
            )}
        </div>


    );
}


