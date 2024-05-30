'use client';
import React, { useState, useEffect } from 'react';
import {
  Pagination,
  Tag,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from '@carbon/react';
import classNames from 'classnames';
import tableStyles from '@/styles/table/table.module.scss';
import styles from './index.module.scss';
import DelModal from '@/pageCont/components/DelModal';
import { getWorkOrderList, workOrderDelete } from '@/api/workOrder';
import CreateModal from '../Modal/CreateModal';

function TablePage({
  formValue,
  changeState,
  isSearchClicked,
  createModalIsopen,
  createModaType,
  tableData,
}) {
  const headers = [
    { key: 'orderId', header: 'Work Order' },
    { key: 'orderName', header: 'Order Name' },
    { key: 'description', header: 'Description' },
    { key: 'priority', header: 'Priority' },
    { key: 'assetId', header: 'Asset ID' },
    { key: 'creationTime', header: 'Creation Time' },
    { key: 'dueTime', header: 'Due Time' },
    { key: 'status', header: 'Status' },
    { key: 'edit', header: 'Edit' },
  ];
  const statusList = {
    1: {
      label: 'Open',
      type: 'green',
    },
    2: {
      label: 'In Progress',
      type: 'blue',
    },
    3: {
      label: 'Review',
      type: 'purple',
    },
    4: {
      label: 'Dued',
      type: 'magenta',
    },
    5: {
      label: 'Closed',
      type: 'red',
    },
  };
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(5);
  const [rows, setRows] = useState([]);
  const [deleteModalIsopen, setDeleteModalIsopen] = useState(false);
  const [selectRowData, setSelectRowData] = useState({}); //选中的row data
  // useEffect(() => {
  //   changeState({
  //     formValue: {
  //       orderId: '',
  //       orderName: '',
  //       orderType: '',
  //       creationTime: '',
  //     },
  //   });
  //   // 无搜索条件 调用接口
  //   getTableList({ pageNum: 1, pageSize: 10 });
  // }, [createModalIsopen]);

  useEffect(() => {
    reloadingData()
  }, []);

  const reloadingData = () => {
    changeState({
      formValue: {
        orderId: '',
        orderName: '',
        orderType: '',
        creationTime: '',
      },
    });
    // 无搜索条件 调用接口
    getTableList({ pageNum: 1, pageSize: 10 });
  }

  useEffect(() => {
    // 是否携带搜索条件
    if (isSearchClicked) {
      let obj = { ...formValue, pageNum: 1, pageSize: 10 };
      getTableList(obj);
      changeState({ isSearchClicked: false });
    }
  }, [isSearchClicked]);

  const getTableList = async (filters) => {
    let reqData = {
      pageNum: page,
      pageSize: pageSize,
      ...filters,
    };
    let res = await getWorkOrderList(reqData);

    if (res?.data?.code == 200) {
      const { data } = res?.data;
      setRows(data?.list);
      setTotal(data?.total);
      setPage(data?.pageNum);
      setPageSize(data?.pageSize);
    }
  };

  const deleteAsset = async () => {
    if (Object.keys(selectRowData).length < 1) return;
    const { id } = selectRowData;
    // 调用接口
    let res = await workOrderDelete({ id });
    if (res?.data?.code == 200) {
      setDeleteModalIsopen(false);
      setSelectRowData({});
      getTableList({ ...formValue, pageNum: page, pageSize });
      // if (isSearchClicked) {
      //   getTableList({ ...formValue, pageNum: 1, pageSize: 10 });
      // } else {
      //   getTableList({ pageNum: 1, pageSize: 10 });
      // }
    }
  };
  return (
    <>
      <div
        className={classNames(tableStyles.tableStyle, styles.workOrderTable)}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => {
                  if (header.key == 'status') {
                    return (
                      <TableHeader
                        style={{ minWidth: '125px' }}
                        key={header.key}
                      >
                        {header.header}
                      </TableHeader>
                    );
                  }
                  return (
                    <TableHeader key={header.key}>{header.header}</TableHeader>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.assetId}>
                  {headers.map((header) => {
                    if (header.key === 'edit') {
                      return (
                        <TableCell key={`${row.assetId}-${header.key}`}>
                          {/* <span
                            className={styles.editText}
                            onClick={() => {
                              changeState({
                                tableData: row,
                                createModaType: 'edit',
                              });
                              // 延迟打开弹窗
                              setTimeout(() => {
                                changeState({
                                  createModalIsopen: true,
                                });
                              });
                            }}
                          >
                            Edit
                          </span> */}
                          <span
                            className={styles.delText}
                            onClick={() => {
                              setSelectRowData(row);
                              setDeleteModalIsopen(true);
                            }}
                          >
                            Delete
                          </span>
                        </TableCell>
                      );
                    }
                    if (header.key === 'status') {
                      let type = statusList[row[header.key]]?.type;
                      let label = statusList[row[header.key]]?.label;
                      return (
                        <TableCell
                          style={{ width: 120 }}
                          key={`${row.assetId}-${header.key}`}
                        >
                          {label && <Tag type={type}>{label}</Tag>}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={`${row.assetId}-${header.key}`}>
                        {row[header.key]}
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
            let obj = { ...formValue, pageNum: page, pageSize };
            getTableList(obj);
          }}
        />
      </div>
      {/* del modal */}
      <DelModal
        deleteModalIsopen={deleteModalIsopen}
        changeModalOpen={setDeleteModalIsopen}
        delConfirm={deleteAsset}
      />
      {/* Create a Asset modal */}
      {
        <CreateModal
          createModalIsopen={createModalIsopen}
          createModaType={createModaType}
          tableData={tableData}
          changeState={changeState}
          reloadingData={reloadingData}
        />
      }
    </>
  );
}

export default TablePage;
