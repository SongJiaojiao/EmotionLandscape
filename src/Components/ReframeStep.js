import React, { useState } from 'react';

function ReframeStep({ challengedThought, onReframe, nextStep }) {
    // State for storing the user's reframed thoughts
    const [reframeText, setReframeText] = useState('');
    const requestHelp = async () => {
        try {
            // Make a POST request to the Flask backend
            const response = await fetch('http://localhost:5000/generate-challenge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: challengedThought })
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to request help from the backend');
            }

            // Extract the reframed thought from the response
            const data = await response.json();
            const generatedReframe = data.challenge;

            // Update the state with the generated reframed thought
            setReframeText(generatedReframe);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // Handle the submission of the reframed thought
    const handleSubmit = () => {
        onReframe(reframeText);
        nextStep();
    };

    return (
        <div>
            <h1>Reframe Your Thoughts</h1>
            
            <textarea
            class="textArea"
                value={reframeText}
                onChange={(e) => setReframeText(e.target.value)}
                placeholder="Enter your reframed thought here..."

            />
           
        </div>
    );
}

export default ReframeStep;
