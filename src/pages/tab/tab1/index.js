'use client';
import React, { Component, useContext } from 'react';
import { withRouter } from 'next/router';
import { Content, Theme } from '@carbon/react';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import { connect } from 'react-redux';

@withRouter
@connect(({ user }) => ({
  user: user
}))
class Comp extends Component {
  componentDidMount = () => {
      this.props.dispatch({
        type: 'user/setState',
        payload: {
          name:'aaaa'
        },
      });
  };
  render() {
    console.log(this.props.user)
    console.log('更新了')
    return (
      <div style={{ height: '100%' }}>
        <Head>
          <title>tab1</title>
        </Head>
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
