import React, { useEffect, useState } from 'react';
import {
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
import { getWorkOrdersQueue } from '@/api/dashboard';

function TableComp() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getTableList();
  }, []);

  const getTableList = async () => {
    let res = await getWorkOrdersQueue();

    if (res?.data?.code == 200) {
      const { data } = res?.data;
      setRows(data);
    }
  };

  const headers = [
    { key: 'orderName', header: 'Order Name' },
    { key: 'creationTime', header: 'Creation Time' },
    { key: 'dueTime', header: 'Due Time' },
    { key: 'status', header: 'Status' },
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

  return (
    <div className={classNames(tableStyles.tableStyle)}>
      <TableContainer isCondensed>
        <Table>
          <TableHead>
            <TableRow head>
              {headers.map((header) => {
                return (
                  <TableHeader head key={header.key}>
                    {header.header}
                  </TableHeader>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.assetId}>
                {headers.map((header) => {
                  if (header.key === 'status') {
                    let type = statusList[row[header.key]]?.type;
                    let label = statusList[row[header.key]]?.label;
                    return (
                      <TableCell key={header.key}>
                        {label && <Tag type={type}>{label}</Tag>}
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
  );
}

export default TableComp;
