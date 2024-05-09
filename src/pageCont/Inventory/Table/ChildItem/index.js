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
    this.setState({ isSHow: true })
  }
  close = () => {
    console.log('关')
    if (this.contThis) {
      this.contThis?.close()
    }
    setTimeout(() => {
      if(!this.props.showChild){
        this.setState({ isSHow: false })
      }
    }, 1000)
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
  render() {
    const { isSHow } = this.state
    return (
      <div>
        {isSHow && <Cont init={This => this.contThis = This} />}
      </div>
    );
  }
}

export default Comp;