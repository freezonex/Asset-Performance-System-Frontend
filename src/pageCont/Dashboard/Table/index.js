import React, { useState } from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Tag,
} from '@carbon/react';
import classNames from 'classnames';
import tableStyles from '@/styles/table/table.module.scss';

function Table() {
  const headers = [
    { key: 'order_name', header: 'Order Name' },
    { key: 'creation_time', header: 'Creation Time' },
    { key: 'due_time', header: 'Due Time' },
    { key: 'status', header: 'Status' },
  ];
  const statusList = {
    1: {
      label: 'Dued',
      type: 'red',
    },
    2: {
      label: 'Open',
      type: 'green',
    },
    3: {
      label: 'In Progress',
      type: 'blue',
    },
    4: {
      label: 'Review',
      type: 'purple',
    },
  };
  const [rows, setRows] = useState([
    {
      id: '001',
      order_name: 'Laptop',
      creation_time: 1709785600000,
      due_time: 1709785600000,
      status: '2',
    },
    {
      id: '002',
      order_name: 'Laptop',
      creation_time: 1709785600000,
      due_time: 1709785600000,
      status: '3',
    },
    {
      id: '003',
      order_name: 'Laptop',
      creation_time: 1709785600000,
      due_time: 1709785600000,
      status: '1',
    },
    {
      id: '004',
      order_name: 'Laptop',
      creation_time: 1709785600000,
      due_time: 1709785600000,
      status: '4',
    },
  ]);

  return (
    <div className={classNames(tableStyles.tableStyle)}>
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
                if (header.key === 'status') {
                  let type = statusList[row[header.key]]?.type;
                  let label = statusList[row[header.key]]?.label;
                  return (
                    <StructuredListCell key={header.key}>
                      <Tag type={type}>{label}</Tag>
                    </StructuredListCell>
                  );
                }
                return (
                  <StructuredListCell key={header.key}>
                    {row[header.key]}
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

export default Table;
