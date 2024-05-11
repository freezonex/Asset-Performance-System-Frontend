'use client';
import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  Pagination,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';
import moment from 'moment';
import classNames from 'classnames';
import { getScheduleList } from '@/api/schedule';
import tableStyles from '@/styles/table/table.module.scss';
import styles from './index.module.scss';

function TablePage({}) {
  const [headers, setHeaders] = useState([
    { key: 'groupName', header: 'Department' },
    // { key: 'MonJan5', header: 'Mon,Jan 5' },
    // { key: 'TueJan6', header: 'Tue,Jan 6' },
    // { key: 'WedJan7', header: 'Wed,Jan 7' },
    // { key: 'ThuJan8', header: 'Thu,Jan 8' },
    // { key: 'FriJan9', header: 'Fri,Jan 9' },
    // { key: 'SatJan10', header: 'Sat,Jan 10' },
    // { key: 'SunJan11', header: 'Sun,Jan 11' },
    // { key: 'MonJan12', header: 'Mon,Jan 12' },
    // { key: 'TueJan13', header: 'Tue,Jan 13' },
    // { key: 'WedJan14', header: 'Wed,Jan 14' },
    // { key: 'ThuJan15', header: 'Thu,Jan 15' },
    // { key: 'FriJan16', header: 'Fri,Jan 16' },
    // { key: 'SatJan17', header: 'Sat,Jan 17' },
    // { key: 'SunJan18', header: 'Sun,Jan 18' },
    // { key: 'MonJan19', header: 'Mon,Jan 19' },
  ]);
  const colorList = {
    3: {
      label: 'Free',
      bgColor: '#18b03d',
    },
    2: {
      label: 'Assignable',
      bgColor: '#b7ecc1',
    },
    1: {
      label: 'Busy',
      bgColor: '#c83837',
    },
    0: {
      label: 'Unassignable',
      bgColor: '#f4f4f4',
    },
  };
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(5);
  const [dataPickValue, setDataPickValue] = useState(new Date());
  const [tabelList, setTabelList] = useState([
    // {
    //   id: '001',
    //   groupName: 'LaptopLaptop',
    //   MonJan5: '1',
    //   TueJan6: '2',
    //   WedJan7: '4',
    //   ThuJan8: '1',
    //   FriJan9: '3',
    //   SatJan10: '4',
    //   SunJan11: '2',
    //   MonJan12: '1',
    //   TueJan13: '2',
    //   WedJan14: '3',
    //   ThuJan15: '1',
    //   FriJan16: '3',
    //   SatJan17: '4',
    //   SunJan18: '2',
    //   MonJan19: '1',
    // },
    // {
    //   id: '002',
    //   groupName: 'Laptop',
    //   MonJan5: '4',
    //   TueJan6: '1',
    //   WedJan7: '3',
    //   ThuJan8: '2',
    //   FriJan9: '3',
    //   SatJan10: '1',
    //   SunJan11: '4',
    //   MonJan12: '1',
    //   TueJan13: '3',
    //   WedJan14: '3',
    //   ThuJan15: '1',
    //   FriJan16: '3',
    //   SatJan17: '4',
    //   SunJan18: '2',
    //   MonJan19: '1',
    // },
    // {
    //   id: '004',
    //   groupName: 'Laptop',
    //   MonJan5: '1',
    //   TueJan6: '4',
    //   WedJan7: '4',
    //   ThuJan8: '3',
    //   FriJan9: '2',
    //   SatJan10: '1',
    //   SunJan11: '3',
    //   MonJan12: '4',
    //   TueJan13: '2',
    //   WedJan14: '1',
    //   ThuJan15: '2',
    //   FriJan16: '4',
    //   SatJan17: '1',
    //   SunJan18: '2',
    //   MonJan19: '1',
    // },
    // {
    //   id: '003',
    //   groupName: 'Laptop',
    //   MonJan5: '1',
    //   TueJan6: '3',
    //   WedJan7: '1',
    //   ThuJan8: '1',
    //   FriJan9: '3',
    //   SatJan10: '4',
    //   SunJan11: '2',
    //   MonJan12: '1',
    //   TueJan13: '2',
    //   WedJan14: '3',
    //   ThuJan15: '1',
    //   FriJan16: '3',
    //   SatJan17: '4',
    //   SunJan18: '2',
    //   MonJan19: '1',
    // },
  ]);
  useEffect(() => {
    getList();
  }, [page, pageSize]);

  const getList = async (data = {}) => {
    let res = await getScheduleList({
      pageNum: page,
      pageSize: pageSize,
      selectDate: moment(dataPickValue[0]).format('yyyy-MM-DD'),
      ...data,
    });
    if (res?.data?.code == 200) {
      const { data } = res?.data;
      setTotal(data.pageData.total);
      setPage(data.pageData.pageNum);
      setPageSize(data.pageData.pageSize);
      getHeader(data.dates);
      getTableList(data.pageData.list);
      console.log('data.pageData.list: ', data.pageData.list);
    }
  };

  // 重写heads数据
  const getHeader = (data) => {
    let newArr = data.map((val) => {
      return { key: val, header: val };
    });
    let newHeaders = headers.concat(newArr);
    setHeaders(newHeaders);
  };

  const getTableList = (data) => {
    let id = 1;
    let newArr = data.map((val) => {
      id += 1;
      let obj = {
        id,
        groupName: val.groupName,
      };
      val.dataList.forEach((value) => {
        obj[value.date] = value.colorType;
      });
      return obj;
    });
    console.log(newArr, 'newArr');
    setTabelList(newArr);
  };

  return (
    <div className={styles.scheduleTable}>
      <div className={styles.scheduleTableHeader}>
        <div className={styles.scheduleTableHeaderLeft}>
          <DatePicker
            value={dataPickValue}
            datePickerType="single"
            onChange={(e) => {
              setDataPickValue(e);
              getList({
                pageNum: 1,
                pageSize: 10,
                selectDate: moment(dataPickValue[0]).format('yyyy-MM-DD'),
              });
            }}
          >
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText=""
              id="date-picker-single"
              size="md"
            />
          </DatePicker>
        </div>
        <div className={styles.scheduleTableHeaderRight}>
          {Object.values(colorList).map((data, ind) => {
            return (
              <div className={styles.headerRightIconParent}>
                <span
                  className={styles.headerRightIcon}
                  style={{ backgroundColor: data.bgColor }}
                ></span>
                <span>{data.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={tableStyles.tableStyle}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => {
                  if (header.key == 'groupName') {
                    return (
                      <TableHeader
                        style={{ minWidth: '120px' }}
                        key={`${header.key}_head`}
                        head={true}
                      >
                        {header.header}
                      </TableHeader>
                    );
                  }
                  return (
                    <TableHeader
                      head={true}
                      key={`${header.key}_head`}
                      style={{ minWidth: '115px' }}
                    >
                      {header.header}
                    </TableHeader>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tabelList.map((row, i) => (
                <TableRow key={i}>
                  {headers.map((header) => {
                    if (header.key != 'groupName') {
                      let color = colorList[row[header.key]]?.bgColor;
                      return (
                        <TableCell key={header.key}>
                          <div
                            style={{
                              backgroundColor: color,
                              // width: '117px',
                              height: '3rem',
                            }}
                          ></div>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={header.key}>{row[header.key]}</TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText=""
        page={page}
        pageNumberText="Page Number"
        pageSize={pageSize}
        pageSizes={[10, 20, 30, 40, 50]}
        totalItems={total}
        onChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
      />
    </div>
  );
}

export default TablePage;
