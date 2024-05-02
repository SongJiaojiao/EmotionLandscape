import React from 'react';
import SingleAnalysis from './SingleAnalysis';

function History({ history }) {
    if (!history || history.length === 0) {
        return <div>No history available.</div>; // Safeguard against undefined or empty history
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());  // Today at midnight, local time
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Yesterday at midnight, local time

    // Sort and then group history by dates
    const groupedByDate = history
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .reduce((acc, item) => {
            const itemDate = new Date(item.timestamp); // Assuming item.timestamp is in UTC
            const itemLocalDate = new Date(itemDate.toLocaleString()); // Convert to local date

            // Format the date for comparison (strip time for comparison)
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
            }).toUpperCase(); // Ensure AM/PM is capitalized

            // Group by the formatted date and include formatted time
            if (!acc[formattedDate]) {
                acc[formattedDate] = [];
            }
            acc[formattedDate].push({ ...item, formattedTime });
            return acc;
        }, {});

    return (
        <div>
            <div className='analysisList'>
            {Object.keys(groupedByDate).map((date) => (
                    <div key={date}>
                        <h3>{date}</h3> {/* Display the date as a section header */}
                        {groupedByDate[date].map((singleHistory, index) => (
                            <SingleAnalysis 
                                key={index}
                                emotionList={singleHistory.emotions}
                                themeList={singleHistory.themes}
                                analysis={singleHistory.transcript}
                                actionList={singleHistory.arousal}
                                valenceList={singleHistory.valence}
                                arousalList={singleHistory.arousal}
                                timestamp={singleHistory.timestamp}
                                formattedTime={singleHistory.formattedTime} // Passing formatted time
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default History;
