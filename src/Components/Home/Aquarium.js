import { useContext, useState, useEffect,useRef } from 'react';
import { AuthUser } from '../../Contexts/Context';
import { HistoryContext } from '../../Contexts/Context';
import anger from '../../Img/Aquarium/Anger.png';
import calm from '../../Img/Aquarium/calm.png';
import down from '../../Img/Aquarium/down.png';
import joy from '../../Img/Aquarium/Joy.png';
import angerGif from '../../Img/Aquarium/anger.gif';
import calmGif from '../../Img/Aquarium/calm.gif';
import downGif from '../../Img/Aquarium/down.gif';
import joyGif from '../../Img/Aquarium/joy.gif';

export default function Aquarium() {
    const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;
    const { authUser } = useContext(AuthUser);
    const { history } = useContext(HistoryContext);

    const [averageCoordinate, setAverageCoordinate] = useState(() => sessionStorage.getItem('averageCoordinate') || null);
    // console.log('averageCooridinate',averageCoordinate.valence)
    const prevHistoryRef = useRef(history);


    const fetchData = async () => {
        try {
            console.log('call avg emotion api');
            const response = await fetch(`${API_URL}/get_average_emotion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: authUser.email })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();
            sessionStorage.setItem('averageCoordinate', jsonData[0].average_emotion);
            setAverageCoordinate(jsonData[0].average_emotion);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } 
    };

    const determineImageSrc = (coordinate) => {
        if (!coordinate) return null;

        if (coordinate.valence > 0 && coordinate.arousal > 0) {
            return joy;
        } else if (coordinate.valence < 0 && coordinate.arousal > 0) {
            return anger;
        } else if (coordinate.valence > 0 && coordinate.arousal < 0) {
            return calm;
        } else if (coordinate.valence < 0 && coordinate.arousal < 0) {
            return down;
        }
        return null;
    };

    const determineQuote = (coordinate) => {
        if (!coordinate) return null;

        if (coordinate.valence > 0 && coordinate.arousal > 0) {
            return "Your little buddy is full of energy and joy!";
        } else if (coordinate.valence < 0 && coordinate.arousal > 0) {
            return "Your little buddy's seems restless lately.";
        } else if (coordinate.valence > 0 && coordinate.arousal < 0) {
            return "Your little buddy's swimming calmly, just like your cool, and collected vibes.";
        } else if (coordinate.valence < 0 && coordinate.arousal < 0) {
            return "Your little buddy seems a bit down.";
        }

        return "Your little buddy is here with you.";
    };

    useEffect(() => {
            fetchData();
    
    },[history]);

    return (
        <div className='aquarium' style={{ backgroundImage: `url(${determineImageSrc(averageCoordinate)})` }}>
            <div className='tag' style={{ position: 'absolute', right: '8px', bottom: '8px', objectFit: 'cover', zIndex: 1 }}>
                {determineQuote(averageCoordinate)}
            </div>
            <img
                style={{
                    position: 'absolute',
                    top: '0', left: '0',
                    width: '100%',
                    height: '100%', objectFit: 'cover',
                    zIndex: 1,
  
                }}

                src={determineImageSrc(averageCoordinate) === joy ? joyGif : determineImageSrc(averageCoordinate) === anger ? angerGif : determineImageSrc(averageCoordinate) === calm ? calmGif : determineImageSrc(averageCoordinate) === down ? downGif : null}
            />
            {/* {loading && <div className="shimmer" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderRadius: '16px' }} />} Placeholder shimmer */}
        </div>
    );
}
