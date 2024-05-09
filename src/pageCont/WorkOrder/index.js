import React, { Component } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';
import WorkOrderTable from './Table';
import CreateModal from './Modal/CreateModal'

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
      work_order: '',
      order_name: '',
      type: '',
      creation_time: '',
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
        ork_order: '',
        order_name: '',
        type: '',
        creation_time: '',
      },
    });
  };

  FormValueChange = (e) => {
    console.log(e);
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
      tableData
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
        <div className="flex mt-12 space-x-4 items-end">
          <TextInput
            className="flex-auto w-20"
            labelText="Asset ID"
            id="asset_id"
            placeholder="Asset ID"
            value={formValue.asset_id}
            onChange={(e) => {
              this.FormValueChange(e);
            }}
          />
          <TextInput
            className="flex-auto w-20"
            labelText="Asset"
            id="asset"
            placeholder="Asset"
            value={formValue.asset}
            onChange={(e) => {
              this.FormValueChange(e);
            }}
          />
          <TextInput
            className="flex-auto w-20"
            labelText="Type"
            id="type"
            placeholder="Type"
            value={formValue.type}
            onChange={(e) => {
              this.FormValueChange(e);
            }}
          />
          <TextInput
            className="flex-auto w-20"
            labelText="Person"
            id="person"
            placeholder="Person"
            value={formValue.person}
            onChange={(e) => {
              this.FormValueChange(e);
            }}
          />
          <Button
            onClick={() => {
              //搜索
              console.log(this.state.formValue, 'formValue');
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
        {/* table 表格 */}
        <div className="mt-12">
          <WorkOrderTable
            changeState={this.changeState}
            formValue={formValue}
            isSearchClicked={isSearchClicked}
          />
        </div>

        {/* Create a Asset modal */}
        {<CreateModal
          createModalIsopen = {createModalIsopen}
          createModaType={createModaType}
          tableData={tableData}
          changeState = {this.changeState}
        />}
      </div>
    );
  }
}

export default Comp;
