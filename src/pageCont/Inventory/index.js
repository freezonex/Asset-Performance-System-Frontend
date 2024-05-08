import React, { Component } from 'react';
import styles from './index.module.scss';

import { withRouter } from 'next/router';

import Eventproxy from 'eventproxy';
import { Context } from './context';
import { initEvent } from './event';

import Header from './Header';
import Chart from './Chart';
import RightList from './RightList';
import Table from './Table'


@withRouter
class Comp extends Component {
  // 组件控制器
  controller = {};
  state = {
    // 事件对象
    event: new Eventproxy(),
  };

  componentDidMount() {
    this.init();
  }

  // 初始化
  init = async () => {
    const { event } = this.state;
    initEvent(event, this);
  };

  changeState = obj => {
    this.setState(obj);
  };

  // 设置组件控制器
  setController = (name, compThis) => {
    this.controller[name] = compThis;
  };

  render() {

    const { setController } = this

    // Context 全局参数 （所有后代都可获取调用）
    var store = {
      ...this.state,
      controller: this.controller,
      changeState: this.changeState,
      setController: this.setController,
    };


    return (
      <Context.Provider value={store}>
        <Header init={This => setController('Header', This)}/>
        <div className={styles.chart}>
          <div className={styles.left}>
            <Chart init={This => setController('Chart', This)}/>
          </div>
          <div className={styles.right}><RightList init={This => setController('RightList', This)}/></div>
        </div>
        <div className="mt-12">
          <div className={styles.title}>All Assets</div>
          <Table init={This => setController('Table', This)}/>
        </div>
      </Context.Provider>
    );
  }
}

export default Comp;
