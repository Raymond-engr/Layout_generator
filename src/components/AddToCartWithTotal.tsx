// AddToCartWithTotal.tsx
import React from 'react';
import ActionButton from './ActionButton';

const AddToCartWithTotal: React.FC = () => {
  return (
    <div className="flex flex-col items-start gap-2 md:items-center">
      {/* Add to Cart Button */}
      <ActionButton label="Add to Cart" onClick={() => {}} />

      {/* Total Label and Amount */}
      <div className="flex items-center gap-1">
        <span className="text-black text-base font-medium font-nohemi">TOTAL:</span>
        <span className="text-black text-base font-medium font-nohemi">$2,150</span>
      </div>
    </div>
  );
};

export default AddToCartWithTotal;
