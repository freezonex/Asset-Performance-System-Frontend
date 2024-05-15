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

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div>
        <Head>Dashboard</Head>
        <Breadcrumb>
          <BreadcrumbItem
            onClick={() => {
              // this.props.router.push(`/assets`);
            }}
          >
            Dashboard
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
              <div className={styles.workOrders}>{/* <WorkOrders/> */}</div>
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
                <div className={styles.compTitle}>Work orders queue</div>
                <WorkOrderTable />
              </div>
            </div>
          </div>
          {/* 右侧 */}
          <div className={styles.right}>
            <div className={styles.rightTop}>
              <div div className={styles.compTitle}>Calendar</div>
              <CalendarComp/>
            </div>
            <div className={styles.rightBottom}>
            <div className={styles.compTitle}>Events</div>
              <Events/>
            </div>
          </div>
        </div>

        {/* 消息提示弹框 */}
        <Message/>
      </div>
    );
  }
}

export default Comp;
