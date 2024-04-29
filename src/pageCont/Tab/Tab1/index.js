'use client';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import styles from './index.module.scss';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import { Content, Theme, Button } from '@carbon/react';
import { ThemeContext } from '@/utils/ThemeContext';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => (
          <Theme theme={theme.contentTheme}>
          <Content>
            <div className={styles.container}>
              <div>1111</div>
              <Button onClick={() => {}}>carbon UI</Button>
            </div>
          </Content>
        </Theme>
        )}
      </ThemeContext.Consumer>
    );
  }
}

// Comp.getLayout = function (page) {
//   return <MenuLayout>{page}</MenuLayout>;
// };

export default Comp;
