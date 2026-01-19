import React from 'react';
import { NoteOption } from '../models/NoteOption';

interface SubMenuProps {
  isVisible: boolean;
  options: NoteOption[];
  onOptionClick: (option: NoteOption) => void;
  onClose: () => void;
}

const SubMenu: React.FC<SubMenuProps> = ({ 
  isVisible, 
  options, 
  onOptionClick, 
  onClose 
}) => {
  if (!isVisible) return null;

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="submenu-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="submenu-options">
          {options.map((option) => (
            <button
              key={option.display}
              className="submenu-option-btn"
              onClick={() => onOptionClick(option)}
            >
              {option.display}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubMenu;