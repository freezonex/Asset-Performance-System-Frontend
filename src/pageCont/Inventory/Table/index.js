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
      tabList: [1,2,3,4,5]
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
      { key: '1', header: 'Asset Type' },
      { key: '2', header: 'Quantity' },
      { key: '3', header: 'Unit' },
      { key: '4', header: 'Usage Rate ' },
      { key: '5', header: 'Supplier Name' },
      { key: '6', header: 'Expected Quantity ' },
      { key: '7', header: 'Creation Time' },
      { key: 'options', header: 'Expected  Date' },
    ];

    return (
      <div className={styles.container}>
        <TableSty>
          <StructuredListWrapper isCondensed>
            <StructuredListHead>
              <StructuredListRow head>
                {headers.map((header, index) => (
                  <StructuredListCell head key={header.key}>
                    {header.header}
                  </StructuredListCell>
                ))}
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {tabList.map((item, i) => this.renderTableData(item, i)).map((row, index) => (
                <StructuredListRow key={row.id}>
                  {headers.map((header) => {
                    return (
                      <StructuredListCell key={header.key}>
                        {row[header.key]}
                      </StructuredListCell>
                    );
                  })}
                </StructuredListRow>
              ))}
            </StructuredListBody>
          </StructuredListWrapper>
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

        </TableSty>
      </div>
    );
  }
}

export default Comp;