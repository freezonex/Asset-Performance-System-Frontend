import React from 'react';
import styles from "./index.module.scss";
import { ThemeProvider } from '@/utils/ThemeContext';
export default class BasicLayout extends React.Component {
  componentDidMount = async () => {};
  render() {
    return (
        <div>
          <ThemeProvider>{this.props.children}</ThemeProvider>
        </div>
    );
  }
}