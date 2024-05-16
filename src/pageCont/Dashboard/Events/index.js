import React, { useEffect, useState } from 'react';
import { Calendar } from '@carbon/icons-react';
import styles from './index.module.scss';
import moment from 'moment';
import { getEventList } from '@/api/dashboard';

function Events(props) {
  const { range } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    getTableList();
  }, [range]);

  const getTableList = async () => {
    if (range?.from && range?.to) {
      const params = {
        startDate: range?.from && moment(range?.from).format('yyyy-MM-DD'),
        endDate: range?.to && moment(range?.to).format('yyyy-MM-DD'),
      };

      let res = await getEventList(params);

      if (res?.data?.code == 200) {
        const { data } = res?.data;
        setList(data);
      }
    } else {
      setList([]);
    }
  };

  const getItem = (item) => {
    const { eventName, eventTime } = item;

    return (
      <div className={styles.listItem}>
        <div className={styles.heads}></div>
        <div>
          <div className={styles.title}>{eventName}</div>
          <div className={styles.aboutTime}>
            <div className={styles.timeIcon}>
              <Calendar />
            </div>
            <div className={styles.time}>{eventTime}</div>
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
