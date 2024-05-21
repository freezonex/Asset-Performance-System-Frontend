'use client';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {getHeaderData} from '@/api/schedule'
import styles from './index.module.scss';


function Cards() {

  const [data, setData] = useState({});

  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    let res = await getHeaderData();
    if(res?.data?.code == 200){
        const {data} = res.data;
        setData(data)
    }
  }

  return (
    <div className={styles.cardParent}>
        <div  className={classNames(styles.card)}>
            <div className={styles.cardHeader}>Scheduled</div>
            <div className={styles.cardBottom}>
                <div className={styles.bottomLeft}>{data.workRecords}</div>
                <div className={styles.bottomright}>work records</div>
            </div>
        </div>
        <div className={styles.card}>
            <div className={styles.cardHeader}>Scheduling Issues</div>
            <div className={styles.cardBottom}>
                <div className={styles.bottomLeft} style={{color: '#0063f9'}}>{data.issuesWorkRecords}</div>
                <div className={styles.bottomright}>work records</div>
            </div>
        </div>
        <div className={styles.card}>
            <div className={styles.cardHeader}>Usage Rate</div>
            <div className={styles.cardBottom}>
                <div className={styles.bottomLeft}>{data.usageRate}</div>
            </div>
        </div>
        <div className={styles.card}>
            <div className={styles.cardHeader}>Total Asset</div>
            <div className={styles.cardBottom}>
                <div className={styles.bottomLeft}>{data.totalAssets}</div>
                <div className={styles.bottomright}>types</div>
            </div>
        </div>
    </div>
  );
}
export default Cards;
