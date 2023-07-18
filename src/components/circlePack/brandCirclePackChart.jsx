import React, { useEffect, useState, useCallback } from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";

// json Data에 Depth 속성 추가
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
const BrandCirclePackChart = ({ data, clickedNodeId, onNodeClick }) => {
  const [zoomedId, setZoomedId] = useState(null);
  const [labelIdx, setLabelIdx] = useState(0);
  const transformedData = transformData(data);

  // Zoom기능 설정
  useEffect(() => {
    if (clickedNodeId) {
      setZoomedId(clickedNodeId);
      const clickedNode = findNodeById(transformedData, clickedNodeId);
      if (clickedNode) {
        setLabelIdx(clickedNode.depth);
      }
    } else {
      setZoomedId(null);
    }
    onNodeClick(clickedNodeId);
  }, [clickedNodeId, transformedData]);

  // Node 클릭 시 Zoom 및 label 레벨 설정
  const handleNodeClick = (node) => {
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
    <section className="">
      <div className="h-screen w-screen max-w-screen-lg">
        <ResponsiveCirclePacking          
          theme={{
            fontSize: 20,
            background: "#fffbfa",
          }}
          zoomedId={zoomedId}
          motionConfig="slow"
          onClick={handleNodeClick}
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          id="id"
          value="loc"
          // colors={{ scheme: 'nivo' }}
          colors={(node) => node.data.color}
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

export default BrandCirclePackChart;