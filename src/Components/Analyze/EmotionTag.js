import React from 'react';
import '../../App.css'

function EmotionTag({emotion,valence,arousal}) {
  const getClassName = (valence, arousal) => {
    if (valence >= 0 && arousal >= 0) {
        return 'emotionTag-orange'; // High Valence, High Arousal
    } else if (valence >= 0 && arousal < 0) {
        return 'emotionTag-green'; // High Valence, Low Arousal
    } else if (valence < 0 && arousal >= 0) {
        return 'emotionTag-red'; // Low Valence, High Arousal
    } else {
        return 'emotionTag-blue'; // Low Valence, Low Arousal
    }
};



  return (
    <div className={`emotionTag ${getClassName(valence, arousal)}`}>{emotion}
    </div>
  );
}


export default EmotionTag;
