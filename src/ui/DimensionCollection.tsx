import React from 'react';
import DimensionInputs from '../components/DimensionInputs';
import CollectionOptions from '../components/CollectionOptions';
import DimensionSelector from '../components/DimensionSelector';

const DimensionCollection: React.FC = () => {
  return (
    <div>
      <DimensionInputs />
      <div className="hidden lg:block pt-6 pb-3">
      <DimensionSelector />
      </div>
      <CollectionOptions />
    </div>
  );
};

export default DimensionCollection;