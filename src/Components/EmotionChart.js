import React, { useContext } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, ReferenceLine, Cell, Label, ResponsiveContainer, Tooltip } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HistoryContext } from '../Contexts/historyContext';
import EmptyBox from './EmptyBox';


const chartContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '600px',
    backgroundColor: 'var(--brown-000)',
    borderRadius: '24px',
    marginBottom: '16px',
    width: '100%',
    height: '400px',
    position: 'relative'
};
const referenceLineStyle = {
    stroke: "var(--brown-070)",
    strokeWidth: 2
};
const labelStyle = {
    fill: "var(--brown-070)",
    fontSize: 16,
    fontWeight: 600
};


function transformData(history) {

    return history.flatMap((item) => {
        
        return item.coordinates.map((coordinate, idx) => {
            const x = coordinate.valence
            const y = coordinate.arousal
            let color;

            if (x > 0 && y > 0) {
                color = 'var(--orange-040)';

            } else if (x <= 0 && y > 0) {
                color = 'var(--red-040)';
            } else if (x <= 0 && y <= 0) {
                color = 'var(--blue-040)';
            } else if (x > 0 && y <= 0) {
                color = 'var(--green-040)';
            }

            return {
                x: x,
                y: y,
                color: color,
                timestamp: item.timestamp,
                transcript: item.transcript,
                emotion: item.emotions[idx]
            };
        });
    });
}



function EmotionChart() {
    const { history, loadingState } = useContext(HistoryContext);
    const data = history ? transformData(history) : null;
    if (loadingState === 'loading') return <div className="shimmer maxWidthSpacer"  />;
    
    if (history.length === 0 && loadingState=='loaded') {
        return (

            <EmptyBox type="analysis" tooltip="It's empty here. Create your first journal."/>
        );
    }

    return (
        <div className='container'>
            <h3 style={{ marginBottom: '16px' }}>You in a nutshell</h3>
            <div style={chartContainer}>
                <FontAwesomeIcon icon={faChevronLeft} style={{ width: '14px', position: 'absolute', color: 'var(--brown-070)', left: '16' }} />
                <FontAwesomeIcon icon={faChevronRight} style={{ width: '14px', position: 'absolute', color: 'var(--brown-070)', right: '16' }} />
                <FontAwesomeIcon icon={faChevronUp} style={{ width: '14px', position: 'absolute', color: 'var(--brown-070)', top: '16' }} />
                <FontAwesomeIcon icon={faChevronDown} style={{ width: '14px', position: 'absolute', color: 'var(--brown-070)', bottom: '16' }} />
                <ResponsiveContainer width='100%' height={400} >
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: -10,
                            left: -40
                        }}
                    >
                        <XAxis
                            type="number"
                            dataKey="x"
                            domain={[-10, 10]}
                            axisLine={false}
                            tickLine={false}
                            tick={false}
                            tickSize={0}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            domain={[-10, 10]}
                            axisLine={false}
                            tickLine={false}
                            tick={false}
                            tickSize={0}
                        />
                        <ZAxis type="number" dataKey="z" range={[300, 300]} />
                        {/* <Tooltip formatter={(value, name, props) => {
                        const { payload } = props;
                        return [
                            `${name}: ${value}`,
                            `${payload.emotion}`,
                            `${payload.timestamp}`,
                            `Transcript: ${payload.transcript}`
                        ];
                    }} /> */}
                        <Scatter name="Emotion" data={data} >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Scatter>

                        <ReferenceLine y={0} {...referenceLineStyle}>
                            <Label value="Unpleasant" position="insideTopLeft" offset={10} {...labelStyle} />
                            <Label value="Pleasant" position="insideTopRight" offset={10}{...labelStyle} />
                        </ReferenceLine>
                        <ReferenceLine x={0} {...referenceLineStyle}>
                            <Label value="High arousal" position="insideTopLeft" offset={10}{...labelStyle} />
                            <Label value="Low arousal" position="insideBottomLeft" offset={10}{...labelStyle} />
                        </ReferenceLine>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>

    )
}

export default EmotionChart;
