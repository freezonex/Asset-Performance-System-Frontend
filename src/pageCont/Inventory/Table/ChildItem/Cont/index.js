import React, { Component } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { update } from '@/utils/immutableUtil';
import { queryByAssetTypeList } from '@/api/common';

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

  open = ()=>{
    this.getList()
    // this.setState({ isSHow: true })
  }

  close = ()=>{
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
    };
    reqData = { ...reqData, ...params };

    var rs = await queryByAssetTypeList(reqData);
    console.log(rs)
    // 成功
    if (rs.data.code == 200) {
      var data = rs.data.data
      this.setState({
        tabList: data.list,
        total: parseInt(data.total),
        isSHow: true,
      });
    }
  };

  shouldComponentUpdate = (np, ns) => update.call(this, np, ns)
  render() {
    const { isSHow,tabList } = this.state

    var list = [
      {
        date: '2024.05.06',
        quantity: '60',
        state: 1,
      },
      {
        date: '2024.05.09',
        quantity: '30',
        state: 2,
      },
      {
        date: '2024.05.11',
        quantity: '20',
      },
      {
        date: '2024.05.13',
        quantity: '10',
      },
    ]

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

    var height = 41.2 * tabList.length

    return (
      <div
        className={classNames([styles.showComp, styles.auto])}
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
      </div>
    );
  }
}

export default Comp;