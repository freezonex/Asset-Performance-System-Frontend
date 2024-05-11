'use client';
import React, { useState, useEffect } from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Tooltip,
} from '@carbon/react';
import classNames from 'classnames';
import tableStyles from '@/styles/table/table.module.scss';
import styles from './index.module.scss';

function TablePage({}) {
  const headers = [
    { key: 'assetName', header: 'Asset Name' },
    { key: 'MonJan5', header: 'Mon,Jan 5' },
    { key: 'TueJan6', header: 'Tue,Jan 6' },
    { key: 'WedJan7', header: 'Wed,Jan 7' },
    { key: 'ThuJan8', header: 'Thu,Jan 8' },
    { key: 'FriJan9', header: 'Fri,Jan 9' },
    { key: 'SatJan10', header: 'Sat,Jan 10' },
    { key: 'SunJan11', header: 'Sun,Jan 11' },
    { key: 'MonJan12', header: 'Mon,Jan 12' },
    { key: 'TueJan13', header: 'Tue,Jan 13' },
    { key: 'WedJan14', header: 'Wed,Jan 14' },
    { key: 'ThuJan15', header: 'Thu,Jan 15' },
    { key: 'FriJan16', header: 'Fri,Jan 16' },
    { key: 'SatJan17', header: 'Sat,Jan 17' },
    { key: 'SunJan18', header: 'Sun,Jan 18' },
    { key: 'MonJan19', header: 'Mon,Jan 19' },
  ];
  const colorList = {
    1: {
      label: '10% More',
      bgColor: '#18b03d',
    },
    2: {
      label: '5% More',
      bgColor: '#b7ecc1',
    },
    3: {
      label: 'Lower than expected',
      bgColor: '#c83837',
    },
    4: {
      label: 'Exhausted',
      bgColor: '#f4f4f4',
    },
  };
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(5);
  const [rows, setRows] = useState([
    {
      id: '001',
      assetName: 'LaptopLaptop',
      MonJan5: '1',
      TueJan6: '2',
      WedJan7: '4',
      ThuJan8: '1',
      FriJan9: '3',
      SatJan10: '4',
      SunJan11: '2',
      MonJan12: '1',
      TueJan13: '2',
      WedJan14: '3',
      ThuJan15: '1',
      FriJan16: '3',
      SatJan17: '4',
      SunJan18: '2',
      MonJan19: '1',
    },
    {
      id: '002',
      assetName: 'Laptop',
      MonJan5: '4',
      TueJan6: '1',
      WedJan7: '3',
      ThuJan8: '2',
      FriJan9: '3',
      SatJan10: '1',
      SunJan11: '4',
      MonJan12: '1',
      TueJan13: '3',
      WedJan14: '3',
      ThuJan15: '1',
      FriJan16: '3',
      SatJan17: '4',
      SunJan18: '2',
      MonJan19: '1',
    },
    {
      id: '004',
      assetName: 'Laptop',
      MonJan5: '1',
      TueJan6: '4',
      WedJan7: '4',
      ThuJan8: '3',
      FriJan9: '2',
      SatJan10: '1',
      SunJan11: '3',
      MonJan12: '4',
      TueJan13: '2',
      WedJan14: '1',
      ThuJan15: '2',
      FriJan16: '4',
      SatJan17: '1',
      SunJan18: '2',
      MonJan19: '1',
    },
    {
      id: '003',
      assetName: 'Laptop',
      MonJan5: '1',
      TueJan6: '3',
      WedJan7: '1',
      ThuJan8: '1',
      FriJan9: '3',
      SatJan10: '4',
      SunJan11: '2',
      MonJan12: '1',
      TueJan13: '2',
      WedJan14: '3',
      ThuJan15: '1',
      FriJan16: '3',
      SatJan17: '4',
      SunJan18: '2',
      MonJan19: '1',
    },
  ]);
  useEffect(() => {}, [page, pageSize]);

  return (
    <div className={classNames(tableStyles.tableStyle, styles.scheduleTable)}>
      <StructuredListWrapper isCondensed>
        <StructuredListHead>
          <StructuredListRow head>
            {headers.map((header, index) => (
              <StructuredListCell head key={header.key}>
                {header.header}
              </StructuredListCell>
            ))}
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {rows.map((row, index) => (
            <StructuredListRow key={row.id}>
              {headers.map((header) => {
                if (header.key != 'assetName') {
                  let color = colorList[row[header.key]]?.bgColor;
                  return (
                    <StructuredListCell key={header.key}>
                      <div
                        style={{
                          backgroundColor: color,
                          width: '117px',
                          height: '40px',
                        }}
                      ></div>
                    </StructuredListCell>
                  );
                }
                if (row[header.key].length > 9) {
                  let data = row[header.key];
                  return (
                    <StructuredListCell
                      key={header.key}
                      style={{ minWidth: '105px' }}
                    >
                      <div style={{ height: '40px' }}>
                        <div className={styles.assetName}>
                          {/* <Tooltip align="top" label={data}> */}
                            {data.slice(0, 9) + '...'}
                          {/* </Tooltip> */}
                        </div>
                      </div>
                    </StructuredListCell>
                  );
                }
                return (
                  <StructuredListCell
                    key={header.key}
                    style={{ minWidth: '105px' }}
                  >
                    <div style={{ height: '40px' }}>
                      <div className={styles.assetName}>{row[header.key]}</div>
                    </div>
                  </StructuredListCell>
                );
              })}
            </StructuredListRow>
          ))}
        </StructuredListBody>
      </StructuredListWrapper>
    </div>
  );
}

export default TablePage;
