'use client';
import React, { Component, useContext } from 'react';
import { withRouter } from 'next/router';
import { Content, Theme } from '@carbon/react';
import { ThemeContext, ThemeProvider } from '@/utils/ThemeContext';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import Tab from '@/pageCont/Tab/Tab1';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Head>
          <title>tab1</title>
        </Head>
        <Tab />
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
