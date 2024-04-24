import React, { useState, useEffect } from 'react';
import InputStep from './InputStep';
import IdentificationStep from './IdentificationStep';
import ChallengeStep from './ChallengeStep';
import ReframeStep from './ReframeStep';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function CBTFlow() {
    const [step, setStep] = useState(() => {
        // Retrieve the current step from sessionStorage if it exists
        const storedStep = sessionStorage.getItem('currentStep');
        return storedStep ? parseInt(storedStep) : 1;
    });
    const [userInput, setUserInput] = useState('');
    const [identifiedThoughts, setIdentifiedThoughts] = useState('');
    const [challengedThought, setChallengedThought] = useState('');
    const [reframedThought, setReframedThought] = useState('');

    useEffect(() => {
        // Save the current step to sessionStorage whenever it changes
        sessionStorage.setItem('currentStep', step.toString());
    }, [step]);


    const nextStep = () => {
        setStep(step + 1);
    };
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1); // Go to the previous step
        }
    };

    console.log('userinput', userInput)

    return (
        <div style={bodyStyles}>
            {step === 1 && <InputStep onSubmit={setUserInput} nextStep={nextStep} />}
            {step === 2 && <IdentificationStep userInput={userInput} onIdentify={setIdentifiedThoughts} nextStep={nextStep} />}
            {step === 3 && <ChallengeStep identifiedThoughts={identifiedThoughts} onChallenge={setChallengedThought} nextStep={nextStep} />}
            {step === 4 && <ReframeStep challengedThought={challengedThought} onReframe={setReframedThought} nextStep={nextStep} />}

           <div className="moveSteps">
                {step > 1 && (
                    <button className="back-button"onClick={handleBack}>
                        Back
                    </button>
                )}
                <button className="next-button" onClick={nextStep}>
                 <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
}

const bodyStyles = {
    width:'640px',
    display: 'flex',
    flexDirection: 'column',

    marginTop: '120px',
    padding: 0,
    height: '100vh',

};
