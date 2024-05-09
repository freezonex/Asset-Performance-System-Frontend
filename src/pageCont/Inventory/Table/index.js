import React, { Component } from 'react';
import styles from './index.module.scss';

import {
  Pagination,
} from '@carbon/react';

import _ from 'lodash';
import { update } from '@/utils/immutableUtil';
import { inventorylist } from '@/api/common';

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


  // 获取列表
  getList = async (params = {}) => {
    const {
      pageNum,
      pageSize,
    } = this.state;

    var reqData = {
      pageNum,
      pageSize,
    };
    reqData = { ...reqData, ...params };

    var rs = await inventorylist({ data: reqData });
    console.log(rs)
    // 成功
    if (rs.data.code == 200) {
      var data = rs.data.data
      this.setState({
        tabList: data.list,
        total: parseInt(data.total),
      });
    }
  };

  open = (item,i)=>{
    const { unfoldMap } = this.state
    var obj = { ...unfoldMap }
    if (obj[i]) {
      delete obj[i]
    } else {
      obj[i] = 1
    }
    this.setState({ unfoldMap: obj })
  }

  // 返回table列表
  renderTableData = (item, i) => {
    const { unfoldMap } = this.state

    return {
      key: i,
      '1': item.assetType,
      '2': item.quantity,
      '3': item.unit,
      '4': item.usageRate,
      '5': item.supplierName,
      '6': item.expectedQuantity,
      '7': item.creationTime,
      'options': <div className={styles.options}>
        <span>{item.expectedDate}</span>
        <a
          className={classNames({
            [styles.open]: unfoldMap[i]
          })}
          onClick={() => {
            var time = new Date().getTime()
            if(time - this.lastTime < 1500){
              return 
            }
            this.open(item, i)
            this.lastTime = time

          }}
        >View All</a>
      </div>,
    };
  };
  shouldComponentUpdate = (np, ns) => update.call(this, np, ns);
  render() {
    const { unfoldMap } = this.state
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

        <div className={styles.pagination}>
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
              this.setState({
                pageSize: pageSize,
                pageNum: page,
              }, () => {
                this.getList({
                  pageNum: page,
                  pageSize: pageSize,
                })
              })

            }}
          />
        </div>

      </div>
    );
  }
}

export default Comp;