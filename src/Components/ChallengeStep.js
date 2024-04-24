import React, { useState } from 'react';

function ChallengeStep({ identifiedThoughts, onChallenge, nextStep }) {
    // State for storing the user's response on how they challenge their thoughts
    const [challengeText, setChallengeText] = useState('');

    // Handle the submission of the challenge
    const handleSubmit = () => {
        onChallenge(challengeText);
        nextStep();
    };

    return (
        <div>
            <h1>Challenge Your Thoughts</h1>
           
            <textarea
                class="textArea"
                value={challengeText}
                onChange={(e) => setChallengeText(e.target.value)}
                placeholder="Write here..."

            />
          
            
        </div>
    );
}

export default ChallengeStep;
