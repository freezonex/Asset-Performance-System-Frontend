import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { LineChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';
import { Select, SelectItem } from '@carbon/react';
import { getModelChartData } from '@/api/maintenance';

function AssetValueDepreciationModel(props) {
  const { selectedProduct, selectedProductName, selectItemList } = props;
  const [selectList, setSelectList] = useState([
    {
      id: 1,
      name: 'Model 1',
    },
    {
      id: 2,
      name: 'Model 2',
    },
    {
      id: 3,
      name: 'Model 3',
    },
    {
      id: 4,
      name: 'Model 4',
    },
    {
      id: 5,
      name: 'Model 5',
    },
    {
      id: 6,
      name: 'Model 6',
    },
    {
      id: 7,
      name: 'Model 7',
    },
    {
      id: 8,
      name: 'Model 8',
    },
    {
      id: 9,
      name: 'Model 9',
    },
  ]);
  const [value, setValue] = useState(1);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (selectedProduct) {
      getChartData();
    }
  }, [selectedProduct, value]);

  const getChartData = async () => {
    let params = {
      assetTypeId: selectedProduct,
      modelType: value,
    };

    let res = await getModelChartData(params);

    if (res?.data?.code == 200) {
      let colorScale = {};
      selectItemList.forEach((item) => {
        colorScale[item.assetType] = '#0F62FE';
      });

      setOptions({
        axes: {
          bottom: {
            mapsTo: 'date',
            scaleType: 'labels',
          },
          left: {
            mapsTo: 'value',
            scaleType: 'linear',
          },
        },
        height: '285px',
        color: {
          scale: colorScale,
        },
        points: {
          fillOpacity: 1,
          filled: true,
        },
        curve: 'curveMonotoneX',
      });

      const { dataList } = res?.data?.data;
      setData(
        dataList?.map((item) => ({ ...item, group: selectedProductName })),
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Asset Value Depreciation Model</div>
        <div className={styles.options}>
          <Select
            labelText=""
            value={value}
            size={'sm'}
            onChange={(v) => {
              setValue(v.target.value);
            }}
          >
            {selectList.map((item) => {
              return (
                <SelectItem key={item.id} value={item.id} text={item.name} />
              );
            })}
          </Select>
        </div>
      </div>
      <div className={styles.chart}>
        <div style={{ position: 'relative', top: '0px' }}>
          {data.length > 0 && (
            <LineChart data={data} options={options}></LineChart>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssetValueDepreciationModel;
