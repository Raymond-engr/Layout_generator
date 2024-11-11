// src/components/Grid.tsx
import React, { useEffect, useState } from 'react';
import GridItem from './GridItem';
import { calculateGridSize } from '../../lib/utils';

type GridProps = {
    baseItemSize: number;
    maxRange: number;
    initialRows: number;
};

const Grid: React.FC<GridProps> = ({ baseItemSize, maxRange, initialRows }) => {
    const [containerWidth, setContainerWidth] = useState(window.innerWidth);
    const [itemSize, setItemSize] = useState(baseItemSize);
    const [columns, setColumns] = useState(1);

    // Update grid layout on resize
    useEffect(() => {
        const handleResize = () => {
            setContainerWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const { columns, itemSize } = calculateGridSize(containerWidth, baseItemSize, maxRange);
        setColumns(columns);
        setItemSize(itemSize);
    }, [containerWidth, baseItemSize, maxRange]);

    // Grid item count is dynamic, but initially fills the container with the specified rows
    const gridItems = Array(columns * initialRows).fill(0);

    return (
        <div
            className="grid overflow-auto"
            style={{
                gridTemplateColumns: `repeat(${columns}, ${itemSize}px)`,
                gridAutoRows: `${itemSize}px`,
            }}
        >
            {gridItems.map((_, index) => (
                <GridItem key={index} size={itemSize} />
            ))}
        </div>
    );
};

export default Grid;
