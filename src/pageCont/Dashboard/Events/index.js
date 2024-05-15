import React, { useState } from 'react';
import { Calendar } from '@carbon/icons-react';
import styles from './index.module.scss';

function Events() {
  const [list, setList] = useState([
    {
      id: 1,
      title: 'Create a asset',
      time: '04 March 2024 | 04:00 PM',
    },
    {
      id: 2,
      title: 'Mick is assigned a work order.',
      time: '04 March 2024 | 04:00 PM',
    },
    {
      id: 3,
      title: 'Add a maintenance record',
      time: '04 March 2024 | 04:00 PM',
    },
    {
      id: 4,
      title: 'Add a work-order',
      time: '04 March 2024 | 04:00 PM',
    },
  ]);

  const getItem = (item) => {
    const { id, title, time } = item;

    return (
      <div className={styles.listItem} key={id}>
        <div className={styles.heads}></div>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.aboutTime}>
            <div className={styles.timeIcon}>
              <Calendar />
            </div>
            <div className={styles.time}>{time}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.list}>
      {list?.map((item) => {
        return getItem(item);
      })}
    </div>
  );
}

export default Events;
