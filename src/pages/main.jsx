import React, { useState } from 'react';
import Sidebar from '../components/main/sidebar';
import vs_data from '../vs_dataset.json'
import BrandCirclePackChart from '../components/main/brandCirclePackChart';
import Layout from '../components/layout';

const Main = () => {
    const [clickedNodeId, setClickedNodeId] = useState(null);

    const handleNodeClick = (nodeId) => {
        setClickedNodeId(nodeId);
    };

    return (
        <>
            <Layout>
                <Sidebar data={vs_data} onNodeClick={handleNodeClick} />
                <BrandCirclePackChart data={vs_data} clickedNodeId={clickedNodeId} onNodeClick={handleNodeClick} />
            </Layout>
        </>
    );
};

export default Main;