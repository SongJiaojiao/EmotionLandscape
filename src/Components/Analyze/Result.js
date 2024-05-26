import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import History from './History';



function Result({ updateshowResult }) {
    const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;
    const [fetchSuccess, setFetchSuccess] = useState(false)

    const getArrayFromSessionStorage = (key) => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? storedValue.split(',') : [];
    };

    const [history, setHistory] = useState(() => sessionStorage.getItem('history') || '');


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
            setFetchSuccess(true)
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        if (history.length === 0) { // Fetch data only if history is empty
            fetchData();
        }
    }, [history]);


    return (

        <div style={{ width: "100%", maxWidth: '600px',paddingTop:'0'}}>

            <History history={history} fetchSuccess={fetchSuccess} />
            <div >
                <button className="button-large" style={{width:'100%'}}onClick={updateshowResult}>Add Another Thought <FontAwesomeIcon icon={faArrowRight} />  </button>
            </div>

        </div>



    );
}


export default Result