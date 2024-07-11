import React, { useState, useContext, useEffect, useRef } from 'react';
import SingleAnalysis from './SingleAnalysis';
import Calendar from '../SharedComponents/Calendar';
import { AuthUser } from '../../Contexts/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HistoryContext } from '../../Contexts/Context';

function Memories() {
    const { authUser } = useContext(AuthUser);
    const [currentDateIndex, setCurrentDateIndex] = useState(() => parseInt(sessionStorage.getItem('currentDateIndex'), 10) || 0);
    const [selectedDate, setSelectedDate] = useState(() => sessionStorage.getItem('selectedDate') || '');
    const { history, updateHistory } = useContext(HistoryContext);



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


    const getLastAvailableDate = () => {
        if (uniqueDates.length > 0) {
            return uniqueDates[0]; // Last date available after sorting
        }
    };


    useEffect(() => {

        const lastDate = getLastAvailableDate();
        setSelectedDate(lastDate);
        sessionStorage.setItem('selectedDate', lastDate);

    }, [history]);

    useEffect(() => {
        sessionStorage.setItem('currentDateIndex', currentDateIndex);
    }, [currentDateIndex]);




    const maxDisplayedDates = 5;
    const options = uniqueDates.map(date => ({
        value: date,
        text: date
    }));

    const reversedDisplayedOptions = options.slice(currentDateIndex, currentDateIndex + maxDisplayedDates);
    const displayedOptions = [...reversedDisplayedOptions].reverse();

    const handleLeftArrowClick = () => {
        if (currentDateIndex + maxDisplayedDates < options.length) {
            setCurrentDateIndex(currentDateIndex + maxDisplayedDates);
        }
    };

    const handleRightArrowClick = () => {
        if (currentDateIndex > 0) {
            setCurrentDateIndex(currentDateIndex - maxDisplayedDates);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        sessionStorage.setItem('selectedDate', date);
    };

    const dateSelector = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '8px',
    };

    if (!history || history.length === 0) {
        return (
            <div >
                Create your first memory by entering a journal. 
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '0' }}>

            <div style={dateSelector}>
                <div style={{ width: '40px' }}>
                    {currentDateIndex < options.length - maxDisplayedDates &&
                        <button className='button-medium-secondary' onClick={handleLeftArrowClick}>
                            <FontAwesomeIcon icon="caret-left" />
                        </button>
                    }
                </div>
                <Calendar
                    options={displayedOptions}
                    selectedValue={selectedDate}
                    setSelectedValue={handleDateChange}
                />
                <div style={{ width: '40px' }}>
                    {currentDateIndex > 0 &&
                        <button className='button-medium-secondary' onClick={handleRightArrowClick}>
                            <FontAwesomeIcon icon="caret-right" />
                        </button>
                    }
                </div>
            </div>

            {groupedByDate[selectedDate] && (
                <div key={selectedDate}>
                    {groupedByDate[selectedDate].map((singleHistory, index) => (
                        <SingleAnalysis
                            key={index}
                            emotionList={singleHistory.emotions}
                            themeList={singleHistory.themes}
                            analysis={singleHistory.analysis}
                            timestamp={singleHistory.timestamp}
                            formattedTime={singleHistory.formattedTime}
                            coordinates={singleHistory.coordinates}
                            recommendedActions={singleHistory.recommendedActions}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Memories;
