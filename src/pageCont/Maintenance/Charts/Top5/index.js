import React, { useEffect, useState } from 'react';
import { SimpleBarChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';
import { getTop5Data } from '@/api/maintenance';

const colorArr = ['#0F62FE', '#3F81FE', '#87B0FF', '#9FC0FF', '#CFE0FF'];

function Top5() {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    getChartsData();
  }, []);

  const getChartsData = async () => {
    let res = await getTop5Data();

    if (res?.data?.code == 200) {
      const { data: list } = res?.data;

      setData(list?.map((item) => ({ ...item, group: item.assetType })));

      let colorScale = {};
      list?.forEach(
        (item, index) => (colorScale[item.assetType] = colorArr[index]),
      );

      setOptions({
        title: 'Top 5',
        axes: {
          left: {
            mapsTo: 'priceValue',
          },
          bottom: {
            mapsTo: 'group',
            scaleType: 'labels',
          },
        },
        color: {
          scale: colorScale,
        },
        legend: {
          alignment: 'center',
        },
        height: '320px',
        toolbar: {
          enabled: false,
        },
      });
    }
  };

  return (
    <>
      {data?.length > 0 && (
        <SimpleBarChart data={data} options={{ ...options }}></SimpleBarChart>
      )}
    </>
  );
}

export default Top5;
