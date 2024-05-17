import React, { Component } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';
import WorkOrderTable from './Table';
import CreateModal from './Modal/CreateModal';

import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Heading,
  TextInput,
} from '@carbon/react';
import { Add, Search, Close } from '@carbon/icons-react';

@withRouter
class Comp extends Component {
  state = {
    formValue: {
      orderId: '',
      orderName: '',
      type: '',
      creationTime: '',
    },
    isSearchClicked: false, //是否搜索
    tableData: {},
    createModalIsopen: false, //create modal 状态
    createModaType: 'create', //create modal 类型 create/edit
  };
  componentDidMount = () => {};

  changeState = (obj) => {
    this.setState(obj);
  };

  initFormValue = () => {
    this.setState({
      formValue: {
        orderId: '',
        orderName: '',
        type: '',
        creationTime: '',
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
    const {
      formValue,
      isSearchClicked,
      createModalIsopen,
      createModaType,
      tableData,
    } = this.state;
    return (
      <div>
        <Head>Work Order</Head>
        <Breadcrumb>
          <BreadcrumbItem
            onClick={() => {
              // this.props.router.push(`/workOrder`);
            }}
          >
            Work Order
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="bx--col-lg-16 flex justify-between items-center">
          <div>
            <Heading className="mt-2 text-[28px] font-normal">
              Work Order
            </Heading>
            <Heading
              className={classNames('mt-1 text-sm', {
                [styles.textColor]: true,
              })}
            >
              Please write your purchase order here
            </Heading>
          </div>
          <Button
            onClick={() => {
              // setCreateModalOpen(true);
              this.setState({
                createModalIsopen: true,
              });
            }}
            isExpressive
            size="md"
            renderIcon={Add}
          >
            Create a Work Order
          </Button>
        </div>
        {/* 搜索框 */}
        <div className={styles.searchInputParent}>
          <div className={styles.searchInput}>
            <TextInput
              className={styles.searchInputChild}
              labelText="Work Order"
              id="orderId"
              placeholder="Work Order"
              value={formValue.asset_id}
              onChange={(e) => {
                this.FormValueChange(e);
              }}
            />
            <TextInput
              className={styles.searchInputChild}
              labelText="Order Name"
              id="orderName"
              placeholder="Order Name"
              value={formValue.asset}
              onChange={(e) => {
                this.FormValueChange(e);
              }}
            />
          </div>
          <div className={styles.searchInput}>
            <TextInput
              className={styles.searchInputChild}
              labelText="Type"
              id="type"
              placeholder="Type"
              value={formValue.type}
              onChange={(e) => {
                this.FormValueChange(e);
              }}
            />
            <TextInput
             className={styles.searchInputChild}
              labelText="Creation Time"
              id="creationTime"
              placeholder="Creation Time"
              value={formValue.person}
              onChange={(e) => {
                this.FormValueChange(e);
              }}
            />
          </div>
          <div  className={styles.searchBtnParent}>
            <Button
              onClick={() => {
                this.setState({
                  isSearchClicked: true,
                });
              }}
              style={{ backgroundColor: '#393939' }}
              isExpressive
              size="md"
              renderIcon={Search}
              iconDescription="Search"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                //清空搜索条件
                this.initFormValue();
              }}
              style={{ backgroundColor: '#C6C6C6' }}
              isExpressive
              size="md"
              renderIcon={Close}
              iconDescription="Close"
            >
              Cancet
            </Button>
          </div>
        </div>
        {/* table 表格 */}
        <div className="mt-12">
          <WorkOrderTable
            changeState={this.changeState}
            formValue={formValue}
            createModalIsopen={createModalIsopen}
            isSearchClicked={isSearchClicked}
          />
        </div>

        {/* Create a Asset modal */}
        {
          <CreateModal
            createModalIsopen={createModalIsopen}
            createModaType={createModaType}
            tableData={tableData}
            changeState={this.changeState}
          />
        }
      </div>
    );
  }
}

export default Comp;
