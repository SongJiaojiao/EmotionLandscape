import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';



function IdentificationStep({ userInput, onIdentify, nextStep }) {
    // A list of common cognitive distortions
    const distortions = [
        "All-or-nothing",
        "Overgeneralization",
        "Mental filter",
        "Disqualifying the positive",
        "Jumping to conclusions",
        "Emotional reasoning",
        "Should statements",
        "Labeling",
        "Personalization"
    ];

    // State to track selected distortions
    const [selectedDistortions, setSelectedDistortions] = useState([]);

    const isDistortionSelected = (distortion) => selectedDistortions.includes(distortion);

    // Handle card click
    const handleCardClick = (distortion) => {
        if (selectedDistortions.includes(distortion)) {
            // If distortion is already selected, remove it from the list
            setSelectedDistortions(prev => prev.filter(d => d !== distortion));
        } else {
            // If distortion is not selected, add it to the list
            setSelectedDistortions(prev => [...prev, distortion]);
        }
    };

    // Handle submit
    const handleSubmit = () => {
        onIdentify(selectedDistortions);
        nextStep();
    };

    return (
        <div >
           
            <h1>Do any of these sound like you?</h1>
            <div className="containerWide">
                {distortions.map(distortion => (
                    <div
                        key={distortion}
                        className={`optionBox ${isDistortionSelected(distortion) ? 'selected' : ''}`}
                        onClick={() => handleCardClick(distortion)}
                    >
                        {distortion}
                    </div>
                ))}
            </div>


        </div>
    );
}

export default IdentificationStep;
