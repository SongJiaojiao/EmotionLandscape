import { useContext, useState, useEffect } from 'react'
import Record from './Record';
import History from './History';
import Tabs from '../Tabs';
import EmotionChart from './EmotionChart';
import { AuthUser } from '../../Contexts/Context';
import { HistoryContext } from '../../Contexts/Context';
import { SignOutButton } from "@clerk/clerk-react";
import Aquarium from './Aquarium';

export default function AnalyzeMood() {

    const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;
    const { history, updateHistory } = useContext(HistoryContext);
    console.log('history',history,history.length)
    const { authUser } = useContext(AuthUser);
    console.log(authUser)
    const [userTranscript, setuserTranscript] = useState(() => sessionStorage.getItem('userTranscript') || '');
    const [currentTab, setCurrentTab] = useState(() => sessionStorage.getItem('currentTab') || 'Journal');
    const timestamp = new Date().toISOString();
    const navOptions = [
        {
            text: 'Home',
            value: 'Home'
        },
        {
            text: 'Memories',
            value: 'Memories'
        },
        {
            text: 'Analysis',
            value: "Analysis"
        }
    ]


    const save_transcript = async (userInput) => {
        try {
            console.log('userTranscript in api', userInput, 'usermail from save scripts', authUser.email);

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
            fetchData();


        } catch (error) {
            console.error('An error occurred:', error);
        }

    };

    const fetchData = async () => {
        try {
            console.log('call fetch data api','email', authUser.email);
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
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };



    const handleScriptsSubmit = async (userInput) => {
        sessionStorage.setItem('userTranscript', userInput);
        setuserTranscript(userInput);
        await save_transcript(userInput);
        setCurrentTab('Memories')
        sessionStorage.setItem('currentTab', 'Memories')


    };

    const updateCurrentTab = (selectedValue) => {
        setCurrentTab(selectedValue)
        sessionStorage.setItem('currentTab', selectedValue)

    }
    //Initial data load
    useEffect(() => {
        if (history.length === 0) {
            console.log('fetch data triggered')
            fetchData();
        }

    }, []);


    return (

        <div className='container'>
            <div className='navBar'>
                <div >
                    <Tabs options={navOptions} selectedValue={currentTab} setSelectedValue={updateCurrentTab} />
                </div>
                <div className='signout-container'>
                    <SignOutButton className="button-small-subtle" />
                </div>

            </div>

            {currentTab === 'Home' && <>
                <Aquarium />
                <Record handleScriptsSubmit={handleScriptsSubmit} />
            </>}
            {currentTab === 'Memories' && <History history={history} />}
            {currentTab === 'Analysis' && <EmotionChart />}


        </div>


    );
}


