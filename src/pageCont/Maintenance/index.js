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

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div>
        <Head>Maintenance</Head>
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
              <Select id="select-1" labelText="" helperText="" size="md">
                <SelectItem value="" text="Select a Product" />
                <SelectItem value="Option 1" text="Option 1" />
                <SelectItem value="Option 2" text="Option 2" />
                <SelectItem value="Option 3" text="Option 3" />
                <SelectItem value="Option 4" text="Option 4" />
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
            <div className={styles.top5}></div>
            <div className={styles.assetValueDepreciationModel}></div>
          </div>

          {/* 第二行 */}
          <div className={styles.bottom}>
            <div className={styles.historicalMaintenanceLog}></div>
            <div className={styles.maintenanceCheckInterval}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comp;
