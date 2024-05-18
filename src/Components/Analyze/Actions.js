import React from 'react';
import '../../Styles/App.css'
import target from '../../Img/target.png'
import breatheblue from '../../Img/breatheblue.png'
import breatheorange from '../../Img/breatheorange.png'
import musicorange from '../../Img/musicorange.png'
import musicblue from '../../Img/musicblue.png'
import friend from '../../Img/friend.png'
import brightheart from '../../Img/brightheart.png'
import mirror from '../../Img/mirror.png'
import { useNavigate, } from 'react-router-dom';

function Actions({ action, tag, userTranscript }) {
  const navigate = useNavigate();
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
  const actionIcons = [
    {
      name: "Write a goal",
      iconLink: target
    },
    {
      name: "Down regulating breath work",
      iconLink: breatheblue
    },
    {
      name: "Up regulating breath work",
      iconLink: breatheorange
    },
    {
      name: "Listen to a calming song",
      iconLink: musicblue
    },

    {
      name: "Share with a friend",
      iconLink: friend
    },
    {
      name: "Name one thing you are grateful",
      iconLink: brightheart
    },
    {
      name: "Listen to upbeat music",
      iconLink: musicorange
    },
    {
      name: "Reframe your thoughts",
      iconLink: mirror
    }


  ];
  const handleClick = () => {
    if (action === "Reframe your thoughts") {
      navigate('/reframe', { state: { userTranscript } });
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
    height: '140px',
    border: '1px solid var(--brown-030)'


  };
  const actionTop = {
    display: 'flex',
    flexDirection: 'column',
    // gap: '12px',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '100%'



  };




  return (
    <div style={actionBox} onClick={handleClick} >
      <div style={actionTop}>
        <img src={actionIcons.find(icon => icon.name === action).iconLink} style={{ width: 40, height: 40 }} />
        <h3>{action}</h3>
      </div>
      {/* <FontAwesomeIcon icon={faArrowRight} /> */}

    </div>
  );
}


export default Actions;
