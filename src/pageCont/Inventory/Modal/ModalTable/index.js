import React, { useState,useEffect } from 'react';
import {
  Modal,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Pagination,
} from '@carbon/react';
import styles from '@/styles/modal/modal.module.scss';
import stylesTable from '@/styles/table/table.module.scss';

import { assetTypeQuantityList } from '@/api/common';


const ModalPages = ({ modalTableIsopen, setModalTableIsopen }) => {
  const headers = [
    { key: 'assetType', header: 'Asset Name' },
    { key: 'quantity', header: 'Quality' },
    
  ];
  const [rows, setRows] = useState([
    {
      id: '001',
      department: 'S#24022901',
      location: 'Laptop',
      installation_date: 'Computer',
      value: 'Y355L4-8',
      responsible_person: 'bdaudbjakfdifhkhka',
    },
    {
      id: '002',
      department: 'S#24022901',
      location: 'Laptop',
      installation_date: 'Computer',
      value: 'Y355L4-8',
      responsible_person: 'bdaudbjakfdifhkhka',
    },
    {
      id: '003',
      department: 'S#24022901',
      location: 'Laptop',
      installation_date: 'Computer',
      value: 'Y355L4-8',
      responsible_person: 'bdaudbjakfdifhkhka',
    },
    {
      id: '004',
      department: 'S#24022901',
      location: 'Laptop',
      installation_date: 'Computer',
      value: 'Y355L4-8',
      responsible_person: 'bdaudbjakfdifhkhka',
    },
    {
      id: '005',
      department: 'S#24022901',
      location: 'Laptop',
      installation_date: 'Computer',
      value: 'Y355L4-8',
      responsible_person: 'bdaudbjakfdifhkhka',
    },
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(5);

  const onRequestClose = () => {
    setModalTableIsopen(false);
  };


  // 获取列表
  var getList = async (params = {}) => {

    var reqData = {
      pageNum:page ,
      pageSize: pageSize,
    };
    reqData = { ...reqData, ...params };

    var rs = await assetTypeQuantityList(reqData);
   
    // 成功
    if (rs.data.code == 200) {
      var data = rs.data.data
      setRows(data.list)
      setTotal(data.total)
    }
  };

  useEffect(()=>{
      getList()
  },[])

  return (
    <div className={styles.ModalFromStyle}>
      <Modal
        open={modalTableIsopen}
        modalHeading="Safety Level Stock Spare Parts"
        passiveModal
        onRequestClose={onRequestClose}
      >
        <div className={stylesTable.tableStyle}>
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
              getList({
                pageNum:page ,
                pageSize: pageSize,
              })
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalPages;
