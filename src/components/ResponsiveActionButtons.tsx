// ResponsiveActionButtons.tsx
import React from 'react';
import AddToCartWithTotal from './AddToCartWithTotal';
import UndoRedoButtons from './UndoRedoButtons';
import ResetDeleteButtons from './ResetDeleteButtons';
import SizeAdjustButtons from './SizeAdjustButtons';

const ResponsiveActionButtons: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row md:flex-col lg:flex-row">
      <div className="order-1 md:order-3">
        <AddToCartWithTotal />
      </div>
      <div className="flex gap-4 order-2 md:order-1">
        <UndoRedoButtons />
      </div>
      <div className="flex gap-4 order-3 md:order-2">
        <ResetDeleteButtons />
      </div>
      <div className="flex gap-4 order-4">
        <SizeAdjustButtons />
      </div>
    </div>
  );
};

export default ResponsiveActionButtons;
