import React from 'react';
import Header from './components/Header';
import DimensionInputs from './components/DimensionInputs';
import DimensionSelector from './components/DimensionSelector';
import CollectionOptions from './components/CollectionOptions';
import Footer from './components/Footer';
import ResponsiveActionButtons from './components/ResponsiveActionButtons';
const App: React.FC = () => {
  return (
    <>
    <div>
      <Header />
      </div>
      <div className="flex flex-col items-start px-6 py-4">
        <DimensionInputs />
        <CollectionOptions />
        <DimensionSelector />
    </div>
    </>
  );
};

export default App;
