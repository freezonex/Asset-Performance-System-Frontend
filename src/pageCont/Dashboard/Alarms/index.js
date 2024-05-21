import React, { useState } from 'react';
import { Close, Alarm } from '@carbon/icons-react';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';

function Alarms() {
  const router = useRouter();

  const [list, setList] = useState([
    {
      id: 1,
      content:
        'Department01 Very busy and the workload is about to reach saturation.',
    },
    {
      id: 2,
      content: 'Department02 could not be assigned any new tasks today.',
    },
    {
      id: 3,
      content:
        'Department04 Very busy and the workload is about to reach saturation.',
    },
    {
      id: 4,
      content:
        'Department05 could not be assigned any new tasks today.',
    },
  ]);

  const deleteItem = (id) => {
    const filter = list?.filter((item) => item.id !== id);
    setList(filter);
  };

  const getItem = (item) => {
    const { id, content } = item;

    return (
      <div className={styles.listItem}>
        <div
          className={styles.content}
          onClick={() => router.push(`/schedule`)}
        >
          <div className={styles.icon}>
            <Alarm></Alarm>
          </div>
          <div className={styles.text}>{content}</div>
        </div>
        <div className={styles.close}>
          <Close onClick={() => deleteItem(id)}></Close>
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

export default Alarms;
