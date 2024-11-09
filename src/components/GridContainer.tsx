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
        newColumns = 6;
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
        className="border border-gray-100 overflow-auto"
        style={{
          width: `${Math.min(columns * (itemSize + 2), window.innerWidth - 32)}px`,
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
              <div className="text-gray-400">SVG</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicGrid;
