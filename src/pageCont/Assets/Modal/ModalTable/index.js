import React, { useState } from 'react';
import {
  Modal,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => {
                    return (
                      <TableHeader key={`${header.key}_head`}>
                        {header.header}
                      </TableHeader>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    {headers.map((header) => {
                      return (
                        <TableCell key={header.key}>
                          {row[header.key]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
    </div>
  );
};

export default ModalPages;
