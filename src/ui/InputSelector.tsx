import React from 'react';
import DimensionInputs from '../components/DimensionInputs';
import DimensionSelector from '../components/DimensionSelector';
const InputSelector: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 md:px-6 md:py-4">
      <DimensionInputs />
      <DimensionSelector />
    </div>
  );
};

export default InputSelector;