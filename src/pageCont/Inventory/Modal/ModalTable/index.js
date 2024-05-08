import React, { useState } from 'react';
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

const ModalPages = ({ modalTableIsopen, setModalTableIsopen }) => {
  const headers = [
    { key: 'department', header: 'Department' },
    { key: 'location', header: 'Location' },
    { key: 'installation_date', header: 'Installation Date' },
    { key: 'value', header: 'Value' },
    { key: 'responsible_person', header: 'Responsible Person' },
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

  return (
    <div className={styles.ModalFromStyle}>
      <Modal
        open={modalTableIsopen}
        modalHeading="More"
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
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalPages;
