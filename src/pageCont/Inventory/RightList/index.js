import React, { Component } from 'react';
import styles from './index.module.scss';
import { withRouter } from 'next/router';


class Comp extends Component {
  componentDidMount = () => {

  };
  render() {
    return (
      <div className={styles.container}>
         <div className={styles.header}>
            <div className={styles.title}>safety level stock spare parts</div>
            <div className={styles.options}>options</div>
          </div>
          <div className={styles.chart}>

          </div>
      </div>
    );
  }
}

export default Comp;