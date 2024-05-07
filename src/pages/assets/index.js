'use client';
import React, { Component, useContext } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import Assets from '@/pageCont/Assets'

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Head>
          <title>Assets</title>
        </Head>
        <Assets/>
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
