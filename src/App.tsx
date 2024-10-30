import React from 'react';
import Header from './components/Header';
import DimensionInputs from './components/DimensionInputs';
import DimensionDisplay from './components/DimensionDisplay';
import CollectionOptions from './components/CollectionOptions';
const App: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <Header />
        <DimensionInputs />
        <DimensionDisplay />
        <CollectionOptions />
    </div>
  );
};

export default App;
