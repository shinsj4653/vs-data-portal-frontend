import React, { useEffect, useState, useCallback } from 'react';
import { ResponsiveCirclePacking } from '@nivo/circle-packing'

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


const BrandCirclePackChart = ({ data, clickedNodeId, onNodeClick }) => {
    const [zoomedId, setZoomedId] = useState(null);
    const [labelIdx, setLabelIdx] = useState(0);
    const transformedData = transformData(data);

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
        <section>
            <div style={{ marginLeft: '50px', width: '800px', height: '800px' }}>
                <ResponsiveCirclePacking
                    theme={{
                        fontSize: 20,
                    }}
                    zoomedId={zoomedId}
                    motionConfig="slow"
                    onClick={handleNodeClick}
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    id="id"
                    value="loc"
                    // colors={{ scheme: 'nivo' }}
                    colors={node => (node.data.color)}
                    childColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'brighter',
                                0.4
                            ]
                        ]
                    }}
                    padding={4}
                    enableLabels={true}
                    label={node => node.data.name}
                    labelsFilter={useCallback((label) => label.node.depth === labelIdx + 1, [labelIdx])}
                    labelsSkipRadius={5}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.5
                            ]
                        ]
                    }}
                    tooltip={node => node.data.name}
                />
            </div>
        </section>
    );
};

export default BrandCirclePackChart;