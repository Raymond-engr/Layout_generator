import React from 'react';
import Header from './ui/Header';
import DimensionSelector from './components/DimensionSelector';
import DimensionCollection from './ui/DimensionCollection';
import GridContainer from './components/GridContainer';
import { GridProvider } from './components/gridClaude/GridContext';
import Footer from './components/Footer';
import ResponsiveActionButtons from './components/ResponsiveActionButtons';
const App: React.FC = () => {
  return (
    <GridProvider>
    <div>
      <Header />
      </div>
      <div className="flex flex-col lg:flex-row items-start w-full px-4 py-3 md:px-6 md:py-4 lg:px-10 lg:py-6">
        <div className="w-full lg:w-auto items-center">
        <DimensionCollection />
        </div>
        <div className="w-full">
          <div className="md:hidden">
        <DimensionSelector />
        </div>
        <div className="">
        <GridContainer />
        </div>
        </div>
    </div>
    </GridProvider>
  );
};

export default App;
