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
import { DocumentDownload } from '@carbon/icons-react';
import ThreePage from './threeJs/threes';
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
          styles.assetsChildrenTable,
        )}
        style={{
          height: isOpen ? 500 : 0,
          marginBottom: isOpen ? '10px' : 0,
          boxShadow: isOpen
            ? '0px 4px 4px 0px rgba(0, 0, 0, 0.2509803922)'
            : 'none',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {childrenHeaders.map((header, index) => {
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
                  <div className={styles.table3D}>
                    {isOpen && <ThreePage glbUrl ={tableList[0].glbUrl}/>}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default ChildrenTable;
