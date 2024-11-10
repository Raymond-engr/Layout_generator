import React from 'react';

const GridContainer: React.FC = () => {
    return (
        <div className="my-4 lg:py-4 lg:pl-6 w-full h-auto overflow-auto">
            <div className="grid gap-0.5 overflow-auto w-full h-[200px] sm:h-[200px] md:h-[300px] lg:h-[490px]"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
                    gridTemplateRows: "repeat(auto-fill, minmax(95px, auto))", // Base height for each grid item
                }}
            >
                {Array.from({ length: 100 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 w-full h-full max-w-[120px] max-h-[120px] relative object-cover"
                    >
                        {/* Content for each grid item goes here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GridContainer;




import React, { useRef, useCallback, useEffect } from 'react';
import useGridCalculations from '../hooks/useGridCalculations';

const GRID_CONSTANTS = {
  MIN_ITEM_SIZE: 60,
  MAX_ITEM_SIZE: 120,
  INITIAL_ITEM_SIZE: 90,
  SIZE_STEP: 10,
} as const;

export const DynamicGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { metrics, items, updateGrid, setMetrics } = useGridCalculations(
    containerRef,
    GRID_CONSTANTS.INITIAL_ITEM_SIZE
  );

  const handleSizeChange = useCallback((increment: boolean) => {
    setMetrics(prev => {
      const newSize = increment
        ? Math.min(prev.itemSize + GRID_CONSTANTS.SIZE_STEP, GRID_CONSTANTS.MAX_ITEM_SIZE)
        : Math.max(prev.itemSize - GRID_CONSTANTS.SIZE_STEP, GRID_CONSTANTS.MIN_ITEM_SIZE);
      
      return {
        ...prev,
        itemSize: newSize,
      };
    });
  }, [setMetrics]);

  useEffect(() => {
    updateGrid();
    const resizeObserver = new ResizeObserver(() => {
      updateGrid();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateGrid);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateGrid);
    };
  }, [updateGrid]);

  return (
    <div className="w-full p-1 space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => handleSizeChange(false)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Decrease Size
        </button>
        <button
          onClick={() => handleSizeChange(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Increase Size
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-auto border border-gray-200"
        style={{
          maxWidth: '100%',
          maxHeight: '80vh',
        }}
      >
        <div
          className="grid gap-0.5 p-1"
          style={{
            width: `${metrics.columns * metrics.itemSize}px`,
            gridTemplateColumns: `repeat(${metrics.columns}, ${metrics.itemSize}px)`,
            gridAutoRows: `${metrics.itemSize}px`,
          }}
        >
          {items.map(item => (
            <div
              key={item.id}
              className="bg-gray-200 shadow-sm transition-all duration-100 ease-in-out hover:shadow-md flex items-center justify-center"
              style={{
                width: `${metrics.itemSize}px`,
                height: `${metrics.itemSize}px`,
              }}
            >
              {item.content || (
                <div className="bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicGrid;


;

//MAIN CODE BELOW

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';

interface GridItem {
  id: number;
  size: number;
}

const DynamicGrid: React.FC = () => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [itemSize, setItemSize] = useState<number>(90); // Initial size of grid items
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<number>(2); // Initial number of columns
  const [rows, setRows] = useState<number>(2); // Initial number of rows

  // Calculate total number of items needed based on viewport size
  useEffect(() => {
    const calculateItems = () => {
      const viewportWidth = window.innerWidth;
      let newColumns = columns;
      
      // Responsive column calculation
      if (viewportWidth < 768) { // mobile
        newColumns = 2;
      } else if (viewportWidth < 1024) { // tablet
        newColumns = 10;
      } else { // desktop
        newColumns = Math.floor(viewportWidth / (itemSize + 8)); // 8px for gap
      }

      // Responsive row calculation
      let newRows = rows;
      if (viewportWidth < 768) {
        newRows = 2;
      } else if (viewportWidth < 1024) {
        newRows = 3;
      } else {
        newRows = 5;
      }

      setColumns(newColumns);
      setRows(newRows);
      
      // Create grid items array
      const totalItems = newColumns * newRows;
      const newItems: GridItem[] = Array.from({ length: totalItems }, (_, index) => ({
        id: index,
        size: itemSize,
      }));
      setGridItems(newItems);
    };

    calculateItems();
    window.addEventListener('resize', calculateItems);
    return () => window.removeEventListener('resize', calculateItems);
  }, [itemSize, columns, rows]);

  // Handle size increase
  const handleIncrease = () => {
    setItemSize(prevSize => Math.min(prevSize + 10, 180)); // Max size limit of 150px
  };

  // Handle size decrease
  const handleDecrease = () => {
    setItemSize(prevSize => Math.max(prevSize - 10, 40)); // Min size limit of 60px
  };

  return (
    <div className="p-1">
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleIncrease}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={16} /> Increase Size
        </button>
        <button
          onClick={handleDecrease}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Minus size={16} /> Decrease Size
        </button>
      </div>

      <div
        ref={containerRef}
        className="border border-gray-100 w-full lg:w-[calc(100vw-33%-28px)] overflow-auto"
        style={{
          height: `${(Math.min(rows * (itemSize + 3), window.innerHeight - 150))-5}px`,
          padding: '2px'
        }}
      >
        <div
          className="grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${columns}, ${itemSize}px)`,
            width: 'fit-content'
          }}
        >
          {gridItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-200 flex items-center justify-center"
              style={{
                width: `${itemSize}px`,
                height: `${itemSize}px`
              }}
            >
              <div className="text-gray-400">SVG</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicGrid;


