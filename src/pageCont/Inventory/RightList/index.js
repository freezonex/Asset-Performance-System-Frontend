import React, { Component } from 'react';
import styles from './index.module.scss';
import { withRouter } from 'next/router';

import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { ContainedList, ContainedListItem } from '@carbon/react';
import ModalTable from '../Modal/ModalTable'

import { assetTypeList } from '@/api/common';

import { Product,} from '@carbon/icons-react';


class Comp extends Component {
  state = {
    modalTableIsopen: false,
    list:[],
  }
  componentDidMount = () => {
    this.props.init?.(this)
    this.getList()
  }
  setModalTableIsopen = () => {
    this.setState({ modalTableIsopen: false })
  }

  // 获取列表
  getList = async (params = {}) => {

    var reqData = {
      pageNum: 1,
      pageSize: 8,
    };
    reqData = { ...reqData, ...params };

    var rs = await assetTypeList(reqData);
   
    // 成功
    if (rs?.data?.code == 200) {
      var data = rs.data.data
      console.log(data,"pppp")
      this.setState({
        list:data.list
      })

    }
  };



  render() {
    const { modalTableIsopen ,list } = this.state
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Safety Level Stock Spare Parts</div>
          <div className={styles.options} onClick={() => {
            this.setState({ modalTableIsopen: true })
          }}>View All</div>
        </div>
        <div className={styles.chart}>
          <div className={styles.list}>
            <ContainedList label="" kind="on-page">
              {
                list.map((item,i)=>{
                  return (
                    <ContainedListItem key={i} renderIcon={Product}>
                      {item.assetType}
                    </ContainedListItem>
                  )
                })
              }
              
            </ContainedList>
          </div>
        </div>

        <ModalTable modalTableIsopen={modalTableIsopen} setModalTableIsopen={this.setModalTableIsopen} />
      </div>
    );
  }
}

export default Comp;