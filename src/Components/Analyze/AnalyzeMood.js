import { useContext, useState } from 'react'
import Record from './Record';
import Result from './Result';
import Tabs from '../Tabs';
import EmotionChart from './EmotionChart';
import { AuthUser } from '../../Contexts/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SignOutButton } from "@clerk/clerk-react";

export default function AnalyzeMood() {

    const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;
    const { authUser } = useContext(AuthUser);
    const [userTranscript, setuserTranscript] = useState(() => sessionStorage.getItem('userTranscript') || '');
    const [currentTab, setCurrentTab] = useState(() => sessionStorage.getItem('currentTab') || 'Journal');
    const timestamp = new Date().toISOString();
    const navOptions = [
        {
            text: 'Journal',
            value: 'Journal'
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

    const [showHistory, setshowHistory] = useState(() => sessionStorage.getItem('showHistory') || false);

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
            setshowHistory(true);
            sessionStorage.setItem('showHistory', true)


        } catch (error) {
            console.error('An error occurred:', error);
        }

    };



    const handleScriptsSubmit = async (userInput) => {
        sessionStorage.setItem('userTranscript', userInput);
        setuserTranscript(userInput);
        await save_transcript(userInput);
        setCurrentTab('Memories')
        sessionStorage.setItem('currentTab', 'Memories')


    };


    const updateshowHistory = () => {
        if (showHistory) {
            setshowHistory('');
            sessionStorage.setItem('showHistory', '');
        }
        else {
            setshowHistory(true)
        }

    }

    const updateCurrentTab = (selectedValue) => {
        setCurrentTab(selectedValue)
        sessionStorage.setItem('currentTab', selectedValue)

    }


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

            {currentTab === 'Journal' && <Record handleScriptsSubmit={handleScriptsSubmit} />}
            {currentTab === 'Memories' && <Result />}
            {currentTab === 'Analysis' && <EmotionChart />}

            {
                !authUser && <> {!showHistory ? (
                    <Record handleScriptsSubmit={handleScriptsSubmit} />
                ) : (

                    <Result
                        updateshowHistory={updateshowHistory}
                    />
                )}
                </>
            }


        </div>


    );
}


