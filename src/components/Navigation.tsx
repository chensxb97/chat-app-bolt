import React from 'react';
import { Menu, MessageSquare, Users, Settings } from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  toggleNav: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, toggleNav }) => {
  return (
    <div className="h-full flex">
      <div className={`h-full bg-gray-900 text-white transition-all duration-300 flex flex-col ${
        isOpen ? 'w-48' : 'w-14'
      }`}>
        <div>
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-800"
            onClick={toggleNav}
          >
            <h1 className={`font-bold ${isOpen ? 'block' : 'hidden'}`}>Chat App</h1>
            <Menu size={20} className="flex-shrink-0" />
          </div>
          <div className="px-2">
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 py-2 px-3 hover:bg-gray-700 rounded">
                <MessageSquare size={20} />
                <span className={isOpen ? 'block' : 'hidden'}>Channel #1</span>
              </button>
              <button className="w-full flex items-center gap-3 py-2 px-3 hover:bg-gray-700 rounded">
                <Users size={20} />
                <span className={isOpen ? 'block' : 'hidden'}>Channel #2</span>
              </button>
              <button className="w-full flex items-center gap-3 py-2 px-3 hover:bg-gray-700 rounded">
                <Settings size={20} />
                <span className={isOpen ? 'block' : 'hidden'}>Channel #3</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;