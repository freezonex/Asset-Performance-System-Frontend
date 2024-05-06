import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <>
        <Head>
          <title>tab2</title>
        </Head>
      </>
    );
  }
}

Comp.getLayout = function (page) {
  return <MenuLayout>{page}</MenuLayout>;
};

export default Comp;
