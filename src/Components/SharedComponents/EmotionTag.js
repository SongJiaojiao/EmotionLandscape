import React from 'react';
import '../../Styles/App.css'

function EmotionTag({ emotion, valence, arousal }) {

  const getBackgroundColor = (valence, arousal) => {
    if (valence >= 0 && arousal >= 0) {
      return 'var(--emotionTag-orange)'; // High Valence, High Arousal
    } else if (valence >= 0 && arousal < 0) {
      return 'var(--emotionTag-green)'; // High Valence, Low Arousal
    } else if (valence < 0 && arousal >= 0) {
      return 'var(--emotionTag-red)'; // Low Valence, High Arousal
    } else {
      return 'var(--emotionTag-blue)'; // Low Valence, Low Arousal
    }
  };
  const emotionTagStyle = {
    padding: '8px 12px',
    borderRadius: '12px',
    backgroundColor: getBackgroundColor(valence, arousal),
    display: 'inline-block',
  };


  return (
    <div style={emotionTagStyle}>{emotion}
    </div>
  );
}


export default EmotionTag;
