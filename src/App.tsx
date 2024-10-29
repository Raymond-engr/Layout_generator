import React from 'react';
import Header from './components/Header';
import DimensionSelector from './components/DimensionSelector';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="relative w-[1512px] h-[982px]">
        <DimensionSelector />
      </div>
    </div>
  );
};

export default App;
