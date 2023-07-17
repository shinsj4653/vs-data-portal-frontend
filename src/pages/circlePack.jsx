import React, { useState } from "react";
import Sidebar from "../components/circlePack/sidebar";
import vs_data from "../vs_dataset.json";
import BrandCirclePackChart from "../components/circlePack/brandCirclePackChart";
import Layout from "../components/layout";

// 전체 브랜드 Dataset을 보여주기 위한 Circle Pack 컴포넌트
const CirclePack = () => {
  const [clickedNodeId, setClickedNodeId] = useState(null);

  const handleNodeClick = (nodeId) => {
    setClickedNodeId(nodeId);
  };

  return (
    <>
      <Layout>
        <Sidebar data={vs_data} onNodeClick={handleNodeClick} />
        <BrandCirclePackChart
          data={vs_data}
          clickedNodeId={clickedNodeId}
          onNodeClick={handleNodeClick}
        />
      </Layout>
    </>
  );
};

export default CirclePack;
