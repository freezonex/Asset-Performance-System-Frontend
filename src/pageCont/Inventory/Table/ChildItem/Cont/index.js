import React, { Component } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { update } from '@/utils/immutableUtil';
import { queryByAssetTypeList } from '@/api/common';
import {
  Pagination,
} from '@carbon/react';

class Comp extends Component {
  state = {
    isSHow: false,
    tabList: [],           //列表数据
    total: 0,              //总条数
    pageSize: 10,          //每页条数
    pageNum: 1,            //当前页
  }
  componentDidMount() {
    this.props.init?.(this)

  }

  open = () => {
    this.setState({
      pageNum: 1,
      pageSize: 10,
    }, () => {
      this.getList({
        pageNum: 1,
        pageSize: 10,
        defaultPage:true,
      })
    })
  }

  close = () => {
    this.setState({ isSHow: false })
  }

  // 获取列表
  getList = async (params = {}) => {
    const {
      pageNum,
      pageSize,
    } = this.state;

    console.log(this.props.data)

    var reqData = {
      pageNum,
      pageSize,
      "assetTypeId": this.props.data.assetTypeId,
      currentId:this.props.data.id,
    };
    reqData = { ...reqData, ...params };

    var rs = await queryByAssetTypeList(reqData);
    console.log(rs)
    // 成功
    if (rs?.data?.code == 200) {
      var data = rs.data.data
      this.setState({
        tabList: data.list,
        total: parseInt(data.total),
        pageSize: parseInt(data.pageSize),
        pageNum: parseInt(data.pageNum),
        isSHow: true,
      });
    }
  };

  shouldComponentUpdate = (np, ns) => update.call(this, np, ns)
  render() {
    const {
      isSHow,
      tabList,
      total,
      pageSize,
      pageNum,
    } = this.state;

    var columns = [
      {
        dataIndex: 'expectedDate',
        title: 'Expected  Date',
        width: '17%',
      },
      {
        dataIndex: 'expectedQuantity',
        title: 'Expected  Quantity',
        width: '23%',
        style: {
          paddingLeft: '40px'
        },
      },
    ];

    var height = 41.2 * (tabList.length + 1)

    if (isSHow) {
      height += 40
    }

    return (
      <div
        className={classNames([styles.showComp])}
        style={{
          height: isSHow ? `${height}px` : 0,
          marginBottom: isSHow ? '10px' : 0,
        }}
      >
        <div style={{ borderRight: '1px solid #ccc' }}></div>
        {
          columns.map((header, i) => {

            var nextSty = header.style || {}

            return (
              <div
                className={styles.tableCell}
                style={{
                  width: header.width,
                  minWidth: header.width,
                  maxWidth: header.width,
                }}
              >
                <div className={styles.header} style={nextSty}>{header.title}</div>
                {
                  tabList.map((ite, i) => {
                    return (
                      <div
                        className={classNames([styles.item, {
                          [styles.s0]: ite.colorType == 0,
                          [styles.s1]: ite.colorType == 1,
                          [styles.s2]: ite.colorType == 2,
                        }])}
                        style={nextSty}
                      >
                        {ite[header.dataIndex]}
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }

        <div className={styles.pagination} style={{ width: '40%' }}>
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
                  defaultPage:false,
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