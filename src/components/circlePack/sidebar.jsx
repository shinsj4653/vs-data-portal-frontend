import React from "react";
import SidebarMenuItem from "./sidebarMenuItem";

const transformData = (data, depth = 0) => {
  if (data.children) {
    return {
      ...data,
      depth,
      children: data.children.map((child) => transformData(child, depth + 1)),
    };
  }
  return {
    ...data,
    depth,
  };
};

const Sidebar = ({ data, onNodeClick }) => {
  const transformedData = transformData(data);

  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
      <a href="#!">
        <img
          className="w-auto h-20"
          src="https://www.visang.com/images/visang_og.jpg"
          alt="비상교육"
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
