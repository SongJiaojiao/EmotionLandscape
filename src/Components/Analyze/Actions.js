import React from 'react';
import '../../Styles/App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';

function Actions({ action, tag }) {
  const getBackgroundColor = (tag) => {
    switch (tag) {
      case 'Expanding':
        return 'var(--emotionTag-orange)'; // Using CSS variable for red
      case 'Grounding':
        return 'var(--emotionTag-red)'; // Using CSS variable for yellow
      case 'Exploring':
        return 'var(--emotionTag-green)'; // Using CSS variable for green
      case 'Elevating':
        return 'var(--emotionTag-blue)'; // Using CSS variable for blue
      default:
        return 'var(--emotionTag-blue)'; // default background color
    }
  };

  const tagStyle = {
    backgroundColor: getBackgroundColor(tag),
    padding: '8px',
    borderRadius: '8px',

  };

  const actionBox = {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '28px',
    backgroundColor: 'var(--brown-010)', 
    borderRadius: '16px',
    textAlign: 'left',
    color: 'var(--brown-080)',
    height:'140px'


  };
  const actionTop = {
    display: 'flex',
    flexDirection: 'column',
    // gap: '12px',
    alignItems: 'flex-start',
    justifyContent:'space-between',
    height:'100%'



  };


  return (
    <div style={actionBox}>
      <div style={actionTop}>
        <div style={tagStyle}>{tag}</div>
        <h3>{action}</h3>
      </div>



      {/* <FontAwesomeIcon icon={faArrowRight} /> */}


    </div>
  );
}


export default Actions;
