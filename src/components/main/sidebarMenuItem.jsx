import React, { useState } from 'react';

const SidebarMenuItem = ({ item, onMenuClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleItemClick = (itemId) => {
    onMenuClick(itemId);
  };

  return (
    <div>
      <div
        className={`${isHovered ? 'bg-gray-300' : `bg-[${item.color}]`}
        pl-4 py-2 text-xs font-semibold text-gray-800 uppercase transition-colors duration-300 cursor-pointer`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleItemClick(item.id)}
      >
        {item.name}
      </div>
      {item.children && (
        <div className="ml-8 mt-2">
          {item.children
            .filter((child) => child.depth < 3)
            .map((child) => (
              <SidebarMenuItem key={child.id} item={child} onMenuClick={handleItemClick} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SidebarMenuItem;