import React, { useState } from "react";
import Sidebar from "../components/circlePack/sidebar";
import vs_data from "../vs_dataset.json";
import BrandCirclePackChart from "../components/circlePack/brandCirclePackChart";
import Layout from "../components/layout";
import circlepack_background from "../assets/backgrounds/circlePack_background.jpg"

// 전체 브랜드 Dataset을 보여주기 위한 Circle Pack 컴포넌트
const CirclePack = () => {
  const [clickedNodeId, setClickedNodeId] = useState(null);

  const handleNodeClick = (nodeId) => {
    setClickedNodeId(nodeId);
  };

  return (
    <>
      <Layout>
        <div
          className="hero min-h-16"
            style={{
              backgroundImage: `url(${circlepack_background})`,
            }}
        >
          <div className="hero-overlay bg-primary-content bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-100">
            <div className="">
              <h1 className="my-5 text-5xl font-bold">비상교육 데이터 맵</h1>
              <p className="mb-5">
                비상교육의 전체 브랜드의 데이터를 한눈에 볼 수 있는
                서비스입니다.
              </p>
            </div>
          </div>
        </div>
        <div className="flex h-screen bg-white">
          <Sidebar data={vs_data} onNodeClick={handleNodeClick} />
          <BrandCirclePackChart
            data={vs_data}
            clickedNodeId={clickedNodeId}
            onNodeClick={handleNodeClick}
          />
        </div>
      </Layout>
    </>
  );
};

export default CirclePack;
