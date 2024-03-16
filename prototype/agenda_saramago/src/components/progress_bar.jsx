import React from 'react';

const ProgressBar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: '800%', 
    backgroundColor: '#e5e5e5',
    borderRadius: 40,
    margin: 10,
    overflow: 'hidden',
    alignItems: 'center',
  };

  const Childdiv = {
    height: '100%',
    width: `${Math.min(progress, 100)}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: 'right',
    transition: 'width 0.5s ease-in-out',
    display: 'flex', 
    alignItems: 'center', 
  };

  const progresstext = {
    padding: 10,
    color: 'black',
    fontWeight: 900,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
