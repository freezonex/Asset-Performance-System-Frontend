import React, { useState } from 'react';
import {
  Modal,
} from '@carbon/react';

import styles from '@/styles/modal/modal.module.scss';
const ModalPages = ({ deleteModalIsopen, changeModalOpen ,delConfirm}) => {
  // 关闭弹窗
  const handleCancelClicked = () => {
    // onClose();
    changeModalOpen(false);
  };

  // 提交
  const handleSubmit = (e) => {
    delConfirm()
  };

  return (
    <div className={styles.ModalFromStyle}>
      <Modal
        open={deleteModalIsopen}
        modalHeading="Deletion confirmation"
        primaryButtonText="save"
        secondaryButtonText="Cancel"
        onRequestClose={handleCancelClicked}
        onRequestSubmit={handleSubmit}
      >
        <div className='pl-5 pt-5'>
          Are you sure you want to delete?
        </div>
      </Modal>
    </div>
  );
};

export default ModalPages;
