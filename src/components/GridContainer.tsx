import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';

const DynamicGrid = () => {
  const [gridItems, setGridItems] = useState([]);
  const [itemSize, setItemSize] = useState(90); // Initial size of grid items
  const containerRef = useRef(null);
  const [columns, setColumns] = useState(5); // Initial number of columns
  const [rows, setRows] = useState(2); // Initial number of rows

  // Calculate total number of items needed based on viewport size
  useEffect(() => {
    const calculateItems = () => {
      const viewportWidth = window.innerWidth;
      let newColumns = columns;
      
      // Responsive column calculation
      if (viewportWidth < 768) { // mobile
        newColumns = 5;
      } else if (viewportWidth < 1024) { // tablet
        newColumns = 6;
      } else { // desktop
        newColumns = Math.floor(viewportWidth / (itemSize + 4)); // 8px for gap
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
      const newItems = Array.from({ length: totalItems }, (_, index) => ({
        id: index,
        size: itemSize
      }));
      setGridItems(newItems);
    };

    calculateItems();
    window.addEventListener('resize', calculateItems);
    return () => window.removeEventListener('resize', calculateItems);
  }, [itemSize]);

  // Handle size increase
  const handleIncrease = () => {
    const newSize = Math.min(itemSize + 10, 150); // Max size limit of 150px
    setItemSize(newSize);
  };

  // Handle size decrease
  const handleDecrease = () => {
    const newSize = Math.max(itemSize - 10, 60); // Min size limit of 60px
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
        className="border border-gray-200 rounded-lg overflow-auto"
        style={{
          width: `${Math.min(columns * (itemSize + 4), window.innerWidth - 32)}px`,
          height: `${Math.min(rows * (itemSize + 4), window.innerHeight - 150)}px`,
          padding: '4px'
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