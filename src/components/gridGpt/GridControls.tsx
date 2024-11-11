// src/components/GridControls.tsx
import React from 'react';

type GridControlsProps = {
    increaseItems: () => void;
    decreaseItems: () => void;
};

const GridControls: React.FC<GridControlsProps> = ({ increaseItems, decreaseItems }) => {
    return (
        <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white" onClick={increaseItems}>
                Increase
            </button>
            <button className="px-4 py-2 bg-red-500 text-white" onClick={decreaseItems}>
                Decrease
            </button>
        </div>
    );
};

export default GridControls;
