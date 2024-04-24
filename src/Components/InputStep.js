import React, { useState } from 'react'

export default function InputStep({ onSubmit, nextStep }) {
    const [input, setInput] = useState('');
    const [challengeText, setChallengeText] = useState('');
    const isInputEmpty = input.trim() === '';
    console.log(isInputEmpty)
  
    const handleSubmit = () => {
      onSubmit(input);
      nextStep();
    };
  
    return (
      <div style={inputStepStyles}>
        <h1 >What’s on your mind?</h1>
        <textarea
          autoFocus
          class="textArea"
          id="userInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    );
  }
  const inputStepStyles = {
    width:'100%',
  
  };

