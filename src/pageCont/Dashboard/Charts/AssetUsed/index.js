import React from 'react';
import { LineChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';

function AssetUsed() {
  const data = [
    {
      key: 'Monday',
      group: 'Product 1',
      value: 12.5,
    },
    {
      key: 'Tuesday',
      group: 'Product 1',
      value: 9.8,
    },
    {
      key: 'Wednesday',
      group: 'Product 1',
      value: 7.5,
    },
    {
      key: 'Thursday',
      group: 'Product 1',
      value: 7.6,
    },
    {
      key: 'Friday',
      group: 'Product 1',
      value: 5,
    },

    {
      key: 'Monday',
      group: 'Product 2',
      value: 2.4,
    },
    {
      key: 'Tuesday',
      group: 'Product 2',
      value: 0.3,
    },
    {
      key: 'Wednesday',
      group: 'Product 2',
      value: 2.7,
    },
    {
      key: 'Thursday',
      group: 'Product 2',
      value: 7,
    },
    {
      key: 'Friday',
      group: 'Product 2',
      value: 2.5,
    },
  ];

  const options = {
    title: 'Asset Used',
    axes: {
      bottom: {
        mapsTo: 'key',
        scaleType: 'labels',
      },
      left: {
        mapsTo: 'value',
        scaleType: 'linear',
      },
    },
    height: '188px',
    color: {
      scale: {
        'Product 1': '#0F62FE',
        'Product 2': '#9F1853'
      }
    },
    points: {
      fillOpacity: 1,
      filled: true,
  },
  curve : "curveMonotoneX"
  };

  return (
    <>
      <LineChart data={data} options={options}></LineChart>
    </>
  );
}

export default AssetUsed;
