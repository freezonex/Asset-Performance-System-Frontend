import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

import {
  Pagination,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from '@carbon/react';
import { getMaintenancelist } from '@/api/maintenance';

function HistoricalMaintenanceLog(props) {
  const { selectedProduct, changeState, logTableReload } = props;

  const headers = [
    { key: 'scheduledDate', header: 'Date' },
    { key: 'content', header: 'Maintenance Content' },
  ];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getTableList(page, pageSize);
  }, [selectedProduct]);

  useEffect(() => {
    if (logTableReload) {
      getTableList(page, pageSize);
      changeState({
        logTableReload: false,
      });
    }
  }, [logTableReload]);

  const getTableList = async (num, size) => {
    let params = {
      assetTypeId: selectedProduct,
      pageNum: num,
      pageSize: size,
      status: 1,
    };

    let res = await getMaintenancelist(params);

    if (res?.data?.code == 200) {
      const { list, total } = res?.data?.data;
      setRows(list);
      setTotal(total);
      setPage(num);
      setPageSize(size);
    }
  };

  return (
    <>
      <div className={styles.title}>Historical Maintenance Log</div>
      <div className={styles.table}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => {
                  return (
                    <TableHeader key={header.key}>{header.header}</TableHeader>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.assetId}>
                  {headers.map((header) => {
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
            getTableList(page, pageSize);
          }}
        />
      </div>
    </>
  );
}

export default HistoricalMaintenanceLog;
