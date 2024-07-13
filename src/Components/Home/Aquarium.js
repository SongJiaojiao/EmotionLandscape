import { useContext } from 'react';
import { HistoryContext } from '../../Contexts/historyContext';
import anger from '../../Img/Aquarium/Anger.png';
import calm from '../../Img/Aquarium/calm.png';
import down from '../../Img/Aquarium/down.png';
import joy from '../../Img/Aquarium/Joy.png';
import empty from '../../Img/Aquarium/Empty.png'
import angerGif from '../../Img/Aquarium/anger.gif';
import calmGif from '../../Img/Aquarium/calm.gif';
import downGif from '../../Img/Aquarium/down.gif';
import joyGif from '../../Img/Aquarium/joy.gif';


export default function Aquarium() {
    const { averageCoordinate, loadingState } = useContext(HistoryContext);

    const determineImageSrc = (coordinate) => {
        if (coordinate == 'No Data' && loadingState == 'loaded') return empty;

        if (coordinate && loadingState == 'loaded') {
            if (coordinate.valence > 0 && coordinate.arousal > 0) {
                return joy;
            } else if (coordinate.valence < 0 && coordinate.arousal > 0) {
                return anger;
            } else if (coordinate.valence > 0 && coordinate.arousal < 0) {
                return calm;
            } else if (coordinate.valence < 0 && coordinate.arousal < 0) {
                return down;
            }
        }

        return null;
    };

    const determineQuote = (coordinate) => {
        if (coordinate == 'No Data' && loadingState == 'loaded') return "It's empty here. Start your first journal.";
        if (coordinate && loadingState == 'loaded') {
            if (coordinate.valence > 0 && coordinate.arousal > 0) {
                return "Your little buddy is full of energy and joy!";
            } else if (coordinate.valence < 0 && coordinate.arousal > 0) {
                return "Your little buddy's seems restless lately.";
            } else if (coordinate.valence > 0 && coordinate.arousal < 0) {
                return "Your little buddy's swimming calmly, just like your cool, and collected vibes.";
            } else if (coordinate.valence < 0 && coordinate.arousal < 0) {
                return "Your little buddy seems a bit down.";
            }
        }


        return "Your little buddy is here with you.";
    };


    if (loadingState === 'loading') return <div className="shimmer maxWidthSpacer" style={{height:'200px'}} />;

    return (
        <div className='aquarium' style={{ backgroundImage: `url(${determineImageSrc(averageCoordinate)})` }}>
            <div className='tag' style={{ position: 'absolute', right: '8px', bottom: '8px', objectFit: 'cover', zIndex: 1 }}>
                {determineQuote(averageCoordinate)}
            </div>
            {averageCoordinate &&
                <img
                    style={{
                        position: 'absolute',
                        top: '0', left: '0',
                        width: '100%',
                        height: '100%', objectFit: 'cover',
                        zIndex: 1,
                        border: 'none',
                        borderWidth:'0'

                    }}
                    src={determineImageSrc(averageCoordinate) === joy ? joyGif : determineImageSrc(averageCoordinate) === anger ? angerGif : determineImageSrc(averageCoordinate) === calm ? calmGif : determineImageSrc(averageCoordinate) === down ? downGif : null}
                />}

        </div>
    );
}
