import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, SignIn, SignOutButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Switch, useNavigate } from 'react-router-dom';
import homeImage from '../Img/home.png';  // Import the image
import joyGif from '../Img/Aquarium/joy.gif';

export default function Landing() {
    const navigate = useNavigate();
    const handleSignInClick = () => {
        navigate('/signin');
    };


    return (

        <div>
            <div style={{
                fontSize: '32px',
                fontWeight: '600',
                marginBottom: '240px'

            }}>
                Nuggets
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap:'40px',
                justifyContent:'center'
            }}>
                <div style={{maxWidth:'420px'}}>
                    <h1 style={{marginBottom:'16px'}}>Learn and cope with <br></br>your emotion in a fun way!</h1>
                    <h3 style={{marginBottom:'24px'}}>The digital aquarium for your emotions</h3>
                    <button className='button-large-primary' onClick={handleSignInClick}>Start today</button>
                </div>
                <div>
                    <img width='400px' src={homeImage}/>
                </div>
            </div>



        </div>


    )


}