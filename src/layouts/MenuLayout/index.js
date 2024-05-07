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
  EventSchedule
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
      <Theme theme={theme.contentTheme}>
        <Content>
          <div className={styles.body}>
            <div className={styles.bodyCont}>{props.children}</div>
          </div>
        </Content>
      </Theme>

      <div>
        <Theme theme={theme.headerTheme}>
          <Header aria-label="SUPCON WMS">
            <SkipToContent />

            <HeaderMenuButton
              aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
              onClick={() => {
                setIsSideNavExpanded(!isSideNavExpanded);
              }}
              isActive={isSideNavExpanded}
              aria-expanded={isSideNavExpanded}
            />
            <HeaderName
              prefix="SUPCON"
              onClick={() => {
                router.push(`/dashboard`);
              }}
            >
              WMS
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
              <HeaderGlobalAction aria-label="Info" tooltipAlignment="end">
                
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            {/* 侧边栏 */}
            <Theme theme={theme.sideNavTheme}>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
              >
                <SideNavItems isSideNavExpanded={isSideNavExpanded}>
                  <SideNavLink
                    isSideNavExpanded={isSideNavExpanded}
                    renderIcon={Dashboard}
                    onClick={() => {
                      router.push(`/dashboard`);
                    }}
                    isActive={isCurrentPath('/dashboard')}
                  >
                    Dashboard
                  </SideNavLink>
                  <SideNavLink
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
                    isSideNavExpanded={isSideNavExpanded}
                    renderIcon={EventSchedule}
                    onClick={() => {
                      router.push(`/schedule`);
                    }}
                    isActive={isCurrentPath('/schedule')}
                  >
                    Schedule
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
            </Theme>
          </Header>
        </Theme>
      </div>
    </div>
  );
};
export default HeaderWSideNav;
