import React from 'react';

const MusicPlayerPointer = ({ currentTime, duration, width }) => {
  const progress = (currentTime / duration) * 100;

  return (
    <div className="music-player-pointer">
      <div className="progress-bar h-1 w-full bg-gray-300" style={{width: width}}>
        <div className="progress h-full bg-blue-600" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default MusicPlayerPointer;
