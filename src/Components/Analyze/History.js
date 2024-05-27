import React, { useState, useContext } from 'react';
import SingleAnalysis from './SingleAnalysis';
import Toggle from '../Toggle';
import { AuthUser } from '../../Contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft,faCaretRight} from '@fortawesome/free-solid-svg-icons';

function History({ history }) {

    const [selectedDate, setSelectedDate] = useState(() => sessionStorage.getItem('selectedDate') || 'Today');
    const { authUser, setAuthUser } = useContext(AuthUser);
    const [currentDateIndex, setCurrentDateIndex] = useState(() => sessionStorage.getItem('currentDateIndex') || 0);

    if (!history || history.length === 0) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: '16px', borderRadius: '16px', }}>
                <div className="shimmer" style={{ height: '120px', borderRadius: '16px' }}>   <span></span>   </div>
                <div className="shimmer" style={{ height: '120px', borderRadius: '16px' }}></div>
                <div className="shimmer" style={{ height: '240px', borderRadius: '16px' }}></div>

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

    const maxDisplayedDates = 5;
    //date options are reversed list from today at index 0
    const options = uniqueDates.map(date => {
        return {
            value: date,
            text: date
        };
    });

    //show only last 5/maxDisplayedDates at a time
    const reverseddisplayedOptions = options.slice(currentDateIndex, currentDateIndex + maxDisplayedDates);
    //reverse it to make the latest on the right, older on the left
    const displayedOptions = [...reverseddisplayedOptions].reverse();

    const handleLeftArrowClick = () => {
        if (currentDateIndex < options.length - maxDisplayedDates) {
            setCurrentDateIndex(currentDateIndex + 5);
        }
        console.log(currentDateIndex)
    };

    const handleRightArrowClick = () => {
        if (currentDateIndex > 0) {
            setCurrentDateIndex(currentDateIndex - 5);
        }
        console.log(currentDateIndex)
    };



    const handleDateChange = (date) => {
        setSelectedDate(date);
        sessionStorage.setItem('selectedDate', date)
    };

    const dateSelector = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '16px',



    }


    return (

        <div style={{ paddingTop: '0' }}>
            {authUser &&
                <div style={dateSelector}>
                    <div style={{ width: '40px' }}>
                    {currentDateIndex < options.length - maxDisplayedDates &&
                        <button className='button-medium-secondary' onClick={handleLeftArrowClick}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </button>

                    }
                    </div>

                    <Toggle
                        options={displayedOptions}
                        selectedValue={selectedDate}
                        setSelectedValue={handleDateChange}

                    />
                    <div style={{ width: '40px' }}>
                        {currentDateIndex > 0 &&
                            <button className='button-medium-secondary' onClick={handleRightArrowClick}>
                                <FontAwesomeIcon icon={faCaretRight} />
                            </button>
                        }
                    </div>

                </div>
            }

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
    );
}

export default History;
