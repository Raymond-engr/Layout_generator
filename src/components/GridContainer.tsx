import React from 'react';

const GridContainer: React.FC = () => {
    return (
        <div className="my-4 lg:py-4 lg:pl-6 w-full h-auto overflow-auto">
            <div className="grid gap-0.5 overflow-auto w-full h-[200px] sm:h-[200px] md:h-[300px] lg:h-[490px]"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
                    gridTemplateRows: "repeat(auto-fill, minmax(95px, auto))", // Base height for each grid item
                }}
            >
                {Array.from({ length: 100 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 w-full h-full max-w-[120px] max-h-[120px] relative object-cover"
                    >
                        {/* Content for each grid item goes here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GridContainer;