import React, { Component } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';
import {
  Breadcrumb,
  BreadcrumbItem,
  Heading,
  Button,
  Select,
  SelectItem,
} from '@carbon/react';
import { Download } from '@carbon/icons-react';
import Top5 from './Charts/Top5';
import HistoricalMaintenanceLog from './Table/HistoricalMaintenanceLog';
import MaintenanceCheckInterval from './Table/MaintenanceCheckInterval';
import { getSelectItemList } from '@/api/maintenance';

@withRouter
class Comp extends Component {
  state = {
    selectedProduct: '',
    selectItemList: [],
    logTableReload: false,
  };

  changeState = (obj) => {
    this.setState(obj);
  };

  componentDidMount = () => {
    this.getSelectItems();
  };

  getSelectItems = async () => {
    let res = await getSelectItemList();

    if (res?.data?.code == 200) {
      const { data } = res?.data;
      this.changeState({
        selectItemList: data,
        selectedProduct: data?.[0]?.id,
      });
    }
  };

  render() {
    const { selectedProduct, selectItemList, logTableReload } = this.state;

    return (
      <div>
        <Head>Maintenance</Head>
        <Breadcrumb>
          <BreadcrumbItem
            onClick={() => {
              // this.props.router.push(`/assets`);
            }}
          >
            Maintenance
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="bx--col-lg-16 flex justify-between items-center">
          <div>
            <Heading className="mt-2 text-[28px] font-normal">
              Maintenance Management
            </Heading>
            <Heading
              className={classNames('mt-1 text-sm', {
                [styles.textColor]: true,
              })}
            >
              Please write your purchase order here.
            </Heading>
          </div>
          <div className={styles.headAction}>
            <div className={styles.select}>
              <Select
                labelText=""
                value={selectedProduct}
                size="md"
                onChange={(v) => {
                  this.setState({ selectedProduct: v.target.value });
                }}
              >
                {selectItemList.map((item, i) => {
                  return (
                    <SelectItem
                      value={item.id}
                      text={item.assetType}
                      key={item.id}
                    />
                  );
                })}
              </Select>
            </div>
            <div className={styles.button}>
              <Button
                onClick={() => {}}
                isExpressive
                size="md"
                renderIcon={Download}
              >
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {/* 第一行 */}
          <div className={styles.top}>
            <div className={styles.top5}>
              <Top5 />
            </div>
            <div className={styles.assetValueDepreciationModel}></div>
          </div>

          {/* 第二行 */}
          <div className={styles.bottom}>
            <div className={styles.historicalMaintenanceLog}>
              {selectedProduct && (
                <HistoricalMaintenanceLog
                  selectedProduct={selectedProduct}
                  changeState={this.changeState}
                  logTableReload={logTableReload}
                />
              )}
            </div>
            <div className={styles.maintenanceCheckInterval}>
              {selectedProduct && (
                <MaintenanceCheckInterval
                  selectedProduct={selectedProduct}
                  changeState={this.changeState}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comp;
