import React, { useEffect, useState } from 'react';
import EmotionTag from './EmotionTag';
import ThemeTag from './ThemeTag';
import Actions from './Actions';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import '../../Styles/App.css'


function SingleAnalysis({ emotionList, themeList, analysis, valenceList, arousalList, timestamp, formattedTime }) {

    const actionList = [{
        name: 'Down regulating Breath work',
        tag: 'Grounding'
    }, {
        name: 'Listen to your favorite calming song',
        tag: 'Elevating'

    }]

    const tagListStyle = {
        display: 'flex',
        flexDirection: 'row', // Note: 'flex-direction' becomes 'flexDirection'
        gap: '8px',
        alignItems: 'center', // Note: 'align-items' becomes 'alignItems'
        justifyContent: 'flex-start', // Note: 'justify-content' becomes 'justifyContent'
        flexWrap: 'wrap' // Note: 'flex-wrap' becomes 'flexWrap'
    };

    const actionPairStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',

    }



    const result = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px',
        marginTop:'24px',

    }


    const analysisText = {
        display: 'flex',
        alignItems: 'center', // Vertically center align


    }
    const timeStampStyle ={
        textAlign:'center'
    } 


    return (

        <div style={result}>
            <div style={timeStampStyle}>{formattedTime}</div>
            
            <div class="resultSection">
                <div className="sectionTitle">
                    <h2>Emotions</h2>
                </div>

                <div style={tagListStyle}>
                    {emotionList.map((emotion, index) => (
                        <EmotionTag
                            key={index}
                            emotion={emotion}
                            valence={valenceList[index]}
                            arousal={arousalList[index]}
                        />
                    ))
                    }
                </div>

            </div>

            <div class="resultSection">
                <div className="sectionTitle">
                    <h2>Themes</h2>
                </div>


                <div style={tagListStyle}>
                    {themeList.map((theme, index) => (
                        <ThemeTag key={index} theme={theme} />
                    ))
                    }
                </div>

            </div>

            <div class="resultSection">
                <div className="sectionTitle">
                    <h2>Analysis</h2>
                </div>

                <div style={analysisText}>
                    <p>{analysis}</p>
                </div>


            </div>


            <div class="resultSection">
                <div className="sectionTitle">
                    <h2>Actions</h2>
                </div>
                <div style={actionPairStyle}>
                    {actionList.map((action, index) => (
                        <Actions key={index} action={action.name} tag={action.tag} />
                    ))
                    }
                </div>

            </div>

        </div>



    );
}


export default SingleAnalysis