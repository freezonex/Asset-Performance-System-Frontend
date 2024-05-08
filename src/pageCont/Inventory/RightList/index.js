import React, { Component } from 'react';
import styles from './index.module.scss';
import { withRouter } from 'next/router';

import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { ContainedList, ContainedListItem } from '@carbon/react';

import {
  Add,
  Apple,
  Fish,
  Strawberry,
  Close,
  Wheat,
  Pen,
  Ruler,
  Laptop,
  Keyboard,
  Alarm,
  Bicycle,
  Camera,
} from '@carbon/icons-react';


class Comp extends Component {
  render() {
    return (
      <div className={styles.container}>
         <div className={styles.header}>
            <div className={styles.title}>Safety Level Stock Spare Parts</div>
            <div className={styles.options}>View All</div>
          </div>
          <div className={styles.chart}>
            <div className={styles.list}>
              <ContainedList label="" kind="on-page">
                <ContainedListItem renderIcon={Pen}>
                  Pen
                </ContainedListItem>
                <ContainedListItem renderIcon={Ruler}>
                  Ruler
                </ContainedListItem>
                <ContainedListItem renderIcon={Laptop}>
                  Laptop
                </ContainedListItem>
                <ContainedListItem renderIcon={Keyboard}>
                  Keyboard
                </ContainedListItem>
                <ContainedListItem renderIcon={Alarm}>
                  Clock
                </ContainedListItem>
                <ContainedListItem renderIcon={Bicycle}>
                  Bicycle
                </ContainedListItem>
                <ContainedListItem renderIcon={Camera}>
                  Camera
                </ContainedListItem>
              </ContainedList>
            </div>
          </div>
      </div>
    );
  }
}

export default Comp;