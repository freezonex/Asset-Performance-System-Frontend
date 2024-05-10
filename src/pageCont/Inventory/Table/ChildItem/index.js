import React, { Component } from 'react';
import styles from './index.module.scss';
import { update } from '@/utils/immutableUtil';

import Cont from './Cont';

class Comp extends Component {
  contThis = null
  state = {
    isSHow: false,
  }
  open = () => {
    console.log('开')
    this.contThis?.open()
  }
  close = () => {
    console.log('关')
    this.contThis?.close()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showChild !== this.props.showChild) {
      if (this.props.showChild) {
        this.open()
      } else {
        this.close()
      }
    }
  }
  shouldComponentUpdate = (np, ns) => update.call(this, np, ns)
  render() {
    return (
      <div>
        {<Cont init={This => this.contThis = This} data={this.props.data} />}
      </div>
    );
  }
}

export default Comp;