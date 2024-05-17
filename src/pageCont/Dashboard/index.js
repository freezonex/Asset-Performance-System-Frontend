import React, { Component } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';
import { Breadcrumb, BreadcrumbItem, Heading } from '@carbon/react';
import TotalAssets from './Charts/TotalAssets';
import AssetUsed from './Charts/AssetUsed';
import WorkOrders from './Charts/WorkOrders';
import Alarms from './Alarms';
import WorkOrderTable from './Table';
import Events from './Events';
import Message from './Message';
import CalendarComp from './Calendar';
import { subYears } from 'date-fns';

@withRouter
class Comp extends Component {
  state = {
    range: {
      from: subYears(new Date(), 2),
      to: new Date(),
    },
  };

  changeState = (obj) => {
    this.setState(obj);
  };

  componentDidMount = () => {};
  render() {
    const { range } = this.state;

    return (
      <div>
        <Head>Dashboard</Head>
        <Breadcrumb>
          <BreadcrumbItem
            onClick={() => {
              // this.props.router.push(`/assets`);
            }}
          >
            Home
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="bx--col-lg-16 flex justify-between items-center">
          <div>
            <Heading className="mt-2 text-[28px] font-normal">
              Dashboard
            </Heading>
            <Heading
              className={classNames('mt-1 text-sm', {
                [styles.textColor]: true,
              })}
            >
              Hi, welcome to Asset Performance System.
            </Heading>
          </div>
        </div>
        <div className={styles.content}>
          {/* 左侧 */}
          <div className={styles.left}>
            {/* 第一行 */}
            <div className={styles.leftTop}>
              <div className={styles.totalAssets}>
                <TotalAssets />
              </div>
              <div className={styles.workOrders}>
                <div div className={styles.compTitle}>
                  Work-Orders
                </div>
                <WorkOrders />
              </div>
            </div>

            {/* 第二行 */}
            <div className={styles.leftCenter}>
              <div className={styles.assetUsed}>
                <AssetUsed />
              </div>
              <div className={styles.alarms}>
                <div className={styles.compTitle}>Alarms</div>
                <Alarms />
              </div>
            </div>

            {/* 第三行 */}
            <div className={styles.leftBottom}>
              <div className={styles.workOrdersQueue}>
                <div className={styles.compTitle}>Work Orders Queue</div>
                <WorkOrderTable />
              </div>
            </div>
          </div>
          {/* 右侧 */}
          <div className={styles.right}>
            <div className={styles.rightTop}>
              <div div className={styles.compTitle}>
                Calendar
              </div>
              <CalendarComp range={range} changeState={this.changeState} />
            </div>
            <div className={styles.rightBottom}>
              <div className={styles.compTitle}>Events</div>
              <Events range={range} />
            </div>
          </div>
        </div>

        {/* 消息提示弹框 */}
        <Message />
      </div>
    );
  }
}

export default Comp;
