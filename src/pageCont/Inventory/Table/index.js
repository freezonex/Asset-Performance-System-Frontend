import React, { Component } from 'react';
import styles from './index.module.scss';

import {
  Pagination,
} from '@carbon/react';

import _ from 'lodash';

import ChildItem from './ChildItem';
import classNames from 'classnames';

class Comp extends Component {
  state = {

    /***************** 表格相关 ********************/
    tabList: [],           //列表数据
    total: 0,              //总条数
    pageSize: 10,          //每页条数
    pageNum: 1,            //当前页

    // 展开 map
    unfoldMap: {},
  }

  componentDidMount = () => {
    this.props.init?.(this)
    this.getList()
  }

  // 获取用户列表
  getList = async (params = {}) => {
    this.setState({
      tabList: [1, 2, 3, 4, 5]
    })
  };

  // 返回table列表
  renderTableData = (item, i) => {
    const { unfoldMap } = this.state
    return {
      key: i,
      '1': 'Computer',
      '2': '50',
      '3': '-',
      '4': '1.2%',
      '5': 'Apple',
      '6': '30',
      '7': '2023.10.01',
      'options': <div className={styles.options}>
        <span>2023.10.01</span>
        <a
         className={classNames({
          [styles.open] : unfoldMap[i]
         })}
         onClick={() => {
          var obj = { ...unfoldMap }
          if (obj[i]) {
            delete obj[i]
          } else {
            obj[i] = 1
          }
          this.setState({ unfoldMap: obj })
        }}
        >View All</a>
      </div>,
    };
  };

  render() {
    const { unfoldMap } = this.state
    console.log(this.state.unfoldMap)
    const {
      tabList,
      total,
      pageSize,
      pageNum,
    } = this.state;

    var headers = [
      { key: '1', header: 'Asset Type', width: '8%' },
      { key: '2', header: 'Quantity', width: '8%' },
      { key: '3', header: 'Unit', width: '7%' },
      { key: '4', header: 'Usage Rate ', width: '8%' },
      { key: '5', header: 'Supplier Name', width: '12%' },
      { key: '6', header: 'Expected Quantity ', width: '17%' },
      { key: '7', header: 'Creation Time', width: '17%' },
      { key: 'options', header: 'Expected  Date', width: '23%' },
    ];

    return (
      <div className={styles.container}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            {headers.map((header, i) => {
              var width = header.width || 'auto'
              return (
                <div
                  key={header.key}
                  className={styles.tableCell}
                  style={{
                    width: width,
                    minWidth: width,
                    maxWidth: width,
                  }}
                >
                  {header.header}
                </div>
              )
            })}
          </div>

          <div className={styles.tableBody}>
            {tabList.map((item, i) => this.renderTableData(item, i)).map((row, index) => {
              var showChild = unfoldMap[index]
              return (
                <>
                  <div className={styles.tableRow} key={row.id}>
                    {headers.map((header) => {
                      var width = header.width || 'auto'
                      return (
                        <div
                          key={header.key}
                          className={classNames([styles.tableCell, {
                            [styles.showChild]: showChild
                          }])}
                          style={{
                            width: width,
                            minWidth: width,
                            maxWidth: width,
                          }}
                        >
                          {row[header.key]}
                        </div>
                      );
                    })}
                  </div>
                  <ChildItem showChild={showChild} />
                </>
              )
            })}
          </div>
        </div>

        <Pagination
          backwardText="Previous page"
          forwardText="Next page"
          itemsPerPageText=""
          page={pageNum}
          pageNumberText="Page Number"
          pageSize={pageSize}
          pageSizes={[10, 20, 30, 40, 50]}
          totalItems={total}
          onChange={({ page, pageSize }) => {

          }}
        />

      </div>
    );
  }
}

export default Comp;