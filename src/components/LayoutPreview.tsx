import React from 'react';

const EmptyContainer: React.FC = () => {
    return (
        <div className="w-full h-auto overflow-auto">
    <div className="grid gap-1 overflow-hidden w-full 
        h-[200px] sm:h-[200px] md:h-[300px] lg:h-[500px] grid-rows-2"
        style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(95px, 1fr))",
            gridAutoRows: "repeat(auto-fill, minmax(90px, auto))",
        }}
    >
        {Array.from({ length: 100 }).map((_, index) => (
            <div
                key={index}
                className="bg-gray-200 w-full h-full max-w-[135px] sm:max-w-[120px] max-h-[135px] sm:max-h-[120px] object-cover"
            >
                {/* Content for each grid item goes here */}
            </div>
        ))}
    </div>
</div>

    );
};

export default EmptyContainer;