'use client';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import Space from '@/pageCont/Space';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div style={{ height: '100%' }}>
        {/* <Head>
          <title>Space</title>
        </Head> */}
        <Space />
      </div>
    );
  }
}

Comp.getLayout = function (page) {
  return <MenuLayout>{page}</MenuLayout>;
};

export default Comp;
