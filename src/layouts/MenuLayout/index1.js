import React from 'react';
import styles from './index.module.scss';
import { withRouter } from 'next/router';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

@withRouter
class Cpmp extends React.Component {
  state = {
    value: '',
    tabList: [
      {
        path: '/tab/tab1',
        label: '历史',
        icon: <RestoreIcon />,
      },
      {
        path: '/tab/tab2',
        label: '收藏',
        icon: <FavoriteIcon />,
      },
      {
        path: '/tab/tab3',
        label: '地点',
        icon: <LocationOnIcon />,
      },
    ],
  };
  componentDidMount = async () => {
    this.setNav();
  };
  setNav = () => {
    const { tabList } = this.state;
    const { router } = this.props;
    var path = router.pathname.toLowerCase();
    var value = '';
    tabList.forEach((item) => {
      if (path.indexOf(item.path) != -1) {
        value = item.path;
      }
    });
    this.setState({ value: value });
  };
  render() {
    const { value, tabList } = this.state;
    return (
      <div className={styles.layoutCont}>
        <div className={styles.body}>
          <div className={styles.bodyCont}>{this.props.children}</div>
        </div>
        <div>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              this.setState({ value: newValue });
              console.log(newValue);
              this.props.router.push(newValue);
            }}
          >
            {tabList.map((item, i) => {
              return (
                <BottomNavigationAction
                  key={i}
                  label={item.label}
                  icon={item.icon}
                  value={item.path}
                />
              );
            })}
          </BottomNavigation>
        </div>
      </div>
    );
  }
}
export default Cpmp;
