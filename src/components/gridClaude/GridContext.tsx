import React, { createContext, useContext, useState } from 'react';

interface GridContextType {
  svgContent: Record<number, React.ReactNode>;
  setSvgForRow: (row: number, content: React.ReactNode) => void;
}

const GridContext = createContext<GridContextType | undefined>(undefined);

export const GridProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [svgContent, setSvgContent] = useState<Record<number, React.ReactNode>>({});

  const setSvgForRow = (row: number, content: React.ReactNode) => {
    setSvgContent(prev => ({ ...prev, [row]: content }));
  };

  return (
    <GridContext.Provider value={{ svgContent, setSvgForRow }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('useGridContext must be used within a GridProvider');
  }
  return context;
};