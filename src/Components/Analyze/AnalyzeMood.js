import { useContext, useState } from 'react'
import Record from './Record';
import SingleAnalysis from './SingleAnalysis';


export default function AnalyzeMood() {
    const [userTranscript, setuserTranscript] = useState(() => sessionStorage.getItem('userTranscript') || '');
    const actionList = ['Down regulating Breath work', 'Listen to your favorite calming song']
    const [emotions, setEmotions] = useState([])
    const [themes, setThemes] = useState([])
    const [valenceList,setValenceList] = useState([])
    const [arousalList,setArousalList] = useState([])
    const timestamp = new Date().toISOString();
    const [analysisReady, setAnalysisReady] = useState(false);


    const save_transcript = async (userInput) => {
        try {
            console.log('userTranscript in api', userInput);
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
            console.log('emotions',data.emotions,'themes',themes, 'transcript',data.transcript,'analysis',data.analysis,'valence',data.valence,'arousal',data.arousal)
            setEmotions(data.emotions)
            setThemes(data.themes)
            setArousalList(data.arousal)
            setValenceList(data.valence)
            setAnalysisReady(true);

        } catch (error) {
            console.error('An error occurred:', error);
        }

    };

    const handleScriptsSubmit = (userInput) => {
        sessionStorage.setItem('userTranscript', userInput);
        setuserTranscript(userInput); //This would not show the latest value until next render cycle
        save_transcript(userInput);  // Pass the userInput directly
    };





    return (

        <div className='container'>
                      {!analysisReady ? (
                <Record handleScriptsSubmit={handleScriptsSubmit} />
            ) : (
                <SingleAnalysis
                    emotionList={emotions}
                    themeList={themes}
                    analysis={userTranscript} // Assuming userTranscript is used for analysis
                    actionList={actionList}
                    valenceList={valenceList}
                    arousalList={arousalList}
                    

                   
                />
            )}
        </div>


    );
}


