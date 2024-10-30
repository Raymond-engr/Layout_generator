import React from "react";
const CollectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex text-[#191919] text-lg font-['Mermaid'] font-bold break-words">
    {title}
    <IconContainer />
  </div>
);

const IconContainer: React.FC = () => (
  <div className="w-5 h-5 relative">

  </div>
);

const CollectionOptions: React.FC = () => {
  return (
    <div className="flex md:grid items-center gap-2 mt-4 ml-11">
      <CollectionHeader title="Pick Collection" />
      <CollectionHeader title="See All" />
    </div>
  );
};

export default CollectionOptions;
