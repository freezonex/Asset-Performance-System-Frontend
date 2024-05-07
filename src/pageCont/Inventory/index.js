import React, { Component } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';
import WarehouseTable from './Table'
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Heading,
  TextInput,
} from '@carbon/react';
import { Add, Search, Close } from '@carbon/icons-react';

import Chart from './Chart';
import RightList from './RightList';

@withRouter
class Comp extends Component {
  state = {
    formValue: {
      asset_id: '',
      asset: '',
      type: '',
      person: '',
    },
    isSearchClicked:false,
    refresh:{},
  };
  componentDidMount = () => {};

  changeState = (obj)=>{
    this.setState({
      obj
    })
  }

  initFormValue = () => {
    this.setState({
      formValue: {
        asset_id: '',
        asset: '',
        type: '',
        person: '',
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
    const { formValue,refresh, isSearchClicked} = this.state;
    return (
      <div>
        <Head>Inventory</Head>
        <Breadcrumb>
          <BreadcrumbItem
            onClick={() => {
              router.push(`/inventory`);
            }}
          >
            Inventory
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="bx--col-lg-16 flex justify-between items-center">
          <div>
            <Heading className="mt-2 text-[28px] font-normal">Inventory</Heading>
            <Heading
              className={classNames('mt-1 text-sm', {
                [styles.textColor]: true,
              })}
            >
              Here we can do predictions for you.
            </Heading>
          </div>
          
        </div>

        <div className={styles.chart}>
          <div className={styles.left}>
            <Chart />
          </div>
          <div className={styles.right}><RightList /></div>
        </div>

        {/* table 表格 */}
        <div className="mt-12">
          <WarehouseTable
            changeState={this.changeState}
            formValue={formValue}
            refresh={refresh}
            isSearchClicked={isSearchClicked}

          />
        </div>
      </div>
    );
  }
}

export default Comp;
