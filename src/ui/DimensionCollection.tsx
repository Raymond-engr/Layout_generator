import React from 'react';
import DimensionInputs from '../components/DimensionInputs';
import CollectionOptions from '../components/CollectionOptions';

const DimensionCollection: React.FC = () => {
  return (
    <div>
      <DimensionInputs />
      <CollectionOptions />
    </div>
  );
};

export default DimensionCollection;