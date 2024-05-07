'use client';
import React, { Component, useContext } from 'react';
import { withRouter } from 'next/router';
import { Content, Theme } from '@carbon/react';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import WorkOrder from '@/pageCont/WorkOrder';


@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Head>
          <title>workOrder</title>
        </Head>
        <WorkOrder/>
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
