import React, { useEffect, useState, useCallback } from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";

// ID기반으로 Node를 검색하여 메뉴 클릭 시 맵핑
const findNodeById = (node, targetId) => {
  if (node.id === targetId) {
    return node;
  }

  if (node.children) {
    for (const child of node.children) {
      const foundNode = findNodeById(child, targetId);
      if (foundNode) {
        return foundNode;
      }
    }
  }

  return undefined;
};

// Zoomable Circle Pack 차트 개발
const DataMapChart = ({ data, clickedNodeId, onNodeClick }) => {
  const [zoomedId, setZoomedId] = useState(null);
  const [labelIdx, setLabelIdx] = useState(0);
  const [nodeColor, setNodeColor] = useState(false);

  // Zoom기능 설정
  useEffect(() => {
    if (clickedNodeId) {
      setZoomedId(clickedNodeId);
      const clickedNode = findNodeById(data, clickedNodeId);
      if (clickedNode) {
        setLabelIdx(clickedNode.depth);
      }
    } else {
      setZoomedId(null);
    }
    onNodeClick(clickedNodeId);
  }, [clickedNodeId, data]);

  // Node 클릭 시 Zoom 및 label 레벨 설정
  const handleNodeClick = (node) => {    
    // 색변경 
    // setNodeColor(false);
    if (zoomedId === node.id) {
      setZoomedId(null);
      setLabelIdx(1);
    } else {
      setZoomedId(node.id);
      setLabelIdx(node.depth);
    }
    onNodeClick(node.id);
  };

  return (
    <section>
      <div className="h-screen w-screen max-w-screen-lg">
        <ResponsiveCirclePacking          
          theme={{
            fontSize: 20,
            // background: "#fffbfa",
          }}
          zoomedId={zoomedId}
          motionConfig="slow"
          onClick={handleNodeClick}
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          id="id"
          value="loc"
          colors={nodeColor == true ? {scheme: 'set3'} : (node) => node.data.color}
          childColor={{
            from: "color",
            modifiers: [["brighter", 0.4]],
          }}
          padding={4}
          enableLabels={true}
          label={(node) => node.data.name}
          labelsFilter={useCallback(
            (label) => label.node.depth === labelIdx + 1,
            [labelIdx]
          )}
          labelsSkipRadius={5}
          labelTextColor="black"
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.5]],
          }}
          tooltip={(node) => node.data.name}
        />
      </div>
    </section>
  );
};

export default DataMapChart;
