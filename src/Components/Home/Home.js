import { useContext } from 'react'
import Record from './Record';
import { HistoryContext } from '../../Contexts/historyContext';
import { AuthUser } from '../../Contexts/userContext';
import { useNavigate } from 'react-router-dom';
import Aquarium from './Aquarium';

export default function Home() {
    const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;
    const { fetchData,fetchAquariumData,updateAquariumData} = useContext(HistoryContext);
    const navigate = useNavigate();
    const { authUser } = useContext(AuthUser);
    const timestamp = new Date().toISOString();

    const save_transcript = async (userInput) => {
        try {

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
            await updateAquariumData(authUser.email)
            await fetchAquariumData(authUser.email)

        } catch (error) {
            console.error('An error occurred:', error);
        }

    };


    const handleScriptsSubmit = async (userInput) => {
        sessionStorage.setItem('userTranscript', userInput);
        await save_transcript(userInput);

    };

    const updateTest = () =>{
        updateAquariumData(authUser.email)
    }



    return (
        <div className='container'>
            {/* <button onClick={updateTest}>udoate aquarium data</button> */}
            <Aquarium />
            <Record handleScriptsSubmit={handleScriptsSubmit} />
        </div>
    );
}


