import React, { useEffect, useState } from 'react';
import EmotionTag from './EmotionTag';
import ThemeTag from './ThemeTag';
import Actions from './Actions';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import '../../Styles/App.css'


function SingleAnalysis({ emotionList, themeList, analysis, valenceList, arousalList, formattedTime,recommendedActions }) {
    console.log('emotions',emotionList)

   

    // function getRecommendedActions(emotionList, valenceList, arousalList) {
    //     const recommendedActions = [];
    //     const addedActions = [];
    
    //     for (let i = 0; i < emotionList.length; i++) {
    //         const emotion = emotionList[i];
    //         const valence = valenceList[i];
    //         const arousal = arousalList[i];
    //         console.log(emotion, valence, arousal)
    
    //         if (arousal >= 7 && valence >= 7) {
    //             addActionIfNotAdded(recommendedActions, addedActions, "Name one thing you are grateful", "Expanding");
    //             addActionIfNotAdded(recommendedActions, addedActions, "Share with a friend", "Expanding");
    //         } else if (arousal <= -3 && valence >= 7) {
    //             addActionIfNotAdded(recommendedActions, addedActions, "Write a goal", "Exploring");
    //         } else if (arousal >= 7 && valence <= -3) {
    //             addActionIfNotAdded(recommendedActions, addedActions, "Down regulating breath work", "Grounding");
    //             addActionIfNotAdded(recommendedActions, addedActions, "Listen to your favorite calming song", "Grounding");
    //         } else if (arousal <= -3 && valence <= -3) {
    //             addActionIfNotAdded(recommendedActions, addedActions, "Up regulating breath work", "Elevating");
    //             addActionIfNotAdded(recommendedActions, addedActions, "Listen to upbeat music", "Elevating");
    //         }
    //     }
    
    //     return recommendedActions;
    // }
    
    // function addActionIfNotAdded(recommendedActions, addedActions, name, tag) {
    //     if (!addedActions.includes(name)) {
    //         recommendedActions.push({ name, tag });
    //         addedActions.push(name);
    //     }
    // }
    // const recommendedActions = getRecommendedActions(emotionList, valenceList, arousalList);
    // console.log('recommendedActions',recommendedActions)


    const tagListStyle = {
        display: 'flex',
        flexDirection: 'row', // Note: 'flex-direction' becomes 'flexDirection'
        gap: '8px',
        alignItems: 'center', // Note: 'align-items' becomes 'alignItems'
        justifyContent: 'flex-start', // Note: 'justify-content' becomes 'justifyContent'
        flexWrap: 'wrap' // Note: 'flex-wrap' becomes 'flexWrap'
    };

    const actionPairStyle = {
        width:'100%',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',

    }
    const actionCardStyle = {
        flex: '1 0 48%', 
        height: '100%'

    };
    



    const result = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px',
        marginTop: '24px',

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
                    {recommendedActions.map((action, index) => (
                        <div key={index} style={{ flex: '0 0 calc(50% - 6px)' }}> 
                            <Actions action={action.name} tag={action.tag} />
                        </div>
                       
                    ))
                    }
                </div>

            </div>

        </div>



    );
}


export default SingleAnalysis