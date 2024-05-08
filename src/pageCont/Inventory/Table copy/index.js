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
} from '@carbon/react';
import { Edit, Delete,TableItem } from '@carbon/icons-react';
import styles from './table.module.scss';
// import ShelfLocationModal from '../Modal/ShelfLocationModal';
// import {
//   deleteWarehouse,
//   fetchWarehouses,
//   fetchWarehousesWithFilters,
// } from '@/actions/actions';
// import EditWarehouseModal from '../Modal/EditWarehouseModal';

import TableSty from '@/components/basicComp/TableSty';

function WarehouseTable({
  refresh,
  setRefresh,
  filters,
  isSearchClicked,
  init,
}) {
  const headers = [
    { key: 'asset_id', header: 'Asset Type' },
    { key: 'asset_name', header: 'Quantity' },
    { key: 'asset_type', header: 'Unit' },
    { key: 'vendor_model', header: 'Usage Rate ' },
    { key: 'description', header: 'Supplier Name' },
    { key: 'sn', header: 'Expected Quantity ' },
    { key: 'status', header: 'Creation Time' },
    { key: 'more', header: 'Expected  Date' },
  ];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  //const rowsToShow = rows.slice((page - 1) * pageSize, page * pageSize);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState({});
  const [rows, setRows] = useState([{
    id:'001',
    asset_id:'S#24022901',
    asset_name:'Laptop',
    asset_type:'Computer',
    vendor_model:'Y355L4-8',
    description:'bdaudbjakfdifhkhka',
    sn:'dafjskdf', 
    status:'1',
  }]);

  useEffect(()=>{
    init?.(this)
  },[])

  useEffect(() => {
    if (isSearchClicked) {
      const filteredFormValue = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {}
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
    <TableSty>
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
                        onClick={() =>
                          handleShowShelves(
                            row.id,
                            row['warehouse_id'],
                            row['name']
                          )
                        }
                      >
                        ...
                      </Link>
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
      {/* <ShelfLocationModal
        warehouse_info={selectedWarehouseInfo}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      ></ShelfLocationModal> */}

      {/* <EditWarehouseModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        warehouseValues={editRow}
        setRefresh={setRefresh}
        setWarehouseValues={setEditRow}
      ></EditWarehouseModal> */}
    </TableSty>
  );
}

export default WarehouseTable;
