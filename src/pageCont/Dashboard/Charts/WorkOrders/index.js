import React, { useRef, useEffect } from 'react';
import { getWorkOrders } from '@/api/dashboard';

import * as echarts from 'echarts';

function WorkOrders() {
  const chartRef = useRef();

  useEffect(() => {
    getData();
  }, []);

  const statusList = {
    Open: '#a7f0ba',
    'In Progress': '#d0e2ff',
    'Pending Review': '#e8daff',
    Dued: '#ffd6e8',
    Closed: '#FFC9CB',
  };

  const getData = async () => {
    let res = await getWorkOrders();

    if (res?.data?.code == 200) {
      const { dataList } = res?.data?.data;

      let data = dataList?.map((item) => ({
        name: item?.status,
        value: item?.quantity,
      }));

      let colorArr = [];
      data.forEach((item) => {
        colorArr.push(statusList[item.name]);
      });

      initChart(data, colorArr);
    }
  };

  const initChart = (data, colorArr) => {
    let chartDom = chartRef.current;
    let pieChart = echarts.init(chartDom);
    let option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: '0',
        left: 'center',
        icon: 'circle',
      },
      series: [
        {
          type: 'pie',
          radius: ['60%', '130%'],
          center: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'inside',
            formatter: (params) => {
              const { percent, data } = params;

              if (percent === 0) {
                return ``;
              } else {
                const { name } = data;
                if (name === 'Open') {
                  return `{o|${percent}%}`;
                }
                if (name === 'In Progress') {
                  return `{i|${percent}%}`;
                }
                if (name === 'Pending Review') {
                  return `{p|${percent}%}`;
                }
                if (name === 'Dued') {
                  return `{d|${percent}%}`;
                }
                if (name === 'Closed') {
                  return `{c|${percent}%}`;
                }
                return `${percent}%`;
              }
            },
            rich: {
              o: {
                color: '#044317',
              },
              i: {
                color: '#002d9c',
              },
              p: {
                color: '#491d8b',
              },
              d: {
                color: '#740937',
              },
              c: {
                color: '#750e13',
              },
            },

            fontWeight: 'bold',
          },
          startAngle: 180,
          endAngle: 360,
          data,
        },
      ],
      color: colorArr,
    };

    option && pieChart.setOption(option);

    window.addEventListener('resize', function() {
      pieChart.resize();
    });
  };

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: 'calc(100% - 30px)' }}
    ></div>
  );
}

export default WorkOrders;
