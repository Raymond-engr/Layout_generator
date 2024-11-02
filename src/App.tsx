import React from 'react';
import Header from './components/Header';
import DimensionInputs from './components/DimensionInputs';
import DimensionSelector from './components/DimensionSelector';
import CollectionOptions from './components/CollectionOptions';
import Footer from './components/Footer';
import ResponsiveActionButtons from './components/ResponsiveActionButtons';
const App: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <Header />
        <DimensionInputs />
        <CollectionOptions />
        <DimensionSelector />
        <ResponsiveActionButtons />
    </div>
  );
};

export default App;
