import React from "react";
import SidebarMenuItem from "./sidebarMenuItem";

const transformData = (data, depth = 0) => {
  // console.log('data', data);
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

const Sidebar = ({ data, onNodeClick, serviceName, isMap }) => {
  const transformedData = transformData(data);


  return (
    <>
      <div className="py-6 border-e hidden md:block w-1/6 min-w-fit min-h-screen">
        <ul className="mt-16 space-y-1">
          <SidebarMenuItem item={transformedData} onMenuClick={onNodeClick} serviceName={serviceName} isMap={isMap}/>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
