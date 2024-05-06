'use client';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div style={{height:'100%'}}>
        <Head>
          <title>tab1</title>
        </Head>
      </div>
    );
  }
}

Comp.getLayout = function (page) {
  return <MenuLayout>{page}</MenuLayout>;
};

export default Comp;
