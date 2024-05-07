import React, { Component } from 'react';
import { withRouter } from 'next/router';
import styles from './index.module.scss';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div className={styles.container}>
        111111
      </div>
    );
  }
}

export default Comp;
