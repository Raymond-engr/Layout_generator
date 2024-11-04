import React from 'react';
import Header from './ui/Header';
import DimensionSelector from './components/DimensionSelector';
import DimensionInputs from './components/DimensionInputs';
import CollectionOptions from './components/CollectionOptions';
import DimensionCollection from './ui/DimensionCollection';
import Footer from './components/Footer';
import ResponsiveActionButtons from './components/ResponsiveActionButtons';
const App: React.FC = () => {
  return (
    <>
    <div>
      <Header />
      </div>
      <div className="flex flex-col lg:flex-row items-start w-full px-4 py-3 md:px-6 md:py-4">
        <DimensionCollection />
        <div className="w-full md:hidden lg:block">
        <DimensionSelector />
        </div>
    </div>
    </>
  );
};

export default App;
