import React from 'react';

interface NotesOverlayProps {
  isVisible: boolean;
  notes: string[];
  onNoteClick: (note: string) => void;
  onClose: () => void;
}

const NotesOverlay: React.FC<NotesOverlayProps> = ({ 
  isVisible, 
  notes, 
  onNoteClick, 
  onClose 
}) => {
  if (!isVisible) return null;

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="overlay-notes-grid">
          {notes.map((note) => (
            <button
              key={note}
              className="overlay-note-btn"
              onClick={() => onNoteClick(note)}
            >
              {note}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesOverlay;