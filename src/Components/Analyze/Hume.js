
import React, { useState, useRef, useEffect } from 'react';

function Hume({ handleHumeTranscript }) {
    return (
        <div>
            <textarea
                className="textArea"
                style={{backgroundColor:'white'}}
            />

            <button className='button-large'>
                Record
            </button>


        </div>
    )
}

export default Hume