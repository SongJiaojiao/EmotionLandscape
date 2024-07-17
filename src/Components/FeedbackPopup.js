// Components/FeedbackPopup.js
import React, { useState } from 'react';
import lovehand from '../Img/lovehand.gif'

export default function FeedbackPopup({ onClose, onSubmit }) {

    const handleSubmit = () => {
        const url = 'https://forms.gle/ga1t7Vj5yuyAgZoB6';
        window.open(url, '_blank');
        // onClose();
    };

    return (
        <div className="popup">
            <div className='popup-header'>
                <img width={80} src={lovehand} />

                {/* <button className='button-small-subtle' onClick={onClose}>
                    <FontAwesomeIcon icon={faClose} style={{ width: '14px', color: 'var(--brown-070)' }} />
                </button> */}

            </div>
            <h2>Nuggets would love your feedback!</h2>
            <p>Nuggets is just a little sprout, and your thoughts can help it blossom!</p>
            <button className='button-large-primary' onClick={handleSubmit}>Go give feedback</button>

        </div>
    );
}
