import React from 'react';
import logo from '../assets/icons/logo.svg';
const Header: React.FC = () => {
  return (
    <header className="px-6 py-4 flex items-center justify-between bg-white">
      <img className="w-56 h-12" src={logo} alt="Logo" />
      <div className="mt-2 flex justify-center">
      </div>
      <div className="text-3xl font-bold font-mermaid">
        <span className="text-[#191919]">Layout </span>
        <span className="text-[#cb9b52]">Designer</span>
      </div>
    </header>
  );
};

export default Header;
