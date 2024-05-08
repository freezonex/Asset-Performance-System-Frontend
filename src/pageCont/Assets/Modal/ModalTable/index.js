import React, { useState } from 'react';
import {
  Modal,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
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
        </div>
      </Modal>
    </div>
  );
};

export default ModalPages;
