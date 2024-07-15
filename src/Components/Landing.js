import React from 'react';
import { BrowserRouter as Router, Route, Switch, useNavigate } from 'react-router-dom';
import homeImage from '../Img/home.png';  // Import the image

export default function Landing() {
    const navigate = useNavigate();
    const handleSignInClick = () => {
        navigate('/signin');
    };


    return (

        <div className="container landing">
            <div className="heading">
                Nuggets
            </div>
            <div className="content">
                <div className="text-content">
                    <h1 >Learn and cope with <br></br>your emotion in a fun way!</h1>
                    <h3 >The digital aquarium for your emotions</h3>
                    <button className='button-large-primary' onClick={handleSignInClick}>Start today</button>
                </div>
                <div className='image-content'>
                    <img width='400px' src={homeImage} />
                </div>
            </div>



        </div>


    )


}