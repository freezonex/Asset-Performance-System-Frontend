import React, { useState } from 'react';
import {
  ToastNotification,
} from '@carbon/react';

import styles from './index.module.scss';
/**
 * 
 * @param toastIsOpen  //true 、false
 * @param toastKind  // error、 success 、 info 、warning
 * @param toastTitle  // toast 主标题
 * @param toastSubTitle  // toast 副标题
 * @param toastCaption  // toast 补充内容
 * @returns 
 */
const ModalPages = ({ toastIsOpen,toastKind,toastTitle,toastSubTitle=null,toastCaption=null}) => {

  return (
    <div className={styles.toast}>
      <ToastNotification
        title={toastTitle}
        subtitle={toastSubTitle}
        caption={toastCaption}
        hideCloseButton
        kind={toastKind}
        timeout={5000}
        open={toastIsOpen}
        notificationActionButton={
          <button onClick={()=>{}}>自定义按钮</button>
        }
      />
    </div>
  );
};

export default ModalPages;
