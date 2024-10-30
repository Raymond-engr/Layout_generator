import React from 'react';
import logo from '../assets/logo.svg';
import UnitToggle from '../components/UnitToggle';
const Header: React.FC = () => {
  return (
    <header className="px-8 flex items-center justify-between p-4 bg-white">
      <img className="w-56 h-12" src={logo} alt="Logo" />
      <div className="mt-2 flex justify-center">
        <UnitToggle />
      </div>
      <div className="text-3xl font-bold font-[Mermaid]">
        <span className="text-[#191919]">Layout </span>
        <span className="text-[#cb9b52]">Designer</span>
      </div>
    </header>
  );
};

export default Header;
