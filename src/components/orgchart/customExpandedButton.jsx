import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const CustomExpandButton = (node) => {
  return (
    <>
      {node && (
        <div className="w-96 h-8 bg-stone-200 flex justify-center items-center border-2 border-slate-500 cursor-pointer rounded-2xl">
          <span>{node.data._directSubordinates}</span>
          <span>
            {node.children ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>
      )}
    </>
  );
};

export default CustomExpandButton;
