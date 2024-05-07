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
     <div>
      Dashboard
     </div>
    );
  }
}

export default Comp;
