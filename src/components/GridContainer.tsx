import React, { useEffect, useState, useRef } from 'react';

interface GridItemProps {
  index: number;
  size: number;
}

const GridItem: React.FC<GridItemProps> = ({ index, size }) => {
  return (
    <div 
      className="flex items-center justify-center bg-blue-100"
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
  
  const getDesiredRows = () => {
    if (typeof window === 'undefined') return 2;
    if (window.matchMedia('(min-width: 1024px)').matches) return 5; // lg
    if (window.matchMedia('(min-width: 768px)').matches) return 3; // md
    return 2; // default
  };

  useEffect(() => {
    const updateLayout = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth - 10; // Accounting for padding (2 * 4px)
      const containerHeight = container.offsetHeight - 8;
      const gap = 1; // 0.5rem gap
      const rows = getDesiredRows();

      // Calculate how many columns can fit
      const calculateLayout = (startSize: number) => {
        const maxSize = startSize + 20; // 20px growth range
        let currentSize = startSize;
        let columns = Math.floor((containerWidth + gap) / (currentSize + gap));
        
        // Try to grow items within the 20px range
        const maxPossibleSize = Math.floor((containerWidth + gap) / columns) - gap;
        
        if (maxPossibleSize <= maxSize) {
          currentSize = maxPossibleSize;
        } else {
          // If we exceed the growth range, add a column and reset size
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
    };

    const resizeObserver = new ResizeObserver(updateLayout);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [baseSize]);

  const gridStyle = {
    display: 'grid',
    gap: '1px',
    gridTemplateRows: `repeat(${getDesiredRows()}, minmax(0, 1fr))`,
    gridTemplateColumns: `repeat(auto-fit, minmax(${itemSize}px, 1fr))`,
    gridAutoFlow: 'column',
    height: '100%',
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-auto mt-2 p-1 overflow-auto"
    >
      <div className="w-full lg:max-w-[calc(100vw-33%-28px)]" style={gridStyle}>
        {Array.from({ length: itemCount }, (_, index) => (
          <GridItem 
            key={index}
            index={index}
            size={itemSize}
          />
        ))}
      </div>
    </div>
  );
};

export default ResponsiveGrid;