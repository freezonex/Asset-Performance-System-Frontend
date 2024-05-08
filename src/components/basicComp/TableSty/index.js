import React from 'react';
import styles from './index.module.scss';
import tableStyles from '@/styles/table/table.module.scss';

export default class extends React.Component {
  render() {
    return <div className={tableStyles.tableStyle}>{this.props.children}</div>;
  }
}
