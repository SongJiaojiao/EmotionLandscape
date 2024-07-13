import React from 'react';
import emptyMemory from '../Img/EmptyMemory.png';
import emptyAnalysis from '../Img/EmptyAnalysis.png';

export default function EmptyBox({ type, tooltip }) {
    const emptyBox = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px',
        backgroundColor: 'var(--brown-000)',
        borderRadius: '16px',
        gap: '16px'
    }
    return (
        <div className='maxWidthSpacer' style={emptyBox}>
            <img style={{ maxWidth: '280px' }} src={type == "memory" ? emptyMemory : type == "analysis" ? emptyAnalysis : null} />
            <div>{tooltip}</div>
            <button className='button-medium-primary'>Go to Journal</button>
        </div>
    )

}