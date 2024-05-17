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
  DataTable,
  TableSelectRow,
  ExpandableSearch,
} from '@carbon/react';
import { Add } from '@carbon/icons-react';

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
      id: 1,
      date: '2024.05.01',
      content: 'Content',
    },
    {
      id: 2,
      date: '2024.05.01',
      content: 'Content',
    },
    {
      id: 3,
      date: '2024.05.01',
      content: 'Content',
    },
    {
      id: 4,
      date: '2024.05.01',
      content: 'Content',
    },
    {
      id: 5,
      date: '2024.05.01',
      content: 'Content',
    },
    {
      id: 6,
      date: '2024.05.01',
      content: 'Content',
    },
  ]);
  return (
    <>
      <div className={styles.title}>
        <div className={styles.titleName}>Historical Maintenance Log</div>

        <div className={styles.titleAction}>
          <div className={styles.search}>
            <ExpandableSearch
              size="sm"
              labelText="Search"
              closeButtonLabelText="Clear search input"
              id="search-expandable-1"
              onChange={() => {}}
              onKeyDown={() => {}}
            />
          </div>
          <div className={styles.add}>
            <Add />
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <DataTable rows={rows} headers={headers} radio>
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getTableProps,
            getTableContainerProps,
          }) => (
            <TableContainer {...getTableContainerProps()}>
              <Table {...getTableProps()} aria-label="sample table">
                <TableHead>
                  <TableRow>
                    <th scope="col" style={{ width: '48px' }} />
                    {headers.map((header, i) => (
                      <TableHeader
                        key={i}
                        {...getHeaderProps({
                          header,
                        })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow
                      key={i}
                      {...getRowProps({
                        row,
                      })}
                    >
                      <TableSelectRow
                        {...getSelectionProps({
                          row,
                        })}
                      />
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
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
