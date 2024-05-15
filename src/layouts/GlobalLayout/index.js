import React from 'react';
import { ThemeProvider } from '@/utils/ThemeContext';
import { StoreProvider } from "@/utils/redux/StoreProvider";
export default class BasicLayout extends React.Component {
  componentDidMount = async () => {

  };
  render() {
    return (
        <StoreProvider>
          <ThemeProvider>{this.props.children}</ThemeProvider>
        </StoreProvider>
    );
  }
}