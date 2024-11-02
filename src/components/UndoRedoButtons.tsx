// UndoRedoButtons.tsx
import React from 'react';
import ActionButton from './ActionButton';

const UndoRedoButtons: React.FC = () => {
  return (
    <div className="flex gap-4">
      <ActionButton label="Undo" onClick={() => {}} />
      <ActionButton label="Redo" onClick={() => {}} />
    </div>
  );
};

export default UndoRedoButtons;
