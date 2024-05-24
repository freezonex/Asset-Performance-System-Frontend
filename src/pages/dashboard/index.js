'use client';
import React, { Component, useContext } from 'react';
import { withRouter } from 'next/router';
import { Content, Theme } from '@carbon/react';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import Dashboard from '@/pageCont/Dashboard';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div style={{ height: '100%' }}>
        {/* <Head>
          <title>Dashboard</title>
        </Head> */}
        <Dashboard/>
      </div>
    );
  }
}

Comp.getLayout = function (page) {
  return (
      <MenuLayout >{page}</MenuLayout>
  );
};

export default Comp;
