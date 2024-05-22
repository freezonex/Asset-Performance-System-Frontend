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
  const [selectIsActiveTable, setSelectIsActiveTable] = useState(null); //表格中和选中时间一致的，表头名称
  const [activeBorderFlag, setActiveBorderFlag] = useState(true); // 是否展示篮框选中样式
  const [tabelList, setTabelList] = useState([]);
  useEffect(() => {
    getList({ selectDate: moment(dataPickValue).format('yyyy-MM-DD') });
  }, []);

  useEffect(() => {
    if (activeBorderFlag) {
      setTimeout(() => {
        setActiveBorderFlag(false);
      }, 3000);
    }
  }, [activeBorderFlag]);

  const getList = async (params = {}) => {
    let res = await getScheduleList({
      pageNum: page,
      pageSize: pageSize,
      ...params,
    });
    if (res?.data?.code == 200) {
      const { data } = res?.data;
      setTotal(data.pageData.total);
      setPage(data.pageData.pageNum);
      setPageSize(data.pageData.pageSize);
      getHeader(data.dates);
      getTableList(data.pageData.list, params.selectDate);
      setActiveBorderFlag(true)
    }
  };

  // 重写heads数据
  const getHeader = (data) => {
    let newArr = data.map((val) => {
      return { key: val, header: val };
    });
    let arr = [{ key: 'groupName', header: 'Department' }];
    let newHeaders = arr.concat(newArr);
    setHeaders(newHeaders);
  };

  const getTableList = (data, date) => {
    let id = 1;
    let pickDay = new Date(date).getDate();
    let newArr = data.map((val) => {
      id += 1;
      let obj = {
        id,
        groupName: val.groupName,
        isActive: null,
      };
      val.dataList.forEach((value) => {
        const day = new Date(value.date).getDate();
        if (pickDay == day) {
          obj.isActive = value.date;
          setSelectIsActiveTable(value.date);
        }
        obj[value.date] = value.colorType;
      });
      return obj;
    });
    setTabelList(newArr);
  };

  const activeTableBorderBottom = (params) => {
    let flag = false;
    const { index, header, isActive } = params;
    if (index == tabelList.length - 1) {
      if (header == isActive && activeBorderFlag) {
        flag = true;
      }
    }
    return flag;
  };

  return (
    <div className={styles.scheduleTable}>
      <div className={styles.scheduleTableHeader}>
        <div className={styles.scheduleTableHeaderLeft}>
          <DatePicker
            value={dataPickValue}
            datePickerType="single"
            onChange={(e) => {
              if (e.length < 1) return;
              const date1 = moment(e[0]).startOf('day');
              const date2 = moment(dataPickValue).startOf('day');
              if (!date1.isSame(date2)) {
                setDataPickValue(e[0]);
                getList({
                  pageNum: 1,
                  pageSize: 10,
                  selectDate: moment(e[0]).format('yyyy-MM-DD'),
                });
              }
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
              <div key={ind} className={styles.headerRightIconParent}>
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
                      >
                        {header.header}
                      </TableHeader>
                    );
                  }
                  return (
                    <TableHeader
                      key={`${header.key}_head`}
                      style={{ minWidth: '120px' }}
                      className={classNames({
                        [styles.activeTableHeaderBorder]:
                          header.key == selectIsActiveTable && activeBorderFlag,
                        [styles.activeHeaderColor]:
                          header.key == selectIsActiveTable,
                      })}
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
                        <TableCell
                          key={header.key}
                          className={classNames(
                            {
                              [styles.activeTableBorder]:
                                header.key == row['isActive'] &&
                                activeBorderFlag,
                            },
                            {
                              [styles.activeTableBorderBottom]:
                                activeTableBorderBottom({
                                  index: i,
                                  header: header.key,
                                  isActive: row['isActive'],
                                }),
                            },
                          )}
                        >
                          <div
                            style={{
                              backgroundColor: color,
                              width: 120,
                              height: 48,
                              minWidth: 120,
                              minheight: 48,
                            }}
                          ></div>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={header.key}>
                        <div
                          style={{
                            width: 120,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                          title={row[header.key]}
                        >
                          {row[header.key]}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            getList({
              pageNum: page,
              pageSize: pageSize,
              selectDate: moment(dataPickValue).format('yyyy-MM-DD'),
            });
          }}
        />
      </div>
    </div>
  );
}

export default TablePage;
