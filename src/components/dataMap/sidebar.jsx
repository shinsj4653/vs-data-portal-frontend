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
    <>
      <div className=" py-6 border-e hidden md:block w-1/6 min-w-fit ">
        <ul className="mt-16 space-y-1">
          <SidebarMenuItem item={transformedData} onMenuClick={onNodeClick} />
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
