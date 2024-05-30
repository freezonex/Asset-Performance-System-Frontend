import React, { Component } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';
import { Breadcrumb, BreadcrumbItem, Heading } from '@carbon/react';

@withRouter
class Comp extends Component {
  render() {
    return (
      <div>
        <Head>Space</Head>
        <Breadcrumb>
          <BreadcrumbItem
            onClick={() => {
              // this.props.router.push(`/assets`);
            }}
          >
            Space
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="bx--col-lg-16 flex justify-between items-center">
          <div>
            <Heading className="mt-2 text-[28px] font-normal">Space</Heading>
            <Heading
              className={classNames('mt-1 text-sm', {
                [styles.textColor]: true,
              })}
            >
              Here you can view your 3D Space and Workspace Model.
            </Heading>
          </div>
        </div>

        <div className={styles.content}>
          <iframe
            src="https://app.powerbi.com/view?r=eyJrIjoiY2Y4NGFkOGYtODc5OS00Yzg4LWEyZGMtZTRlZjIzNmQ4MWE5IiwidCI6ImFhNGU1ODM1LWU3YjctNDQ3NC1hZTE1LWQ3OTA0OTYwZDY2NCIsImMiOjEwfQ%3D%3D"
            title=""
          ></iframe>
        </div>
      </div>
    );
  }
}

export default Comp;
