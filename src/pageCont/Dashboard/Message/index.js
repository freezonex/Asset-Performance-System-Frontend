import React, { useState } from 'react';
import styles from './index.module.scss';
import { Close } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';

function Message() {
  const router = useRouter();
  const [isShow, setIsShow] = useState(true);

  const handleClick = () => {
    router.push(`/workOrder`);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <div
      className={`${styles.message} ${styles.slideInRight}`}
      style={isShow ? {} : { display: 'none' }}
    >
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className={styles.title}>A new Message</div>
        <div className={styles.content}>A new work order arrived today.</div>
      </div>
      <div>
        <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
}

export default Message;
