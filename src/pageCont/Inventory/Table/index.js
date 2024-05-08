import React, { Component } from 'react';
import styles from './index.module.scss';

import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Pagination,
} from '@carbon/react';

import TableSty from '@/components/basicComp/TableSty';
import classNames from 'classnames';

class Comp extends Component {
  state = {

    /***************** 表格相关 ********************/
    tabList: [],           //列表数据
    total: 0,              //总条数
    pageSize: 10,          //每页条数
    pageNum: 1,            //当前页

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
        <a>View All</a>
      </div>,
    };
  };

  render() {

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
              var showChild = true
              return (
                <>
                  <div className={styles.tableRow} key={row.id}>
                    {headers.map((header) => {
                      var width = header.width || 'auto'
                      return (
                        <div
                          key={header.key}
                          className={classNames([styles.tableCell,{
                            [styles.showChild]:showChild
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
                  {
                    showChild && 
                    <div className={styles.showComp}>
                       <div
                        className={styles.tableCell}
                        style={{
                          width: '17%',
                          minWidth: '17%',
                          maxWidth: '17%',
                        }}
                      >
                        
                      </div>
                      <div
                        className={styles.tableCell}
                        style={{
                          width: '17%',
                          minWidth: '17%',
                          maxWidth: '17%',
                        }}
                      >
                        Expected  Date
                      </div>
                      <div
                        className={styles.tableCell}
                        style={{
                          width: '23%',
                          minWidth: '23%',
                          maxWidth: '23%',
                        }}
                      >
                        Expected Quantity
                      </div>
                  </div>
                  }
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