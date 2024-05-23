'use client';
import React, { useState, useEffect } from 'react';
import {
  Link,
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
import MoreModal from '../Modal/MoreModal';
import ChildrenTable from './ChildrenTable';
import classNames from 'classnames';
import tableStyles from '@/styles/table/table.module.scss';
import styles from './index.module.scss';
import DelModal from '@/pageCont/components/DelModal';
import CreateModal from '../Modal/CreateModal';
import { getAssetList, assetDelete } from '@/api/assets';

function TablePage({
  formValue,
  isSearchClicked,
  changeState,
  createModalIsopen,
  editModalIsopen,
}) {
  const headers = [
    { key: 'assetId', header: 'Asset Id' },
    { key: 'assetName', header: 'Asset Name' },
    { key: 'assetType', header: 'Asset Type' },
    { key: 'vendorModel', header: 'Vendor&Model' },
    { key: 'description', header: 'Description' },
    { key: 'sn', header: 'SN' },
    { key: 'status', header: 'Status' },
    { key: 'more', header: 'More' },
    { key: 'edit', header: 'Edit' },
  ];
  const statusList = {
    1: {
      label: 'Running',
      type: 'blue',
    },
    2: {
      label: 'Maintaining',
      type: 'green',
    },
    3: {
      label: 'Halt',
      type: 'red',
    },
    4: {
      label: 'Stop',
      type: 'purple',
    },
  };
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(5);
  const [modalTableIsopen, setModalTableIsopen] = useState(false);
  const [detailIsOpen, setDetailIsOpen] = useState({});
  const [deleteModalIsopen, setDeleteModalIsopen] = useState(false);
  const [selectRowData, setSelectRowData] = useState({}); //选中的row data
  const [tableRowData, setTableRowData] = useState({}); //table row data
  const [rows, setRows] = useState([]); //table 数据

  useEffect(() => {
    // 是否携带搜索条件
    if (isSearchClicked) {
      let obj = { ...formValue, pageNum: 1, pageSize: 10 };
      getTableList(obj);
      changeState({ isSearchClicked: false });
    }
  }, [isSearchClicked]);

  useEffect(() => {
    changeState({
      formValue: {
        assetId: '',
        assetName: '',
        assetType: '',
        responsiblePerson: '',
      },
    });
    getTableList({ pageNum: 1, pageSize: 10 });
  }, [createModalIsopen, editModalIsopen]);

  useEffect(() => {
    if (!createModalIsopen && !editModalIsopen && !modalTableIsopen)
      setTableRowData({});
  }, [editModalIsopen, modalTableIsopen]);

  // useEffect(()=>{
  //   cellPadding()
  // },[detailIsOpen])

  const getTableList = async (filters) => {
    let reqData = {
      pageNum: page,
      pageSize: pageSize,
      ...filters,
    };
    let res = await getAssetList(reqData);

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
    let res = await assetDelete({ id });
    if (res?.data?.code == 200) {
      setDeleteModalIsopen(false);
      setSelectRowData({});
      if (isSearchClicked) {
        getTableList({ ...formValue, pageNum: 1, pageSize: 10 });
      } else {
        getTableList({ pageNum: 1, pageSize: 10 });
      }
    }
  };

  const childrenTableIsOpen = (row) => {
    let obj = { ...detailIsOpen };
    if (obj[row.id]) {
      obj[row.id] = false;
    } else {
      obj[row.id] = true;
    }
    setDetailIsOpen(obj);
  };

  return (
    <>
      <div className={classNames(tableStyles.tableStyle, styles.assets)}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => {
                  if (header.key == 'status') {
                    return (
                      <TableHeader
                        style={{ minWidth: '125px' }}
                        key={`${header.key}_head`}
                      >
                        {header.header}
                      </TableHeader>
                    );
                  }
                  return (
                    <TableHeader key={`${header.key}_head`}>
                      {header.header}
                    </TableHeader>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <>
                  <TableRow key={row.id}>
                    {headers.map((header) => {
                      if (header.key === 'more') {
                        return (
                          <TableCell key={header.key}>
                            <div
                              className={styles.tableDetail}
                              onClick={() => {
                                childrenTableIsOpen(row);
                              }}
                            >
                              Detail
                            </div>
                          </TableCell>
                        );
                      }
                      if (header.key === 'edit') {
                        return (
                          <TableCell key={header.key}>
                            <span
                              className={classNames(styles.editText, {
                                [styles.disableEdit]: row.usedStatus == 1,
                              })}
                              onClick={() => {
                                if (row.usedStatus == 1) return;
                                setTableRowData(row);
                                // 延迟打开弹窗
                                setTimeout(() => {
                                  changeState({
                                    editModalIsopen: true,
                                  });
                                });
                              }}
                            >
                              Edit
                            </span>
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
                          <TableCell key={header.key}>
                            {label && <Tag type={type}>{label}</Tag>}
                          </TableCell>
                        );
                      }
                      if (header.key === 'description') {
                        return (
                          <TableCell key={header.key}>
                            <div
                              style={{
                                width: '300px',
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
                      }
                      return (
                        <TableCell key={header.key}>
                          {row[header.key]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {/* 展开的table */}
                  <TableRow
                    className={styles.ChildrenTableTr}
                    style={{ height: 'auto' }}
                  >
                    <TableCell
                      className={styles.ChildrenTableTd}
                      style={{ padding: 0 }}
                      colSpan="9"
                    >
                      <ChildrenTable
                        tableList={[row]}
                        isOpen={detailIsOpen[row.id] ? true : false}
                      />
                    </TableCell>
                  </TableRow>
                </>
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
            getTableList({
              pageNum: page,
              pageSize: pageSize,
            });
          }}
        />
      </div>
      {/* more modal */}
      {
        <MoreModal
          modalTableIsopen={modalTableIsopen}
          setModalTableIsopen={setModalTableIsopen}
          tableRowData={tableRowData}
        />
      }
      {/* eidit modal */}
      <CreateModal
        createModalIsopen={editModalIsopen}
        changeState={changeState}
        type={'edit'}
        tableRowData={tableRowData}
      />
      {/* del modal */}
      <DelModal
        deleteModalIsopen={deleteModalIsopen}
        changeModalOpen={setDeleteModalIsopen}
        delConfirm={deleteAsset}
      />
    </>
  );
}

export default TablePage;
