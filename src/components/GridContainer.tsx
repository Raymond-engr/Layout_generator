import React, { useEffect, useState, useRef } from 'react';

interface GridItemProps {
  index: number;
  size: number;
}

const GridItem: React.FC<GridItemProps> = ({ index, size }) => {
  return (
    <div 
      className="flex items-center justify-center bg-blue-100 transition-all duration-300"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <span className="text-blue-600 font-medium">{index + 1}</span>
    </div>
  );
};

const ResponsiveGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemSize, setItemSize] = useState(90);
  const [itemCount, setItemCount] = useState(0);
  const [baseSize, setBaseSize] = useState(90);
  const [originalSize, setOriginalSize] = useState(90);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [containerScale, setContainerScale] = useState(1);
  
  const MIN_ITEM_SIZE = 60; // Minimum size for grid items
  const MAX_ITEM_SIZE = 200; // Maximum size for grid items
  const SIZE_STEP = 10; // Size increment/decrement step
  
  const getDesiredRows = () => {
    if (typeof window === 'undefined') return 2;
    if (window.matchMedia('(min-width: 1024px)').matches) return 5; // lg
    if (window.matchMedia('(min-width: 768px)').matches) return 3; // md
    return 2; // default
  };

  useEffect(() => {
    const updateLayout = () => {
      if (!isOverflowing) {
        const container = containerRef.current;
        if (!container) return;

        const containerWidth = container.offsetWidth - 10;
        const gap = 0;
        const rows = getDesiredRows();

        const calculateLayout = (startSize: number) => {
          const maxSize = startSize + 20;
          let currentSize = startSize;
          let columns = Math.floor((containerWidth + gap) / (currentSize + gap));
          
          const maxPossibleSize = Math.floor((containerWidth + gap) / columns) - gap;
          
          if (maxPossibleSize <= maxSize) {
            currentSize = maxPossibleSize;
          } else {
            columns += 1;
            currentSize = Math.floor((containerWidth + gap) / columns) - gap;
            currentSize = Math.max(startSize, currentSize);
          }

          return { size: currentSize, columns };
        };

        const { size, columns } = calculateLayout(baseSize);
        const newItemCount = columns * rows;

        setItemSize(size);
        setItemCount(newItemCount);
        setOriginalSize(size);
      }
    };

    const resizeObserver = new ResizeObserver(updateLayout);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [baseSize, isOverflowing]);

  const handleIncrease = () => {
    if (!isOverflowing && itemSize >= originalSize) {
      setIsOverflowing(true);
    }
    
    if (itemSize < MAX_ITEM_SIZE) {
      setItemSize(prev => Math.min(prev + SIZE_STEP, MAX_ITEM_SIZE));
    }
  };

  const handleDecrease = () => {
    if (isOverflowing) {
      const newSize = itemSize - SIZE_STEP;
      setItemSize(newSize);
      
      if (newSize <= originalSize) {
        setIsOverflowing(false);
        setItemSize(originalSize);
      }
    } else {
      if (itemSize > MIN_ITEM_SIZE) {
        setItemSize(prev => Math.max(prev - SIZE_STEP, MIN_ITEM_SIZE));
        setContainerScale(prev => Math.max(prev - 0.1, 0.6));
      }
    }
  };

  const gridStyle = {
    display: 'grid',
    gap: '1px',
    gridTemplateRows: `repeat(${getDesiredRows()}, minmax(0, 1fr))`,
    gridTemplateColumns: `repeat(auto-fit, minmax(${itemSize}px, 1fr))`,
    gridAutoFlow: 'column',
    height: '100%',
    transform: !isOverflowing ? `scale(${containerScale})` : 'none',
    transformOrigin: 'top left',
  };

  return (
    <div className="flex flex-col space-y-4">
      <div 
        ref={containerRef}
        className={`w-full h-auto mt-2 p-1 ${isOverflowing ? 'overflow-auto' : 'overflow-hidden'}`}
        style={{ height: isOverflowing ? '200px' : 'auto' }}
      >
        <div 
          className="w-full lg:max-w-[calc(100vw-33%-28px)]" 
          style={gridStyle}
        >
          {Array.from({ length: itemCount }, (_, index) => (
            <GridItem 
              key={index}
              index={index}
              size={itemSize}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleDecrease}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled={itemSize <= MIN_ITEM_SIZE && containerScale <= 0.6}
        >
          Decrease Size
        </button>
        <button
          onClick={handleIncrease}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled={itemSize >= MAX_ITEM_SIZE}
        >
          Increase Size
        </button>
      </div>
    </div>
  );
};

export default ResponsiveGrid;