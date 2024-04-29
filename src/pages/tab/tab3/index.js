import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import Tab from '@/pageCont/Tab/Tab1';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <>
        <Head>
          <title>tab3</title>
        </Head>
        <Tab/>
      </>
    );
  }
}

Comp.getLayout = function (page) {
  return <MenuLayout>{page}</MenuLayout>;
};

export default Comp;
