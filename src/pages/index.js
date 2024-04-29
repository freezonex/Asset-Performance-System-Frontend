import React, { Component } from 'react';
import PageCont from '@/pageCont/Tab/Tab1/index';
import { withRouter } from 'next/router'

@withRouter
class Comp extends Component {
  
  componentDidMount(){
    this.props.router.push('/tab/tab1');
  }
  render() {
    return (
      <>
        {/* <PageCont /> */}
      </>
    );
  }
}

export default Comp;