import React from 'react';
import { SimpleBarChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';
import styles from './index.module.scss';

function TotalAssets() {
  const data = [
    {
      group: 'Qty',
      value: 65000,
    },
    {
      group: 'More',
      value: 29123,
    },
    {
      group: 'Sold',
      value: 35213,
    },
    {
      group: 'Restock',
      value: 51213,
    },
    {
      group: 'Misc',
      value: 16932,
    },
    {
      group: 'Qty1',
      value: 65000,
    },
    {
      group: 'More2',
      value: 29123,
    },
    {
      group: 'Sold3',
      value: 35213,
    },
    {
      group: 'Restock',
      value: 51213,
    },
    {
      group: 'Misc5',
      value: 16932,
    },
  ];

  const options = {
    title: 'Total Assets',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        mapsTo: 'group',
        scaleType: 'labels',
      },
    },
    // color:{
    //   scale:{
    //     Qty:
    //   }

    // },
    legend: {
      enabled: false,
    },
    height: '188px',
  };

  return (
    <>
      <SimpleBarChart data={data} options={options}></SimpleBarChart>
    </>
  );
}

export default TotalAssets;
