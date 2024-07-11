import React, { useEffect, useState } from 'react';
import EmotionTag from '../SharedComponents/EmotionTag';
import ThemeTag from '../SharedComponents/ThemeTag';
import Actions from '../SharedComponents/Actions';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import '../../Styles/App.css'


function SingleAnalysis({ emotionList, themeList, analysis, formattedTime, recommendedActions, coordinates }) {

    const tagListStyle = {
        display: 'flex',
        flexDirection: 'row', // Note: 'flex-direction' becomes 'flexDirection'
        gap: '8px',
        alignItems: 'center', // Note: 'align-items' becomes 'alignItems'
        justifyContent: 'flex-start', // Note: 'justify-content' becomes 'justifyContent'
        flexWrap: 'wrap' // Note: 'flex-wrap' becomes 'flexWrap'
    };

    const actionContainer = {
        width: '100%',
        display: 'flex',
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
        marginTop:'16px',
        marginBottom:'16px'


    }
    const timeStampStyle = {
        textAlign: 'center'
    }


    return (

        <div style={result}>
            <div style={timeStampStyle}>{formattedTime}</div>

            <div className="resultCard">
                <div className="resultTitle">
                    <h2>Emotions</h2>
                </div>

                <div style={tagListStyle}>
                    {emotionList.map((emotion, index) => (
                        <EmotionTag
                            key={index}
                            emotion={emotion}
                            valence={coordinates[index].valence}
                            arousal={coordinates[index].arousal}
                        />
                    ))
                    }
                </div>

            </div>

            <div className="resultCard">
                <div className="resultTitle">
                    <h2>Themes</h2>
                </div>


                <div style={tagListStyle}>
                    {themeList.map((theme, index) => (
                        <ThemeTag key={index} theme={theme} />
                    ))
                    }
                </div>

            </div>

            <div className="resultCard">
                <div className="resultTitle">
                    <h2>Analysis</h2>
                </div>

                <div style={analysisText}>
                    <p>{analysis}</p>
                </div>


            </div>

            {recommendedActions.length > 0 ? (<div className="resultCard">
                <div className="resultTitle">
                    <h2>Actions</h2>
                </div>
                <div style={actionContainer}>
                    {recommendedActions.map((action, index) => (
                        <div key={index} style={{flex: '0 0 calc(50% - 6px)'}}>
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