import React from 'react';

function Test() {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center">
      <Header />
      <div className="relative w-[1512px] h-[982px]">
        <DimensionSelector />
        <CollectionPicker />
        <TileGrid />
        <TotalDisplay />
        <ActionButtonGroup />
      </div>
    </div>
  );
}

// 1. Header Component
const Header = () => (
  <header className="flex justify-between items-center mt-5 mx-20">
    <img className="w-56 h-12" src="https://via.placeholder.com/224x48" alt="Logo" />
    <h1 className="text-3xl font-bold">
      <span className="text-[#191919]">Layout </span>
      <span className="text-[#cb9b52]">Designer</span>
    </h1>
  </header>
);

// 2. Dimension Selector
const DimensionSelector = () => (
  <div className="flex gap-4 mt-10 ml-20">
    <DimensionInput label="Height" />
    <DimensionInput label="Width" />
    <UnitToggle />
  </div>
);

const DimensionInput = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center">
    <label className="text-[#cc9c53] font-medium">{label}</label>
    <div className="w-[110px] h-[37px] bg-[#fbfbfb] rounded-full border border-[#e7e7e7] flex items-center justify-center">
      <span className="text-black">--</span>
    </div>
  </div>
);

const UnitToggle = () => (
  <div className="flex items-center">
    <div className="bg-[#2f3825] text-white rounded-full p-2 cursor-pointer">cm</div>
    <div className="text-[#303825] p-2">in</div>
  </div>
);

// 3. Collection Picker
const CollectionPicker = () => (
  <div className="flex flex-col mt-5 ml-20">
    <h2 className="text-lg font-bold text-[#191919]">Pick Collection</h2>
    <button className="text-lg font-bold text-[#191919] mt-2">See All</button>
  </div>
);

// 4. Tile Grid
const TileGrid = () => (
  <div className="mt-10 mx-auto w-[889px] h-[509px] bg-neutral-50 rounded-sm">
    <p className="text-center text-[#606060] mt-[50%]">Please choose a tile model</p>
  </div>
);

// 5. Action Button Group
const ActionButtonGroup = () => (
  <div className="flex gap-6 mt-10 ml-[30%]">
    {['Randomize', 'Rotate All', 'Save Layout', 'Add to Cart'].map((label, index) => (
      <ActionButton key={index} label={label} isPrimary={label === 'Add to Cart'} />
    ))}
  </div>
);

const ActionButton = ({ label, isPrimary }: { label: string; isPrimary?: boolean }) => (
  <button
    className={`px-4 py-2 rounded-full border ${isPrimary ? 'bg-[#f6e2c4]' : 'opacity-50'}`}
  >
    {label}
  </button>
);

// 6. Total Display
const TotalDisplay = () => (
  <div className="flex justify-end items-center mr-20 mt-10">
    <span className="text-base font-medium mr-2">TOTAL:</span>
    <span className="text-base font-medium">--</span>
  </div>
);

export default Test;



import React from 'react';

const EmptyContainer: React.FC = () => {
  const isEmpty = true; // Set to `true` if the container is empty

  return (
    <div className="w-[889px] h-[509px] bg-neutral-50 rounded-sm flex items-center justify-center">
      {isEmpty ? (
        <div className="text-gray-400 text-lg font-medium">
          No items to display
        </div>
      ) : (
        // Render content here when not empty
        <div>
          {/* Content goes here */}
        </div>
      )}
    </div>
  );
};

export default EmptyContainer;


<div className="w-full h-auto bg-neutral-50 rounded-sm flex items-center justify-center">
      {isEmpty ? (
        <div className="text-gray-400 text-lg font-medium">
          No items to display
        </div>
      ) : (
        // Render content here when not empty
        <div>
          {/* Content goes here */}
          <div className="w-full h-auto relative">
  <div className="grid grid-cols-4 grid-rows-4 gap-0.5 w-[240px] h-[240px]">
    {Array.from({ length: 4 * 4 }).map((_, index) => (
      <div key={index} className="w-full h-auto bg-gray-200 relative object-cover">
        {/* Content for each grid item goes here */}
      </div>
    ))}
  </div>
</div>
        </div>
      )}
    </div>





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



import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';

interface GridItem {
  id: number;
  size: number;
}

const DynamicGrid: React.FC = () => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [itemSize, setItemSize] = useState<number>(90); // Initial size of grid items
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState<number>(5); // Initial number of columns
  const [rows, setRows] = useState<number>(2); // Initial number of rows

  // Calculate the total number of items needed based on viewport size
  useEffect(() => {
    const calculateItems = () => {
      const viewportWidth = window.innerWidth;
      let newColumns = columns;

      // Responsive column calculation based on viewport width
      if (viewportWidth < 768) { // mobile
        newColumns = 5;
      } else if (viewportWidth < 1024) { // tablet
        newColumns = 6;
      } else { // desktop
        newColumns = Math.floor(viewportWidth / (itemSize + 3)); // 8px for gap between items
      }

      // Responsive row calculation based on viewport width
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

      // Calculate the total number of grid items needed and create an array
      const totalItems = newColumns * newRows;
      const newItems = Array.from({ length: totalItems }, (_, index) => ({
        id: index,
        size: itemSize,
      }));
      setGridItems(newItems);
    };

    calculateItems();
    window.addEventListener('resize', calculateItems);
    return () => window.removeEventListener('resize', calculateItems);
  }, [itemSize]);

  // Increase item size with a max limit of 150px
  const handleIncrease = () => {
    const newSize = Math.min(itemSize + 10, 150);
    setItemSize(newSize);
  };

  // Decrease item size with a min limit of 60px
  const handleDecrease = () => {
    const newSize = Math.max(itemSize - 10, 60);
    setItemSize(newSize);
  };

  return (
    <div className="p-4">
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
        className="border border-gray-100g overflow-auto"
        style={{
          width: `${Math.min(columns * (itemSize + 3), window.innerWidth - 32)}px`,
          height: `${Math.min(rows * (itemSize + 3), window.innerHeight - 150)}px`,
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
              {/* Placeholder for SVG */}
              <div className="text-gray-400">SVG</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicGrid;





  // components/DynamicGrid.tsx
  import React, { useRef, useCallback } from 'react';
  import useGridCalculations from '../hooks/useGridCalculations';

  const GRID_CONSTANTS = {
    MIN_ITEM_SIZE: 60,
    MAX_ITEM_SIZE: 120,
    INITIAL_ITEM_SIZE: 90,
    SIZE_STEP: 10,
    MIN_COLUMNS: 5,
    BREAKPOINTS: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    ROW_COUNTS: {
      sm: 2,
      md: 3,
      lg: 5,
      xl: 5,
    },
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
  
    React.useEffect(() => {
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
    }, [metrics.itemSize, updateGrid]);
  
    return (
      <div className="w-full p-4 space-y-4">
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
          className="relative overflow-auto border border-gray-200 rounded-lg"
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
          }}
        >
          <div
            className="grid gap-4 p-4"
            style={{
              width: `${metrics.columns * metrics.itemSize}px`,
              gridTemplateColumns: `repeat(${metrics.columns}, ${metrics.itemSize}px)`,
              gridAutoRows: `${metrics.itemSize}px`,
            }}
          >
            {items.map(item => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg shadow-sm transition-all duration-200 ease-in-out hover:shadow-md flex items-center justify-center"
                style={{
                  width: `${metrics.itemSize}px`,
                  height: `${metrics.itemSize}px`,
                }}
              >
                {item.content || (
                  <div className="w-1/2 h-1/2 bg-gray-200 rounded-md" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default DynamicGrid;




  

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Minus } from 'lucide-react';

interface GridItem {
  id: number;
  size: number;
}

const DynamicGrid: React.FC = () => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [itemSize, setItemSize] = useState<number>(90); // Initial size of grid items
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState<number>(5); // Initial number of columns
  const [rows, setRows] = useState<number>(2); // Initial number of rows

  // Responsive column calculation based on viewport width
  const calculateColumns = useCallback((): number => {
    if (!containerRef.current) return 2;
    const containerWidth = containerRef.current.clientWidth;
    return Math.floor(containerWidth / itemSize);
  }, [containerRef, itemSize]);

  // Calculate the total number of items needed based on viewport size
  useEffect(() => {
    const calculateItems = () => {
      const viewportWidth = window.innerWidth;
      let newColumns = columns;

      newColumns = calculateColumns();

      // Responsive row calculation based on viewport width
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

      // Calculate the total number of grid items needed and create an array
      const totalItems = newColumns * newRows;
      const newItems = Array.from({ length: totalItems }, (_, index) => ({
        id: index,
        size: itemSize,
      }));
      setGridItems(newItems);
    };

    calculateItems();
    window.addEventListener('resize', calculateItems);
    return () => window.removeEventListener('resize', calculateItems);
  }, [itemSize, calculateColumns, columns, rows]);

  // Increase item size with a max limit of 150px
  const handleIncrease = () => {
    const newSize = Math.min(itemSize + 10, 150);
    setItemSize(newSize);
  };

  // Decrease item size with a min limit of 60px
  const handleDecrease = () => {
    const newSize = Math.max(itemSize - 10, 60);
    setItemSize(newSize);
  };

  const containerWidth = `${calculateColumns() * itemSize}px`;

  return (
    <div className="p-4">
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
        className="border border-gray-200g overflow-auto"
        style={{
          width: `${Math.min(columns * (itemSize + 3), window.innerWidth - 32)}px`,
          height: `${Math.min(rows * (itemSize + 3), window.innerHeight - 150)}px`,
          padding: '2px',
          maxWidth: '100%',
          maxHeight: '80vh',
        }}
      >
        <div
          className="grid gap-0.5"
          style={{
            width: containerWidth,
            gridTemplateColumns: `repeat(${calculateColumns()}, ${itemSize}px)`,
            gridAutoRows: `${itemSize}px`,
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
              {/* Placeholder for SVG */}
              <div className="text-gray-400">SVG</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicGrid;





import React, { useState, useEffect, useRef, useCallback } from 'react';

interface GridItem {
  id: number;
}

const DynamicGrid: React.FC = () => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [itemSize, setItemSize] = useState<number>(90);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Constants
  const MIN_ITEM_SIZE = 60;
  const MAX_ITEM_SIZE = 120;
  const SIZE_STEP = 10;
  const MIN_COLUMNS = 5;

  // Calculate number of rows based on screen size
  const getRowCount = (): number => {
    if (window.innerWidth >= 1024) return 5; // lg
    if (window.innerWidth >= 768) return 3;  // md
    return 2; // default
  };

  // Calculate number of columns that fit in the container
  const calculateColumns = useCallback((): number => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    return Math.max(MIN_COLUMNS, Math.floor(containerWidth / itemSize));
  }, [containerRef, itemSize]);

  // Generate grid items
  const generateItems = (columns: number, rows: number): GridItem[] => {
    return Array.from({ length: columns * rows }, (_, i) => ({ id: i }));
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const columns = calculateColumns();
      const rows = getRowCount();
      setGridItems(generateItems(columns, rows));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemSize, calculateColumns]);

  // Handle size adjustments
  const handleIncreaseSize = () => {
    setItemSize((prev) => Math.min(prev + SIZE_STEP, MAX_ITEM_SIZE));
  };

  const handleDecreaseSize = () => {
    setItemSize((prev) => Math.max(prev - SIZE_STEP, MIN_ITEM_SIZE));
  };

  // Calculate container width based on columns
  const containerWidth = `${calculateColumns() * itemSize}px`;

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleDecreaseSize}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Decrease Size
        </button>
        <button
          onClick={handleIncreaseSize}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increase Size
        </button>
      </div>

      <div
        ref={containerRef}
        className="overflow-auto border border-gray-200"
        style={{
          maxWidth: '100%',
          maxHeight: '80vh',
        }}
      >
        <div
          className="grid gap-0.5 p-1"
          style={{
            width: containerWidth,
            gridTemplateColumns: `repeat(${calculateColumns()}, ${itemSize}px)`,
            gridAutoRows: `${itemSize}px`,
          }}
        >
          {gridItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-200 flex items-center justify-center"
              style={{
                width: `${itemSize}px`,
                height: `${itemSize}px`,
              }}
            >
              {/* Placeholder for SVG */}
              <div className=" bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicGrid;
