import React, { useEffect, useState } from 'react';
import EmotionTag from './EmotionTag';
import ThemeTag from './ThemeTag';
import Actions from './Actions';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import '../../Styles/App.css'
import styled from 'styled-components';

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

    const ResultSection = styled.div`
    max-width:600px;
    background-color: #FFFDF8;
    display: flex;
    flex-direction: row;
    gap: 64px;
    padding: 16px 24px;
    border-radius: 24px;
    justify-content: flex-start;
  
    @media (max-width: 768px) {
        flex-direction: column; 
        padding: 24px;
        gap: 12px;
    }
  `;

    const Sectiontitle = styled.div`
    width: 100px;
    padding: 16px 0;
    color: var(--brown-080);

    @media (max-width: 768px) {
        padding: 0;
    }
    `

    const result = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px'


    }


    const analysisText = {
        display: 'flex',
        alignItems: 'center', // Vertically center align


    }


    return (

        <div style={result}>
            {formattedTime}
            <ResultSection>
                <Sectiontitle>
                    <h2>Emotions</h2>
                </Sectiontitle>

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

            </ResultSection>

            <ResultSection>
                <Sectiontitle>
                    <h2>Themes</h2>
                </Sectiontitle>


                <div style={tagListStyle}>
                    {themeList.map((theme, index) => (
                        <ThemeTag key={index} theme={theme} />
                    ))
                    }
                </div>

            </ResultSection>

            <ResultSection>
                <Sectiontitle>
                    <h2>Analysis</h2>
                </Sectiontitle>

                <div style={analysisText}>
                    <p>{analysis}</p>
                </div>


            </ResultSection>


            <ResultSection>
                <Sectiontitle>
                    <h2>Actions</h2>
                </Sectiontitle>
                <div style={actionPairStyle}>
                    {actionList.map((action, index) => (
                        <Actions key={index} action={action.name} tag={action.tag} />
                    ))
                    }
                </div>

            </ResultSection>

        </div>



    );
}


export default SingleAnalysis