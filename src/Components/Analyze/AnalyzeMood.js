import { useContext, useState } from 'react'
import Record from './Record';
import Result from './Result';

export default function AnalyzeMood() {

    const getArrayFromSessionStorage = (key) => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? storedValue.split(',') : [];
    };

    const [userTranscript, setuserTranscript] = useState(() => sessionStorage.getItem('userTranscript') || '');
    const actionList = ['Down regulating Breath work', 'Listen to your favorite calming song']
    const [emotions, setEmotions] = useState(() => getArrayFromSessionStorage('emotions'));

    const [themes, setThemes] = useState(() => getArrayFromSessionStorage('themes'));
    const [valenceList, setValenceList] = useState(() => getArrayFromSessionStorage('valenceList'));
    const [arousalList, setArousalList] = useState(() => getArrayFromSessionStorage('arousalList'));
    const timestamp = new Date().toISOString();
    const [analysisReady, setAnalysisReady] = useState(() => sessionStorage.getItem('analysisReady') || false);
    const [historyReady, setHistoryReady] = useState(() => sessionStorage.getItem('historyReady') || false);
    const [history, setHistory] = useState([])
  


    const save_transcript = async (userInput) => {
        try {
            console.log('userTranscript in api', userInput, typeof (userInput));

            const response = await fetch(`http://127.0.0.1:5000/save_transcript`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
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
            setAnalysisReady(true);
            sessionStorage.setItem('analysisReady', true)
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


    const updateAnalysisReady = () => {
        if (analysisReady) {
            setAnalysisReady('');
            sessionStorage.setItem('analysisReady', '');
        }

    }




    return (

        <div className='container' >

            {!analysisReady ? (

                <Record handleScriptsSubmit={handleScriptsSubmit} />
            ) : (
                <Result
                    emotionList={emotions}
                    themeList={themes}
                    analysis={userTranscript}
                    actionList={actionList}
                    valenceList={valenceList}
                    arousalList={arousalList}
                    updateAnalysisReady={updateAnalysisReady}
                    history = {history}

                />
            )}
        </div>


    );
}


