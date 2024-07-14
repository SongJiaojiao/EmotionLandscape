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
    const { averageCoordinate, loadingState ,highestQuadrant } = useContext(HistoryContext);

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
    const determineImageSrcQuadrant = (quadrant_score) => {
        if (quadrant_score == 'No Data' && loadingState == 'loaded') return empty;

        if (quadrant_score && loadingState == 'loaded') {
            if (quadrant_score.highest_quadrant =='Q1') {
                return joy;
            } else if (quadrant_score.highest_quadrant =='Q2') {
                return anger;
            } else if (quadrant_score.highest_quadrant =='Q3') {
                return calm;
            } else if (quadrant_score.highest_quadrant =='Q4') {
                return down;
            }
        }

        return null;
    };

    const determineQuoteQuadrant = (quadrant) => {
        if (quadrant == 'No Data' && loadingState == 'loaded') return "It's empty here. Start your first journal.";
        if (quadrant && loadingState == 'loaded') {
            if (quadrant.highest_quadrant =='Q1') {
                return "Your little buddy is full of energy and joy!";
            } else if (quadrant.highest_quadrant =='Q2') {
                return "Your little buddy's seems restless lately.";
            } else if (quadrant.highest_quadrant =='Q3') {
                return "Your little buddy's swimming calmly, just like your cool, and collected vibes.";
            } else if (quadrant.highest_quadrant =='Q4') {
                return "Your little buddy seems a bit down.";
            }
        }


        return "Your little buddy is here with you.";
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
        <div className='aquarium' style={{ backgroundImage: `url(${determineImageSrcQuadrant(highestQuadrant)})` }}>
            <div className='tag' style={{ position: 'absolute', right: '8px', bottom: '8px', objectFit: 'cover', zIndex: 1 }}>
                {determineQuoteQuadrant(highestQuadrant)}
            </div>
            {highestQuadrant &&
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
                    src={determineImageSrcQuadrant(highestQuadrant) === joy ? joyGif : determineImageSrcQuadrant(highestQuadrant) === anger ? angerGif : determineImageSrcQuadrant(highestQuadrant) === calm ? calmGif : determineImageSrcQuadrant(highestQuadrant) === down ? downGif : null}
                />}

        </div>
    );
}
