import React, { useState } from 'react';
import { Modal, Link } from '@carbon/react';
import { DocumentDownload } from '@carbon/icons-react';
import classNames from 'classnames';
import modalStyles from '@/styles/modal/modal.module.scss';
import styles from './index.module.scss';

const ModalPages = ({
  modalTableIsopen,
  setModalTableIsopen,
  tableRowData,
}) => {
  const headers = [
    { key: 'department', header: 'Department' },
    { key: 'location', header: 'Location' },
    { key: 'value', header: 'Value' },
    { key: 'responsiblePerson', header: 'Responsible Person' },
    { key: 'arrachments', header: 'Arrachments' },
  ];
  const onRequestClose = () => {
    setModalTableIsopen(false);
  };

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
    <div className={classNames([modalStyles.ModalFromStyle, styles.moreModal])}>
      <Modal
        open={modalTableIsopen}
        modalHeading="More"
        passiveModal
        onRequestClose={onRequestClose}
      >
        <div className={styles.tableParent}>
          {headers.map((item, ind) => {
            if (item.key == 'arrachments') {
              return (
                <div className={styles.parent}>
                  <div className={styles.Left}>{'arrachments'}</div>
                  <div className={styles.Right}>
                    <Link
                      // href={`${process.env.apiUrl}/apsbackend/asset/download?id=${tableRowData.id}`}
                      renderIcon={() => (
                        <DocumentDownload aria-label="Arrow Right" />
                      )}
                      style={{ cursor:'pointer' }}
                      onClick={(e) => download(e, tableRowData.id)}
                    >
                      Download
                    </Link>
                  </div>
                </div>
              );
            }
            return (
              <div className={styles.parent}>
                <div className={styles.Left}>{item.header}</div>
                <div className={styles.Right}>{tableRowData[item.key]}</div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default ModalPages;
