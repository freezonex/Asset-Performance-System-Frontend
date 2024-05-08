import React, { Component } from 'react';
import styles from './index.module.scss';
import { withRouter } from 'next/router';

import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { ContainedList, ContainedListItem } from '@carbon/react';
import ModalTable from '../Modal/ModalTable'

import {
  Pen,
  Ruler,
  Laptop,
  Keyboard,
  Alarm,
  Bicycle,
  Camera,
} from '@carbon/icons-react';


class Comp extends Component {
  state={
    modalTableIsopen:false,
  }
  componentDidMount = () => {
		this.props.init?.(this)
	}
  setModalTableIsopen=()=>{
    this.setState({modalTableIsopen:false})
  }
  render() {
    const {modalTableIsopen} = this.state
    return (
      <div className={styles.container}>
         <div className={styles.header}>
            <div className={styles.title}>Safety Level Stock Spare Parts</div>
            <div className={styles.options} onClick={()=>{
              this.setState({modalTableIsopen:true})
            }}>View All</div>
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

          <ModalTable modalTableIsopen={modalTableIsopen} setModalTableIsopen={this.setModalTableIsopen}/>
      </div>
    );
  }
}

export default Comp;