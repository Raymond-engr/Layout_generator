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








import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGridContext } from './gridClaude/GridContext';
import { GridItem, Dimensions, SizePreset } from '../types/types';
import { calculateSquareMeters, calculateTileCount} from '../lib/utils'

const INITIAL_ITEM_SIZE = 90;
const GROWTH_RANGE = 20;
const DEFAULT_ROWS = 2;

const SIZE_PRESETS: SizePreset[] = [
  { 
    name: '9x9 cm',
    dimensions: '90x90',
    squareMeter: 0.05,
    tileSize: 90
  },
  {
    name: '13.5x13.5 cm',
    dimensions: '135x135',
    squareMeter: 0.04,
    tileSize: 135
  }
];

const DynamicGrid: React.FC<{
  onSave?: (preview: { items: GridItem[], dimensions: Dimensions }) => void;
}> = ({ onSave }) => {
  const [itemSize, setItemSize] = useState(INITIAL_ITEM_SIZE);
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [dimensions, setDimensions] = useState<Dimensions>({ height: 0, width: 0 });
  const [activePreset, setActivePreset] = useState<string>(SIZE_PRESETS[0].name);
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [tileCount, setTileCount] = useState(0);
  const [squareMeter, setSquareMeter] = useState(SIZE_PRESETS[0].squareMeter);

  const containerRef = useRef<HTMLDivElement>(null);
  const { svgContent } = useGridContext();

  const calculateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const currentColumns = Math.floor(containerWidth / itemSize);
    const newItemSize = containerWidth / currentColumns;

    // Handle breakpoint-based rows
    const newRows = window.innerWidth >= 1024 ? 5 : 
                   window.innerWidth >= 768 ? 3 : 
                   DEFAULT_ROWS;

    if (!isCustomSize) {
      setRows(newRows);
    }

    // Calculate if we need to add a column
    if (newItemSize > itemSize + GROWTH_RANGE) {
      setItemSize(INITIAL_ITEM_SIZE);
      setColumns(currentColumns + 1);
    } else {
      setItemSize(newItemSize);
      setColumns(currentColumns);
    }

    // Generate grid items
    const items: GridItem[] = [];
    const totalItems = currentColumns * (isCustomSize ? rows : newRows);

    for (let i = 0; i < totalItems; i++) {
      const row = Math.floor(i / currentColumns);
      const column = i % currentColumns;
      items.push({
        id: `item-${i}`,
        width: newItemSize,
        height: newItemSize,
        row,
        column
      });
    }

    setGridItems(items);
  }, [itemSize, rows, isCustomSize]);

  // Handle dimension inputs
  const handleDimensionChange = (type: keyof Dimensions, value: string) => {
    const numValue = parseInt(value) || 0;
    setDimensions(prev => ({ ...prev, [type]: numValue }));
    setIsCustomSize(true);

    if (type === 'width' && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newColumns = Math.floor(numValue / INITIAL_ITEM_SIZE);
      setColumns(newColumns);
      setItemSize(containerWidth / newColumns);
    }

    if (type === 'height') {
      const newRows = Math.floor(numValue / INITIAL_ITEM_SIZE);
      setRows(newRows);
    }

    // Update tile count and square meters
    const newTileCount = calculateTileCount(
      type === 'width' ? numValue : dimensions.width,
      type === 'height' ? numValue : dimensions.height,
      INITIAL_ITEM_SIZE
    );
    setTileCount(newTileCount);

    const newSquareMeter = calculateSquareMeters(
      type === 'width' ? numValue : dimensions.width,
      type === 'height' ? numValue : dimensions.height
    );
    setSquareMeter(newSquareMeter);
  };

  // Handle grid manipulation
  const increaseGridItems = () => {
    if (!isCustomSize) {
      const newRows = rows + 1;
      setRows(newRows);
      calculateLayout();
    }
  };

  const decreaseGridItems = () => {
    if (!isCustomSize && rows > DEFAULT_ROWS) {
      const newRows = rows - 1;
      setRows(newRows);
      calculateLayout();
    } else if (!isCustomSize) {
      setItemSize(prev => Math.max(prev - 10, 50));
    }
  };

  // Handle save functionality
  const handleSave = () => {
    if (onSave) {
      onSave({
        items: gridItems,
        dimensions
      });
    }
  };

  useEffect(() => {
    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, [calculateLayout]);

  return (
    <div className="flex flex-col gap-4">
      {/* Input controls */}
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Height (mm)</label>
          <input
            type="number"
            value={dimensions.height || ''}
            onChange={(e) => handleDimensionChange('height', e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Width (mm)</label>
          <input
            type="number"
            value={dimensions.width || ''}
            onChange={(e) => handleDimensionChange('width', e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex gap-4">
        {SIZE_PRESETS.map(preset => (
          <button
            key={preset.name}
            onClick={() => {
              setActivePreset(preset.name);
              setIsCustomSize(false);
              setItemSize(preset.tileSize);
              setSquareMeter(preset.squareMeter);
              calculateLayout();
            }}
            className={`px-4 py-2 rounded ${
              activePreset === preset.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Grid container */}
      <div
        ref={containerRef}
        className="grid gap-1 transition-all duration-300"
        style={{
          gridTemplateColumns: `repeat(${columns}, ${itemSize}px)`,
          width: 'fit-content',
          maxHeight: isCustomSize ? '400px' : 'auto',
          overflowY: isCustomSize ? 'auto' : 'visible',
          overflowX: 'hidden'
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
            {svgContent[item.row]}
          </div>
        ))}
      </div>

      {/* Controls */}
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
        {(dimensions.height > 0 && dimensions.width > 0) && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        )}
      </div>

      {/* Metrics */}
      <div className="text-sm text-gray-600">
        <div>{squareMeter.toFixed(2)} SQUARE METER</div>
        {tileCount > 0 && <div>{tileCount} tiles</div>}
      </div>
    </div>
  );
};

export default DynamicGrid;