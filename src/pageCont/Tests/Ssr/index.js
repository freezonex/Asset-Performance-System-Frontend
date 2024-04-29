/**
 *  getServerSideProps 
 */
import React, { Component } from 'react'
import styles from './index.module.scss';
import { withRouter } from 'next/router'
import Head from 'next/head'

@withRouter
class Comp extends Component {
    componentDidMount = () => {
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <Head>
                    <title>服务端渲染</title>
                </Head>
                <div> getServerSideProps </div>

            </div>
        )
    }
}
export default Comp
