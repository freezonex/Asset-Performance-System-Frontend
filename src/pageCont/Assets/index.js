'use client';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import styles from './index.module.scss';
import Head from 'next/head';
import MenuLayout from '@/layouts/MenuLayout';
import {
  Content,
  Theme,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Heading,
} from '@carbon/react';
import { Add, Search, CloseOutline } from '@carbon/icons-react';
import { ThemeContext } from '@/utils/ThemeContext';

@withRouter
class Comp extends Component {
  componentDidMount = () => {};
  render() {
    return (
      // <ThemeContext.Consumer>
      //   {({ theme, setTheme }) => (
      //     <Theme theme={theme.contentTheme}>
      //     <Content>
      //       <div className={styles.container}>
      //         <div>1111</div>
      //         <Button onClick={() => {}}>carbon UI</Button>
      //       </div>
      //     </Content>
      //   </Theme>
      //   )}
      // </ThemeContext.Consumer>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <a
              onClick={() => {
                router.push(`/assets`);
              }}
            >
              Home
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem
            onClick={() => {
              router.push(`/assets`);
            }}
          >
            Assets
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="bx--col-lg-16 flex justify-between items-center">
          <div>
            <Heading className="mt-2 text-[28px] font-normal">
              Warehouse
            </Heading>
            <Heading className="mt-1 text-sm">
              List of warehouses for your storage solutions
            </Heading>
          </div>
          <Button
            onClick={() => {
              setCreateModalOpen(true);
            }}
            isExpressive
            size="sm"
            renderIcon={Add}
          >
            Create a Warehouse
          </Button>
        </div>
      </div>
    );
  }
}

export default Comp;
