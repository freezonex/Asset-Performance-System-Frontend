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
  Pagination,
  Tag,
} from '@carbon/react';
import { Edit, Delete, TableItem } from '@carbon/icons-react';
import ModalTable from '../Modal/ModalTable';
import styles from '@/styles/table/table.module.scss';

// import ShelfLocationModal from '../Modal/ShelfLocationModal';
// import {
//   deleteWarehouse,
//   fetchWarehouses,
//   fetchWarehousesWithFilters,
// } from '@/actions/actions';
// import EditWarehouseModal from '../Modal/EditWarehouseModal';

function WarehouseTable({ refresh, setRefresh, filters, isSearchClicked }) {
  const headers = [
    { key: 'asset_id', header: 'Asset Id' },
    { key: 'asset_name', header: 'Asset Name' },
    { key: 'asset_type', header: 'Asset Type' },
    { key: 'vendor_model', header: 'Vendor&Model' },
    { key: 'description', header: 'Description' },
    { key: 'sn', header: 'SN' },
    { key: 'status', header: 'Status' },
    { key: 'more', header: 'More' },
  ];
  const statusList = {
    1: {
      label: 'Halt',
      type: 'red',
    },
    2: {
      label: 'Maintaining',
      type: 'green',
    },
    3: {
      label: 'Running',
      type: 'blue',
    },
    4: {
      label: 'Scheduled Stop',
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
      asset_id: 'S#24022901',
      asset_name: 'Laptop',
      asset_type: 'Computer',
      vendor_model: 'Y355L4-8',
      description: 'bdaudbjakfdifhkhka',
      sn: 'dafjskdf',
      status: '1',
    },
    {
      id: '002',
      asset_id: 'S#24022901',
      asset_name: 'Laptop',
      asset_type: 'Computer',
      vendor_model: 'Y355L4-8',
      description: 'bdaudbjakfdifhkhka',
      sn: 'dafjskdf',
      status: '2',
    },
    {
      id: '003',
      asset_id: 'S#24022901',
      asset_name: 'Laptop',
      asset_type: 'Computer',
      vendor_model: 'Y355L4-8',
      description: 'bdaudbjakfdifhkhka',
      sn: 'dafjskdf',
      status: '3',
    },
    {
      id: '004',
      asset_id: 'S#24022901',
      asset_name: 'Laptop',
      asset_type: 'Computer',
      vendor_model: 'Y355L4-8',
      description: 'bdaudbjakfdifhkhka',
      sn: 'dafjskdf',
      status: '4',
    },
    {
      id: '005',
      asset_id: 'S#24022901',
      asset_name: 'Laptop',
      asset_type: 'Computer',
      vendor_model: 'Y355L4-8',
      description: 'bdaudbjakfdifhkhka',
      sn: 'dafjskdf',
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
        // fetchWarehousesWithFilters(filteredFormValue, {
        //   pageNum: page,
        //   pageSize,
        // }).then((res) => {
        //   setRows(res.list);
        //   setTotal(res.total);
        // });
      }
    } else {
      // fetchWarehouses({ pageNum: page, pageSize }).then((res) => {
      //   setRows(res.list);
      //   setTotal(res.total);
      // });
    }
  }, [page, pageSize, refresh, isSearchClicked]);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleEditRow = (row) => {
    setEditRow(row);
    setEditModalOpen(true);
  };

  const handleDeleteRow = async (id) => {
    // deleteWarehouse(id).then((res) => setRefresh({}));
  };
  const handleShowShelves = (id, warehouse_id, name) => {
    setSelectedWarehouseInfo({
      id: id,
      warehouse_id: warehouse_id,
      warehouse_name: name,
    });
    setModalOpen(true);
  };
  console.log(selectedWarehouseInfo);

  return (
    <div className={styles.tableStyle}>
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
                if (header.key === 'more') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Link
                        onClick={() => {
                          // handleShowShelves(
                          //   row.id,
                          //   row['warehouse_id'],
                          //   row['name']
                          // )
                          setModalTableIsopen(true);
                        }}
                      >
                        ...
                      </Link>
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
      {
        <ModalTable
          modalTableIsopen={modalTableIsopen}
          setModalTableIsopen={setModalTableIsopen}
        />
      }
    </div>
  );
}

export default WarehouseTable;
