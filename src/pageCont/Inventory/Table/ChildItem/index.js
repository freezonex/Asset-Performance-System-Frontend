import React, { Component } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

class Comp extends Component {
  render() {

    const { showChild } = this.props

    var list = [
      {
        date: '2024.05.06',
        quantity: '60',
        state: 1,
      },
      {
        date: '2024.05.09',
        quantity: '30',
        state: 2,
      },
      {
        date: '2024.05.11',
        quantity: '20',
      },
      {
        date: '2024.05.13',
        quantity: '10',
      },
    ]

    var columns = [
      {
        dataIndex: 'date',
        title: 'Expected  Date',
        width: '17%',
      },
      {
        dataIndex: 'quantity',
        title: 'Expected  Quantity',
        width: '23%',
        style:{
          paddingLeft:'40px'
        },
      },
    ];

    var height = 41.2 * list.length

    return (
      <div
        className={classNames([styles.showComp, styles.auto])}
        style={{
          height: showChild ? `${height}px` : 0,
          marginBottom: showChild ? '10px' : 0,
        }}
      >
        <div style={{ borderRight: '1px solid #ccc' }}></div>
        {
          columns.map((header, i) => {

            var nextSty = header.style||{}

            return (
              <div
                className={styles.tableCell}
                style={{
                  width: header.width,
                  minWidth: header.width,
                  maxWidth: header.width,
                }}
              >
                <div className={styles.header} style={nextSty}>{header.title}</div>
                {
                  list.map((ite, i) => {
                    return (
                      <div 
                        className={classNames([styles.item, {
                          [styles.s1]: ite.state == 1,
                          [styles.s2]: ite.state == 2,
                        }])}
                      style={nextSty}
                      >
                        {ite[header.dataIndex]}
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Comp;