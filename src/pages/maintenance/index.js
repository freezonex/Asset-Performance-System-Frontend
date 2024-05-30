'use client';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import Maintenance from '@/pageCont/Maintenance';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div style={{ height: '100%' }}>
        {/* <Head>
          <title>Maintenance</title>
        </Head> */}
        <Maintenance />
      </div>
    );
  }
}

Comp.getLayout = function (page) {
  return <MenuLayout>{page}</MenuLayout>;
};

export default Comp;
