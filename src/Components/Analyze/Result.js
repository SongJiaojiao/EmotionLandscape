import React, { useEffect, useState } from 'react';
import EmotionTag from './EmotionTag';
import ThemeTag from './ThemeTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import History from './History';



function Result({updateAnalysisReady }) {
    const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;

    const [history, setHistory] = useState([]);
    console.log('history',history)

    const fetchData = async () => {
        try {
            
            const response = await fetch(`${API_URL}/get_transcripts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setHistory(jsonData);
            console.log('jsonData', jsonData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);  




    return (

        <div>
            <div >
                <button className="button-medium-secondary" onClick={updateAnalysisReady} > <FontAwesomeIcon icon={faArrowLeft} /> </button>
            </div>
            <History history= {history} />
           
        </div>



    );
}


export default Result