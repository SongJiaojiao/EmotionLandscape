import React from 'react';
import EmotionTag from './EmotionTag';
import ThemeTag from './ThemeTag';

function SingleAnalysis({ emotionList, themeList, analysis, actionList,valenceList, arousalList  }) {


    return (

        <div className="result">
            <div className="resultSection">
                <h2>Emotions</h2>
                <div className='tagList'>
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

            <div className="resultSection">
                <h2>Themes</h2>
                <div className='tagList'>
                    {themeList.map((theme, index) => (
                        <ThemeTag key={index} theme={theme} />
                    ))
                    }
                </div>

            </div>

            <div className="resultSection">
                <h2>Analysis</h2>
                {analysis}

            </div>


            <div className="resultSection">
                <h2>Actions</h2>
                <div className='tagList'>
                    {actionList.map((action, index) => (
                        <div
                            key={index}
                            className="actionBox"
                        >

                            <h3>{action}</h3>


                        </div>
                    ))
                    }
                </div>

            </div>

        </div>



    );
}


export default SingleAnalysis