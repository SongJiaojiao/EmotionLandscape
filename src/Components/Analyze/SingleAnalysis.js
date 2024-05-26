import React, { useEffect, useState } from 'react';
import EmotionTag from './EmotionTag';
import ThemeTag from './ThemeTag';
import Actions from './Actions';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import '../../Styles/App.css'


function SingleAnalysis({ emotionList, themeList, analysis, valenceList, arousalList, formattedTime, recommendedActions, userTranscript }) {

    const tagListStyle = {
        display: 'flex',
        flexDirection: 'row', // Note: 'flex-direction' becomes 'flexDirection'
        gap: '8px',
        alignItems: 'center', // Note: 'align-items' becomes 'alignItems'
        justifyContent: 'flex-start', // Note: 'justify-content' becomes 'justifyContent'
        flexWrap: 'wrap' // Note: 'flex-wrap' becomes 'flexWrap'
    };

    const actionPairStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',

    }

    const result = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px',

    }


    const analysisText = {
        display: 'flex',
        alignItems: 'center', // Vertically center align


    }
    const timeStampStyle = {
        textAlign: 'center'
    }


    return (

        <div style={result}>
            {/* <div style={timeStampStyle}>{formattedTime}</div> */}

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

            {recommendedActions.length > 0 ? (<div class="resultSection">
                <div className="sectionTitle">
                    <h2>Actions</h2>
                </div>
                <div style={actionPairStyle}>
                    {recommendedActions.map((action, index) => (
                        <div key={index} style={{ flex: '0 0 calc(50% - 6px)' }}>
                            <Actions action={action.name} tag={action.tag} />
                        </div>

                    ))
                    }
                </div>

            </div>)
                : null}


        </div>



    );
}


export default SingleAnalysis