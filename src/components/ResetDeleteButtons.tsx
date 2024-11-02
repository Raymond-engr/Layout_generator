// ResetDeleteButtons.tsx
import React from 'react';
import ActionButton from './ActionButton';

const ResetDeleteButtons: React.FC = () => {
  return (
    <div className="flex gap-4">
      <ActionButton label="Reset" onClick={() => {}} />
      <ActionButton label="Delete" onClick={() => {}} />
    </div>
  );
};

export default ResetDeleteButtons;
