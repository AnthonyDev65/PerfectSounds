import React from 'react';

interface DynamicIslandProps {
  currentNote: string;
  onClick: () => void;
}

const DynamicIsland: React.FC<DynamicIslandProps> = ({ currentNote, onClick }) => {
  return (
    <button className="dynamic-island" onClick={onClick}>
      <span>{currentNote}</span>
    </button>
  );
};

export default DynamicIsland;