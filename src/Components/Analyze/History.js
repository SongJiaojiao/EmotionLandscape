import React, { useState } from 'react';
import SingleAnalysis from './SingleAnalysis';
import Toggle from '../Toggle';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

function History({ history }) {

    const [selectedDate, setSelectedDate] = useState(() => sessionStorage.getItem('selectedDate') || 'Today');

    if (!history || history.length === 0) {
        return (
            <div style={{ width: '100%', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="shimmer" style={{ width: '100%', height: '120px', borderRadius: '16px' }}></div>
                <div className="shimmer" style={{ width: '100%', height: '120px', borderRadius: '16px' }}></div>
                <div className="shimmer" style={{ width: '100%', height: '240px', borderRadius: '16px' }}></div>

            </div>
        );
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Sort and then group history by dates
    const groupedByDate = history
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .reduce((acc, item) => {
            const itemDate = new Date(item.timestamp); // Assuming item.timestamp is in UTC
            const itemLocalDate = new Date(itemDate.toLocaleString()); // Convert to local date

            const itemFormattedDate = new Date(itemLocalDate.getFullYear(), itemLocalDate.getMonth(), itemLocalDate.getDate());

            // Determine if the local date is Today, Yesterday or another day
            let formattedDate;
            if (itemFormattedDate.getTime() === today.getTime()) {
                formattedDate = 'Today';
            } else if (itemFormattedDate.getTime() === yesterday.getTime()) {
                formattedDate = 'Yesterday';
            } else {
                formattedDate = itemLocalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }

            // Format the time part in user's local timezone
            const formattedTime = itemLocalDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).toUpperCase();

            if (!acc[formattedDate]) {
                acc[formattedDate] = [];
            }
            acc[formattedDate].push({ ...item, formattedTime });
            return acc;
        }, {});

    const uniqueDates = Object.keys(groupedByDate);
    const options = uniqueDates.map(date => {

        return {
            value: date,
            text: date
        };
    });

    const reversedOptions = [...options].reverse();


    const handleDateChange = (date) => {
        setSelectedDate(date);
        sessionStorage.setItem('selectedDate', date)
    };

    const dateSelector = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '24px'


    }




    return (
        <div>
            <div style={dateSelector}>
                {/* <Toggle
                    options={reversedOptions}
                    selectedValue={selectedDate}
                    setSelectedValue={handleDateChange}
                /> */}
            </div>


            <div className='analysisList'>
                {groupedByDate[selectedDate] && (
                    <div key={selectedDate}>
                        {/* Display the date as a section header */}
                        {groupedByDate[selectedDate].map((singleHistory, index) => (
                            <SingleAnalysis
                                key={index}
                                emotionList={singleHistory.emotions}
                                themeList={singleHistory.themes}
                                analysis={singleHistory.analysis}
                                actionList={singleHistory.arousal}
                                valenceList={singleHistory.valence}
                                arousalList={singleHistory.arousal}
                                timestamp={singleHistory.timestamp}
                                formattedTime={singleHistory.formattedTime} // Passing formatted time
                                recommendedActions={singleHistory.recommendedActions}

                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default History;
