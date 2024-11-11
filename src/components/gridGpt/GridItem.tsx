// src/components/GridItem.tsx
import React from 'react';

type GridItemProps = {
    size: number;
};

const GridItem: React.FC<GridItemProps> = ({ size }) => {
    return (
        <div
            className="bg-gray-200"
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        ></div>
    );
};

export default GridItem;
