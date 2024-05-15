import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import Head from 'next/head';
import CreateModal from '../Modal/CreateModal'
import { Add, } from '@carbon/icons-react';
import { Breadcrumb, BreadcrumbItem, Heading ,Button} from '@carbon/react';

class Comp extends Component {
  componentDidMount = () => {
    this.props.init?.(this);
  };
  state = {
    createModalIsopen: false,
  };

  changeState = (obj)=>{
    this.setState(obj)
  }

  render() {
    const { createModalIsopen } = this.state;
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
            <Heading className="mt-2 text-[28px] font-normal">
              Inventory
            </Heading>
            <Heading
              className={classNames('mt-1 text-sm', {
                [styles.textColor]: true,
              })}
            >
              Here we can do predictions for you.
            </Heading>
          </div>
          <Button
            // onClick={() => {
            //   this.setState({
            //     createModalIsopen: true,
            //   });
            // }}
            isExpressive
            size="md"
            renderIcon={Add}
          >
            Create an Inventory
          </Button>
        </div>

        {/* Create a Asset modal */}
        {
          <CreateModal
            createModalIsopen={createModalIsopen}
            changeState={this.changeState}
          />
        }
      </div>
    );
  }
}

export default Comp;
