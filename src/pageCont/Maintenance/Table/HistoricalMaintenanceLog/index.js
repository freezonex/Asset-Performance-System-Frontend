import React, { useState } from 'react';
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

function HistoricalMaintenanceLog() {
  const headers = [
    { key: 'date', header: 'Date' },
    { key: 'content', header: 'Maintenance Content' },
  ];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(6);
  const [rows, setRows] = useState([
    {
      date: '2024.05.01',
      content: 'Content',
    },
    {
      date: '2024.05.01',
      content: 'Content',
    },
    {
      date: '2024.05.01',
      content: 'Content',
    },
    {
      date: '2024.05.01',
      content: 'Content',
    },
    {
      date: '2024.05.01',
      content: 'Content',
    },
    {
      date: '2024.05.01',
      content: 'Content',
    },
  ]);
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
          pageSizes={[5, 10, 20, 30, 40, 50]}
          totalItems={total}
          onChange={({ page, pageSize }) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );
}

export default HistoricalMaintenanceLog;
