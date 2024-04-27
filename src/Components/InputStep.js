import React from 'react';

function InputStep({ userInput, setUserInput }) {


  return (
    <div >
      <h1>What's on your mind today?</h1>
      <div className="interactionArea">
        <textarea
        
          autoFocus
          className="textArea"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>


    </div>
  );
}


export default InputStep;
