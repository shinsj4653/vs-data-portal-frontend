import React, { useState } from 'react';

const transformData = (data, depth = 0) => {
    if (data.children) {
        return {
            ...data,
            depth,
            children: data.children.map(child => transformData(child, depth + 1))
        };
    }
    return {
        ...data,
        depth
    };
};

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

const Sidebar = ({ data, onNodeClick }) => {
    const transformedData = transformData(data);

    return (
        <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
            <a href="#">
                <img
                    className="w-auto h-20"
                    src="https://www.visang.com/images/visang_og.jpg"
                    alt=""
                />
            </a>

            <div className="flex flex-col justify-between flex-1 mt-1">
                <nav className="-mx-3 space-y-6">
                    <SidebarMenuItem item={transformedData} onMenuClick={onNodeClick} />
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;