// src/App.tsx
import React, { useState } from 'react';
import Grid from '../components/gridGpt/Grid';
import GridControls from '../components/gridGpt/GridControls';

const DynamicGrid: React.FC = () => {
    const [itemCount, setItemCount] = useState(10);
    const baseItemSize = 90;
    const maxRange = 110;
    const initialRows = 2;

    const increaseItems = () => setItemCount(itemCount + 1);
    const decreaseItems = () => setItemCount(Math.max(0, itemCount - 1));

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Dynamic Responsive Grid</h1>
            <Grid baseItemSize={baseItemSize} maxRange={maxRange} initialRows={initialRows} />
            <GridControls increaseItems={increaseItems} decreaseItems={decreaseItems} />
        </div>
    );
};

export default DynamicGrid;
