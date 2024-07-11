import React from 'react';

function ThemeTag({theme}) {
  const themeTagStyle = {
    padding: '8px 16px',
    borderRadius: '24px',
    backgroundColor: 'var(--brown-010)',
    display: 'inline-block',
  };

  return (
    <div style={themeTagStyle}>{theme}
    </div>
  );
}


export default ThemeTag;
