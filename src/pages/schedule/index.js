'use client';
import React, { Component, useContext } from 'react';
import { withRouter } from 'next/router';
import { Content, Theme } from '@carbon/react';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import Schedule from '@/pageCont/Schedule';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Head>
          <title>Schedule</title>
        </Head>
        <Schedule/>
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
