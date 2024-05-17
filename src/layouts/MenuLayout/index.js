'use client';
import React, { useContext, useState } from 'react';
import {
  Header,
  HeaderName,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  Toggle,
  Theme,
  Content,
} from '@carbon/react';
import {
  User,
  Information,
  Settings,
  Dashboard,
  AssetView,
  InventoryManagement,
  OrderDetails,
  EventSchedule,
  LicenseMaintenance,
} from '@carbon/icons-react';
import styles from './index.module.scss';
import { usePathname } from 'next/navigation';
import { ThemeContext } from '@/utils/ThemeContext';
import { useRouter } from 'next/navigation';

const HeaderWSideNav = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useContext(ThemeContext);
  const isCurrentPath = (path) => {
    return path === pathname;
  };
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  return (
    <div className={styles.layoutCont}>
      <Theme theme={theme.headerTheme}>
        <Header aria-label="SUPCON WMS">
          <SkipToContent />

          <HeaderMenuButton
            className="cursor-pointer"
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={() => {
              setIsSideNavExpanded(!isSideNavExpanded);
            }}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName
            className="cursor-pointer"
            prefix="SUPCON"
            onClick={() => {
              router.push(`/dashboard`);
            }}
          >
            APS
          </HeaderName>
          <HeaderGlobalBar className="flex items-center">
            <Toggle
              labelA="Light"
              labelB="Dark"
              size="sm"
              id="theme-toggle"
              toggled={theme.headerTheme === 'g100'}
              onToggle={(e) => {
                if (e) {
                  setTheme({
                    headerTheme: 'g100',
                    contentTheme: 'g10',
                    sideNavTheme: 'g90',
                  });
                } else {
                  setTheme({
                    headerTheme: 'white',
                    contentTheme: 'white',
                    sideNavTheme: 'white',
                  });
                }
              }}
            />
            <HeaderGlobalAction aria-label="Settings">
              <Settings size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="User">
              <User size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Info" tooltipAlignment="end">
              <Information size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      </Theme>
      {/* 侧边栏 */}
      <Theme theme={theme.sideNavTheme}>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          addFocusListeners={false}
          className="w-10"
        >
          <SideNavItems isSideNavExpanded={isSideNavExpanded}>
            <SideNavLink
              className="cursor-pointer"
              isSideNavExpanded={isSideNavExpanded}
              renderIcon={Dashboard}
              onClick={() => {
                console.log(isSideNavExpanded, 'isSideNavExpanded');
                router.push(`/dashboard`);
              }}
              isActive={isCurrentPath('/dashboard')}
            >
              Dashboard
            </SideNavLink>
            <SideNavLink
              className="cursor-pointer"
              isSideNavExpanded={isSideNavExpanded}
              renderIcon={AssetView}
              onClick={() => {
                router.push(`/assets`);
              }}
              isActive={isCurrentPath('/assets')}
            >
              Assets
            </SideNavLink>
            <SideNavLink
              className="cursor-pointer"
              isSideNavExpanded={isSideNavExpanded}
              renderIcon={InventoryManagement}
              onClick={() => {
                router.push(`/inventory`);
              }}
              isActive={isCurrentPath('/inventory')}
            >
              Inventory
            </SideNavLink>
            <SideNavLink
              className="cursor-pointer"
              isSideNavExpanded={isSideNavExpanded}
              renderIcon={OrderDetails}
              onClick={() => {
                router.push(`/workOrder`);
              }}
              isActive={isCurrentPath('/workOrder')}
            >
              Work Order
            </SideNavLink>
            <SideNavLink
              className="cursor-pointer"
              isSideNavExpanded={isSideNavExpanded}
              renderIcon={EventSchedule}
              onClick={() => {
                router.push(`/schedule`);
              }}
              isActive={isCurrentPath('/schedule')}
            >
              Schedule
            </SideNavLink>
            <SideNavLink
              className="cursor-pointer"
              isSideNavExpanded={isSideNavExpanded}
              renderIcon={LicenseMaintenance}
              onClick={() => {
                router.push(`/maintenance`);
              }}
              isActive={isCurrentPath('/maintenance')}
            >
              Maintenance
            </SideNavLink>
          </SideNavItems>
        </SideNav>
      </Theme>

      <Theme theme={theme.contentTheme} style={{ minHeight: '100vh' }}>
        <Content style={{ height: '100%' }}>
          <div className={styles.body}>
            <div className={styles.bodyCont}>{props.children}</div>
          </div>
        </Content>
      </Theme>
    </div>
  );
};
export default HeaderWSideNav;
