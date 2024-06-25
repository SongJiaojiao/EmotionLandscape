import React, { useEffect, useState,useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import History from './History';
import { HistoryContext } from '../../Contexts/Context';
import { AuthUser } from '../../Contexts/Context';




function Result({updateshowHistory}) {
    const { history, updateHistory } = useContext(HistoryContext);
    const { authUser } = useContext(AuthUser);
    const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;
    const [fetchSuccess, setFetchSuccess] = useState(false)


    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/get_transcripts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: authUser.email })
                
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            updateHistory(jsonData)
            setFetchSuccess(true)
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
            fetchData();

    }, []); 

    useEffect(() => {
    }, [history]); 


    return (

        <div style={{ width: "100%", maxWidth: '600px', paddingTop: '0' }}>
            <History history={history} />
        </div>



    );
}


export default Result