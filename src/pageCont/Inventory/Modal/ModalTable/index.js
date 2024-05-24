import React, { useState, useEffect } from 'react';
import {
  Modal,
  Pagination,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from '@carbon/react';
import modalStyles from '@/styles/modal/modal.module.scss';
import stylesTable from '@/styles/table/table.module.scss';
import styles  from './index.module.scss'

import { assetTypeQuantityList } from '@/api/common';

const ModalPages = ({ modalTableIsopen, setModalTableIsopen }) => {
  const headers = [
    { key: 'assetType', header: 'Asset Name' },
    { key: 'quantity', header: 'Quality' },
  ];
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(5);

  const onRequestClose = () => {
    setModalTableIsopen(false);
  };

  // 获取列表
  var getList = async (params = {}) => {
    var reqData = {
      pageNum: page,
      pageSize: pageSize,
    };
    reqData = { ...reqData, ...params };

    var rs = await assetTypeQuantityList(reqData);

    // 成功
    if (rs?.data?.code == 200) {
      var data = rs.data.data;
      setRows(data.list);
      setTotal(data.total);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className = {`${modalStyles.ModalFromStyle} ${styles.viewTablePage}`}>
      <Modal
        open={modalTableIsopen}
        modalHeading="Safety Level Stock Spare Parts"
        passiveModal
        onRequestClose={onRequestClose}
      >
        <div className={stylesTable.tableStyle}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow head>
                  {headers.map((header, index) => (
                    <TableHeader head key={header.key}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                    {headers.map((header) => {
                      return (
                        <TableCell key={header.key}>
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
              setPage(page);
              setPageSize(pageSize);
              getList({
                pageNum: page,
                pageSize: pageSize,
              });
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalPages;
