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
import {getAssetList} from '@/api/assets'

function TablePage({ formValue, isSearchClicked }) {
  const headers = [
    { key: 'assetId', header: 'Asset Id' },
    { key: 'assetName', header: 'Asset Name' },
    { key: 'assetType', header: 'Asset Type' },
    { key: 'vendorModel', header: 'Vendor&Model' },
    { key: 'description', header: 'Description' },
    { key: 'sn', header: 'SN' },
    { key: 'status', header: 'Status' },
    { key: 'more', header: 'More' },
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
      label: 'Scheduled Stop',
      type: 'purple',
    },
  };
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(5);
  const [modalTableIsopen, setModalTableIsopen] = useState(false);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    // 是否携带搜索条件
    if (isSearchClicked) {
      let obj={...formValue,pageNum:1,pageSize:10}
      getTableList(obj);
    } else {
      // 无搜索条件 调用接口
      getTableList();
    }
   
  }, [isSearchClicked]);

  const getTableList = async(filters)=>{
    let reqData = {
      pageNum: page,
      pageSize: pageSize,
      ...filters,
    }
    let res = await getAssetList(reqData)
    
    if(res?.data?.code == 200){
      const {data} = res?.data;
      setRows(data?.list)
      setTotal(data?.total)
      setPage(data?.pageNum);
      setPageSize(data?.pageSize);
    }
  }
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
          getTableList({
            pageNum: page,
            pageSize: pageSize,
          })
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

export default TablePage;
