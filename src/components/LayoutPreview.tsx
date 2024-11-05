import React from 'react';

const EmptyContainer: React.FC = () => {
    return (
        <div className="w-full h-auto relative">
  <div className="grid grid-cols-4 grid-rows-4 gap-0.5 w-[360px] h-[360px]">
    {Array.from({ length: 4 * 4 }).map((_, index) => (
      <div key={index} className="w-full h-auto bg-gray-200 relative object-cover">
        {/* Content for each grid item goes here */}
      </div>
    ))}
  </div>
</div>
    );
};

export default EmptyContainer;
