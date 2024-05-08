'use client';
import React, { useState, useEffect } from 'react';
import {
  HeaderGlobalAction,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Link,
  IconButton,
  Button,
  Pagination,
  Tag,
} from '@carbon/react';
import classNames from 'classnames';
// import ModalTable from '../Modal/ModalTable';
import tableStyles from '@/styles/table/table.module.scss';
import styles from './index.module.scss';

// import ShelfLocationModal from '../Modal/ShelfLocationModal';
// import {
//   deleteWarehouse,
//   fetchWarehouses,
//   fetchWarehousesWithFilters,
// } from '@/actions/actions';
// import EditWarehouseModal from '../Modal/EditWarehouseModal';

function TablePage({ refresh, setRefresh, filters, isSearchClicked }) {
  const headers = [
    { key: 'work_order', header: 'Work Order' },
    { key: 'order_name', header: 'Order Name' },
    { key: 'description', header: 'Description' },
    { key: 'priority', header: 'Priority' },
    { key: 'asset_id', header: 'Asset ID' },
    { key: 'creation_time', header: 'Creation Time' },
    { key: 'due_time', header: 'Due Time' },
    { key: 'status', header: 'Status' },
    { key: 'edit', header: 'Edit' },
  ];
  const statusList = {
    1: {
      label: 'Closed',
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(5);
  //const rowsToShow = rows.slice((page - 1) * pageSize, page * pageSize);
  const [modalTableIsopen, setModalTableIsopen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState({});
  const [rows, setRows] = useState([
    {
      id: '001',
      work_order: 'S#24022901',
      order_name: 'Laptop',
      description: 'bdaudbjakfdifhkhka',
      priority: 'Computer',
      asset_id: 'S#24022901',
      creation_time: 1709785600000,
      due_time: 1709785600000,
      status: '1',
    },
    {
      id: '002',
      work_order: 'S#24022901',
      order_name: 'Laptop',
      description: 'bdaudbjakfdifhkhka',
      priority: 'Computer',
      asset_id: 'S#24022901',
      creation_time: 1709785600000,
      due_time: 1709785600000,
      status: '2',
    },
    {
      id: '003',
      work_order: 'S#24022901',
      order_name: 'Laptop',
      description: 'bdaudbjakfdifhkhka',
      priority: 'Computer',
      asset_id: 'S#24022901',
      creation_time: 1709785600000,
      due_time: 1709785600000,
      status: '3',
    },
    {
      id: '004',
      work_order: 'S#24022901',
      order_name: 'Laptop',
      description: 'bdaudbjakfdifhkhka',
      priority: 'Computer',
      asset_id: 'S#24022901',
      creation_time: 1709785600000,
      due_time: 1709785600000,
      status: '4',
    },
    {
      id: '005',
      work_order: 'S#24022901',
      order_name: 'Laptop',
      description: 'bdaudbjakfdifhkhka',
      priority: 'Computer',
      asset_id: 'S#24022901',
      creation_time: 1709785600000,
      due_time: 1709785600000,
      status: '1',
    },
  ]);
  useEffect(() => {
    if (isSearchClicked) {
      const filteredFormValue = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {},
      );
      if (Object.entries(filteredFormValue).length > 0) {
        //  调用接口
      }
    } else {
      //  调用接口
    }
  }, [page, pageSize, refresh, isSearchClicked]);


  return (
    <div className={classNames(tableStyles.tableStyle, styles.workOrderTable)}>
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
                if (header.key === 'edit') {
                  return (
                    <StructuredListCell key={header.key}>
                      <span
                        className={styles.editText}
                        onClick={() => {
                          setModalTableIsopen(true);
                        }}
                      >
                        Edit
                      </span>
                      <span className={styles.delText}>Delete</span>
                    </StructuredListCell>
                  );
                }
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

      {/* more modal */}
      {/* 
        <ModalTable
          modalTableIsopen={modalTableIsopen}
          setModalTableIsopen={setModalTableIsopen}
        />
       */}
    </div>
  );
}

export default TablePage;
