import React, { useEffect, useState } from 'react';
import { DonutChart } from '@carbon/charts';
import '@carbon/charts/styles.css';


function WorkOrders() {
  const data = [
    {
      group: 'Open',
      value: 4000,
    },
    {
      group: 'Closed',
      value: 2000,
    },
    {
      group: 'abnormal',
      value: 2000,
    },
  ];

  const options = {
    title: 'Work-orders',
    resizable: true,
    donut: {
        alignment: 'center',
      center: {
        label: '',
        number:'',
        numberFormatter: () => ''
      },
    },
    legend:{
        alignment: 'center', 
    },
    
    height: '188px',
  };

  let isGetChart = false;

  useEffect(() => {
    if (isGetChart === false) {
      const chartHolder = document.getElementById('workOrders');
      new DonutChart(chartHolder, {
        data,
        options,
      });

      isGetChart = true;
    }
  }, []);

  return <div id="workOrders"></div>;
}

export default WorkOrders;
