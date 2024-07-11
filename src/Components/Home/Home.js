import { useContext, useState, useEffect } from 'react'
import Record from './Record';
import { AuthUser } from '../../Contexts/Context';
import { HistoryContext } from '../../Contexts/Context';
import { useNavigate } from 'react-router-dom';
import Aquarium from './Aquarium';

export default function Home() {

    const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;
    const { history, updateHistory, fetchData, fetchCoordinate } = useContext(HistoryContext);
    const navigate = useNavigate();
    const { authUser } = useContext(AuthUser);
    const [userTranscript, setuserTranscript] = useState(() => sessionStorage.getItem('userTranscript') || '');
    const timestamp = new Date().toISOString();

    const save_transcript = async (userInput) => {
        try {
            // console.log('userTranscript in api', userInput, 'usermail from save scripts', authUser.email);

            const response = await fetch(`${API_URL}/save_transcript`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    transcript: userInput,
                    timestamp,
                    email: authUser.email
                })
            });

            if (!response.ok) {
                throw new Error('Failed to request help from the backend');
            }
            const data = await response.json();
            await fetchData(authUser.email);
            navigate('/memories'); // Navigate to Memories after fetching data


        } catch (error) {
            console.error('An error occurred:', error);
        }

    };


    const handleScriptsSubmit = async (userInput) => {
        sessionStorage.setItem('userTranscript', userInput);
        setuserTranscript(userInput);
        await save_transcript(userInput);

    };


    return (
        <div className='container'>
            <Aquarium />
            <Record handleScriptsSubmit={handleScriptsSubmit} />

        </div>
    );
}


