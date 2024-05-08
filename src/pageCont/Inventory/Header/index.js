import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';
import {
  Breadcrumb,
  BreadcrumbItem,
  Heading,
} from '@carbon/react';


class Comp extends Component {
  componentDidMount = () => {
		this.props.init?.(this)
	}
  render() {
    return (
      <div>
       <Head>Inventory</Head>
        <Breadcrumb>
          <BreadcrumbItem
            onClick={() => {
              router.push(`/inventory`);
            }}
          >
            Inventory
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="bx--col-lg-16 flex justify-between items-center">
          <div>
            <Heading className="mt-2 text-[28px] font-normal">Inventory</Heading>
            <Heading
              className={classNames('mt-1 text-sm', {
                [styles.textColor]: true,
              })}
            >
              Here we can do predictions for you.
            </Heading>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Comp;
