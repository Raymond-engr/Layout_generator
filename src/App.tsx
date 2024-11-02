import React from 'react';
import Header from './components/Header';
import DimensionInputs from './components/DimensionInputs';
import DimensionSelector from './components/DimensionSelector';
import CollectionOptions from './components/CollectionOptions';
const App: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <Header />
        <DimensionInputs />
        <CollectionOptions />
        <DimensionSelector />
    </div>
  );
};

export default App;
