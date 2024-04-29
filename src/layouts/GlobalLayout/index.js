import React from 'react';
import styles from "./index.module.scss";

export default class BasicLayout extends React.Component {
  componentDidMount = async () => {};
  render() {
    return (
        <div>{this.props.children}</div>
    );
  }
}