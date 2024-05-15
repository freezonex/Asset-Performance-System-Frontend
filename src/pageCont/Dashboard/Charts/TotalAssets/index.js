import React, { useState } from 'react';
import { SimpleBarChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';
import styles from './index.module.scss';

function TotalAssets() {
  const [isMaskingShow, setIsMaskingShow] = useState(true);

  const data = [
    {
      group: '品类1',
      value: 6500,
    },
    {
      group: '品类2',
      value: 2912,
    },
    {
      group: '品类3',
      value: 3521,
    },
    {
      group: '品类4',
      value: 5121,
    },
    {
      group: '品类5',
      value: 1693,
    },
    {
      group: '品类6',
      value: 6500,
    },
    {
      group: '品类7',
      value: 2912,
    },
    {
      group: '品类8',
      value: 3521,
    },
    {
      group: '品类9',
      value: 5121,
    },
    {
      group: '品类10',
      value: 1693,
    },
  ];

  let colorScale = {};
  data.forEach((item) => {
    colorScale[item.group] = '#1192e8';
  });

  const options = {
    title: 'Total Assets',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        mapsTo: 'group',
        scaleType: 'labels',
        ticks: {
          values: [],
        },
      },
    },
    color: {
      scale: colorScale,
    },
    legend: {
      enabled: false,
    },
    height: '180px',
  };

  const handleMouseOver = () => {
    setIsMaskingShow(false);
  };

  const handleMouseLeave = () => {
    setIsMaskingShow(true);
  };

  return (
    <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <div
        className={`${styles.masking} ${
          isMaskingShow ? styles.fadeIn : styles.fadeOut
        }`}
      >
        3500
      </div>
      <SimpleBarChart data={data} options={options}></SimpleBarChart>
    </div>
  );
}

export default TotalAssets;
