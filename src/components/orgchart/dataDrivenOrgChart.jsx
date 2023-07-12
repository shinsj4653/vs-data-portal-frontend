import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';

const renameNameToLabel = (data) => {
    if (Array.isArray(data)) {
      return data.map(renameNameToLabel);
    } else if (typeof data === 'object') {
      const newData = {};
      for (let key in data) {
        if (key === 'name') {
          newData['label'] = data[key];
        } else {
          newData[key] = renameNameToLabel(data[key]);
        }
      }
      return newData;
    } else {
      return data;
    }
  }

const DataDrivenOrgChart = ({vs_data}) => {
    const nameToLabelData = renameNameToLabel(vs_data);
    const [data] = useState([nameToLabelData]);

    return (
        <div className="card overflow-x-auto">
            <OrganizationChart value={data} />
        </div>
    )

};

export default DataDrivenOrgChart;