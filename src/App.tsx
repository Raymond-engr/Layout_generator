import React from 'react';
import Header from './components/Header';
import DimensionSelector from './components/DimensionSelector';
import DimensionDisplay from './components/DimensionDisplay';
import CollectionOptions from './components/CollectionOptions';
const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="relative w-[1512px] h-[982px]">
        <DimensionSelector />
        <DimensionDisplay />
        <CollectionOptions />
      </div>
    </div>
  );
};

export default App;
