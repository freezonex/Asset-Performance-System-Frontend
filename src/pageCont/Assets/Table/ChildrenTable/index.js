import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  Link,
} from '@carbon/react';
import classNames from 'classnames';
import { DocumentDownload, NonCertified } from '@carbon/icons-react';
import tableStyles from '@/styles/table/table.module.scss';
import styles from './index.module.scss';

function ChildrenTable({ tableList, isOpen }) {
  const childrenHeaders = [
    { key: 'department', header: 'Department' },
    { key: 'location', header: 'Location' },
    { key: 'value', header: 'Value' },
    { key: 'responsiblePerson', header: 'Responsible Person' },
    { key: 'attachments', header: 'Attachments' },
  ];

  // 下载
  const download = async (e, id) => {
    e.preventDefault();

    let fileName = '';
    fetch(`${process.env.apiUrl}/apsbackend/asset/download?id=${id}`)
      .then((response) => {
        const arr = response.headers.get('Content-Disposition').split(';');
        fileName = window.decodeURI(arr[1]?.split('=')[1]);
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = fileName;
        a.href = url;
        a.click();
        window.URL.revokeObjectURL(url);
        a = null;
      });
  };
  return (
    <>
      <div
        className={classNames(
          tableStyles.tableStyle,
          styles.assetsChildrenTable,
        )}
        style={{
          height: isOpen ? 194 : 0,
          margin:isOpen ? '15px 0' : 0,
          boxShadow:isOpen? '0px 0px 15px 6px rgba(0, 0, 0, 0.2)':'none',
        }}
      >
        <div className={styles.boxShowa}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {childrenHeaders.map((header, index) => {
                    if (header.key == 'status') {
                      return (
                        <TableHeader
                          style={{ minWidth: '108px' }}
                          key={`${header.key}_head_child`}
                        >
                          {header.header}
                        </TableHeader>
                      );
                    }
                    return (
                      <TableHeader key={`${header.key}_head_child`}>
                        {header.header}
                      </TableHeader>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableList.map((row, i) => {
                  return (
                    <TableRow key={row.id}>
                      {childrenHeaders.map((header) => {
                        if (header.key === 'attachments') {
                          return (
                            <TableCell key={header.key}>
                              <Link
                                // href={`${process.env.apiUrl}/apsbackend/asset/download?id=${tableRowData.id}`}
                                renderIcon={() => (
                                  <DocumentDownload aria-label="Arrow Right" />
                                )}
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => download(e, row.id)}
                              >
                                Download
                              </Link>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={header.key}>
                            {row[header.key]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {/* 3d展示table */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>{'3D'}</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan="9">
                    <div>11111</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default ChildrenTable;
