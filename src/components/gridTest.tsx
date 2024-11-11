import React, { useState, useEffect, useCallback } from 'react';

interface GridItem {
  id: string;
  width: number;
  height: number;
}

interface GridProps {
  initialItemSize?: number;
  growthRange?: number;
  defaultRows?: number;
  isFixedRows?: boolean;
  className?: string;
}

const DynamicGrid: React.FC<GridProps> = ({
  initialItemSize = 90,
  growthRange = 20,
  defaultRows = 2,
  isFixedRows = true,
  className = '',
}) => {
  const [itemSize, setItemSize] = useState(initialItemSize);
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(defaultRows);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const calculateColumns = useCallback((containerWidth: number, currentItemSize: number) => {
    return Math.floor(containerWidth / currentItemSize);
  }, []);

  const calculateTotalItems = useCallback((cols: number, rows: number) => {
    return cols * rows;
  }, []);

  const initializeGridItems = useCallback((totalItems: number, size: number) => {
    return Array.from({ length: totalItems }, (_, index) => ({
      id: `item-${index}`,
      width: size,
      height: size,
    }));
  }, []);

  const handleResize = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    setContainerWidth(containerWidth);

    const maxItemSize = itemSize + growthRange;
    const currentColumns = calculateColumns(containerWidth, itemSize);
    const potentialColumns = calculateColumns(containerWidth, maxItemSize);

    if (potentialColumns < currentColumns) {
      setItemSize(prevSize => {
        const newSize = Math.min(prevSize + 1, maxItemSize);
        if (newSize === maxItemSize) {
          // Reset size and add column
          setTimeout(() => setItemSize(initialItemSize), 0);
        }
        return newSize;
      });
    }

    setColumns(currentColumns);
    const totalItems = calculateTotalItems(currentColumns, rows);
    setGridItems(initializeGridItems(totalItems, itemSize));
  }, [itemSize, growthRange, rows, calculateColumns, calculateTotalItems, initializeGridItems, initialItemSize]);

  const increaseGridItems = () => {
    const newRows = rows + 1;
    setRows(newRows);
    const totalItems = calculateTotalItems(columns, newRows);
    setGridItems(initializeGridItems(totalItems, itemSize));
  };

  const decreaseGridItems = () => {
    if (rows <= defaultRows) {
      setItemSize(prev => Math.max(prev - 10, 50)); // Minimum size limit
      return;
    }
    const newRows = rows - 1;
    setRows(newRows);
    const totalItems = calculateTotalItems(columns, newRows);
    setGridItems(initializeGridItems(totalItems, itemSize));
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className={`grid gap-1 transition-all duration-300 ${className}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, ${itemSize}px)`,
          width: 'fit-content',
        }}
      >
        {gridItems.map(item => (
          <div
            key={item.id}
            className="bg-gray-200 transition-all duration-300"
            style={{
              width: `${itemSize}px`,
              height: `${itemSize}px`,
            }}
          >
            <div className="text-gray-400">SVG</div>
            </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={decreaseGridItems}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Decrease
        </button>
        <button
          onClick={increaseGridItems}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Increase
        </button>
      </div>
    </div>
  );
};

export default DynamicGrid;