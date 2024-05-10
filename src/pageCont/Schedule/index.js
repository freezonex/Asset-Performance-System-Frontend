import React, { Component } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';
import Cards from './Cards'
import TablePage from './Table';

import {

  Breadcrumb,
  BreadcrumbItem,
  Heading,

} from '@carbon/react';


@withRouter
class Comp extends Component {
  state = {
    formValue: {
      assetId: '',
      assetName: '',
      assetType: '',
      responsiblePerson: '',
    },
    isSearchClicked:false, //是否搜索
    refresh:{},
    createModalIsopen:false,//create modal 状态
    modalTableIsopen:false,//more modal 状态
  };
  componentDidMount = () => {};

  changeState = (obj)=>{
    this.setState(obj)
  }

  initFormValue = () => {
    this.setState({
      formValue: {
        assetId: '',
      assetName: '',
      assetType: '',
      responsiblePerson: '',
      },
      isSearchClicked: false,
    });
  };

  FormValueChange = (e) => {
    const { id, value } = e.target;
    let obj = { ...this.state.formValue };
    obj[id] = value;
    this.setState({
      formValue: obj,
    });
  };
  render() {
    const { formValue,refresh, isSearchClicked,createModalIsopen,modalTableIsopen} = this.state;
    return (
      <div>
        <Head>Schedule</Head>
        <Breadcrumb>
          <BreadcrumbItem
            onClick={() => {
              // this.props.router.push(`/assets`);
            }}
          >
            Schedule
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="bx--col-lg-16 flex justify-between items-center">
          <div>
            <Heading className="mt-2 text-[28px] font-normal">Schedule</Heading>
            <Heading
              className={classNames('mt-1 text-sm', {
                [styles.textColor]: true,
              })}
            >
              Here you can view the progress of your asset management.
            </Heading>
          </div>
        </div>
        {/* 卡片 */}
        <div className="flex mt-12 space-x-4 items-end">
          <Cards/>
        </div>
        {/* table 表格 */}
        <div className="mt-12">
            <TablePage/>
        </div>        
      </div>
    );
  }
}

export default Comp;
