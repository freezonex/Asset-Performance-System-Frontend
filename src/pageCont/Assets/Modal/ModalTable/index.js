import React, { useState } from 'react';
import { Modal, Link } from '@carbon/react';
import { DocumentDownload } from '@carbon/icons-react';
import classNames from 'classnames';
import modalStyles from '@/styles/modal/modal.module.scss';
import styles from './index.module.scss';
import { assetsDownload } from '@/api/assets';
const ModalPages = ({ modalTableIsopen, setModalTableIsopen ,tableRowData}) => {
  const headers = [
    { key: 'department', header: 'Department' },
    { key: 'location', header: 'Location' },
    { key: 'value', header: 'Value' },
    { key: 'responsiblePerson', header: 'Responsible Person' },
    { key: 'arrachments', header: 'Arrachments' },
  ];
  const [rows, setRows] = useState({
    id: '001',
    department: 'S#24022901',
    location: 'Laptop',
    value: 'Y355L4-8',
    responsiblePerson: 'bdaudbjakfdifhkhka',
  });
  const onRequestClose = () => {
    setModalTableIsopen(false);
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
                      onClick={()=>{
                        const {id} = tableRowData;
                        assetsDownload({id})
                      }}
                      renderIcon={() => (
                        <DocumentDownload aria-label="Arrow Right" />
                      )}
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
                <div className={styles.Right}>{rows[item.key]}</div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default ModalPages;
