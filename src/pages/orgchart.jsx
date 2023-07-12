import React, { useState } from 'react';
import DataDrivenOrgChart from '../components/orgchart/dataDrivenOrgChart';
import Layout from '../components/layout';
import vs_data from '../vs_dataset.json'

const Orgchart = () => {

    return (
        <>
            <Layout>
                <DataDrivenOrgChart vs_data={vs_data}/>
            </Layout>
        </>
    );
};

export default Orgchart;