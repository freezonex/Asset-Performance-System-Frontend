import React, { Component } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';
import AssetsTable from './Table';

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
      assetId: '',
      assetName: '',
      assetType: '',
      responsiblePerson: '',
    },
    isSearchClicked: false, //是否搜索
    refresh: {},
    createModalIsopen: false, //create modal 状态
    editModalIsopen: false, //edit modal 状态
  };

  changeState = (obj) => {
    this.setState(obj);
  };

  initFormValue = () => {
    this.setState({
      formValue: {
        assetId: '',
        assetName: '',
        assetType: '',
        responsiblePerson: '',
      },
      isSearchClicked: true,
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
    const { formValue, isSearchClicked, createModalIsopen, editModalIsopen } =
      this.state;
    return (
      <div>
        <Head>Assets</Head>
        <Breadcrumb>
          <BreadcrumbItem
            onClick={() => {
              // this.props.router.push(`/assets`);
            }}
          >
            Assets
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="bx--col-lg-16 flex justify-between items-center">
          <div>
            <Heading className="mt-2 text-[28px] font-normal">Assets</Heading>
            <Heading
              className={classNames('mt-1 text-sm', {
                [styles.textColor]: true,
              })}
            >
              List of warehouses for your storage solutions
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
            Create a Asset
          </Button>
        </div>
        {/* 搜索框 */}
        <div className={styles.searchInputParent}>
          <div className={styles.searchInput}>
            <TextInput
              className="flex-auto w-20"
              labelText="Asset ID"
              id="assetId"
              placeholder="Asset ID"
              value={formValue.assetId}
              onChange={(e) => {
                this.FormValueChange(e);
              }}
            />
            <TextInput
              className="flex-auto w-20"
              labelText="Asset"
              id="assetName"
              placeholder="Asset"
              value={formValue.assetName}
              onChange={(e) => {
                this.FormValueChange(e);
              }}
            />
          </div>
          <div className={styles.searchInput}>
            <TextInput
              className="flex-auto w-20"
              labelText="Type"
              id="assetType"
              placeholder="Type"
              value={formValue.assetType}
              onChange={(e) => {
                this.FormValueChange(e);
              }}
            />
            <TextInput
              className="flex-auto w-20"
              labelText="Person"
              id="responsiblePerson"
              placeholder="Person"
              value={formValue.responsiblePerson}
              onChange={(e) => {
                this.FormValueChange(e);
              }}
            />
          </div>
          <div className={styles.searchBtnParent}>
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
              Cancel
            </Button>
          </div>
        </div>
        {/* table 表格 */}
        <div className="mt-12">
          <AssetsTable
            changeState={this.changeState}
            formValue={formValue}
            isSearchClicked={isSearchClicked}
            editModalIsopen={editModalIsopen}
            createModalIsopen={createModalIsopen}
          />
        </div>
      </div>
    );
  }
}

export default Comp;
