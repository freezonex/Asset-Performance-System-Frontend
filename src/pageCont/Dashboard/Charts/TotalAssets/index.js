import React, { useEffect, useState } from 'react';
import { SimpleBarChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';
import styles from './index.module.scss';
import { getTotalAssets } from '@/api/dashboard';

function TotalAssets() {
  const [isMaskingShow, setIsMaskingShow] = useState(true);
  const [onMaskNumber, setOnMaskNumber] = useState(null);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    getChartsData();
  }, []);

  const getChartsData = async () => {
    let res = await getTotalAssets();

    if (res?.data?.code == 200) {
      const { dataList, totalQuantity } = res?.data?.data;
      setOnMaskNumber(totalQuantity);
      setData(dataList?.map((item) => ({ ...item, group: item.assetType })));

      let colorScale = {};
      dataList?.forEach((item) => (colorScale[item.assetType] = '#1192e8'));

      setOptions({
        title: 'Total Assets',
        axes: {
          left: {
            mapsTo: 'quantity',
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
      });
    }
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
        {onMaskNumber}
      </div>
      {data?.length > 0 && (
        <SimpleBarChart data={data} options={{ ...options }}></SimpleBarChart>
      )}
    </div>
  );
}

export default TotalAssets;
