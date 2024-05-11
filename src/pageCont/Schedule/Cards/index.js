'use client';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';


function Cards() {

  const [page, setPage] = useState(1);

  return (
    <div className={styles.cardParent}>
        <div  className={classNames(styles.card)}>
            <div className={styles.cardHeader}>Scheduled</div>
            <div className={styles.cardBottom}>
                <div className={styles.bottomLeft}>281</div>
                <div className={styles.bottomright}>work records</div>
            </div>
        </div>
        <div className={styles.card}>
            <div className={styles.cardHeader}>Scheduling Issues</div>
            <div className={styles.cardBottom}>
                <div className={styles.bottomLeft} style={{color: '#0063f9'}}>16</div>
                <div className={styles.bottomright}>work records</div>
            </div>
        </div>
        <div className={styles.card}>
            <div className={styles.cardHeader}>usage Rate</div>
            <div className={styles.cardBottom}>
                <div className={styles.bottomLeft}>81%</div>
            </div>
        </div>
        <div className={styles.card}>
            <div className={styles.cardHeader}>Total Asset</div>
            <div className={styles.cardBottom}>
                <div className={styles.bottomLeft}>21</div>
                <div className={styles.bottomright}>types</div>
            </div>
        </div>
    </div>
  );
}
export default Cards;
