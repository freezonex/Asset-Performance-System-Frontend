'use client';
import React, { useContext, useState } from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SwitcherDivider,
  Toggle,
  Theme,
} from '@carbon/react';
import {
  IbmDb2Warehouse,
  Product,
  PortInput,
  PortOutput,
  User,
  Information,
  Settings,
  Analytics,
  WatsonHealth3DCursor,
  DocumentTasks,
  Dashboard,
  AssetView,
  InventoryManagement,
} from '@carbon/icons-react';
import styles from './index.module.scss';
import { usePathname } from 'next/navigation';
import { ThemeContext } from '@/utils/ThemeContext';
import { useRouter } from 'next/navigation';

const HeaderWSideNav = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useContext(ThemeContext);
  const isCurrentPath = (path) => {
    return process.env.PATH_PREFIX + path === pathname;
  };
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  return (
    <div className={styles.layoutCont}>
      <div className={styles.body}>
        <div className={styles.bodyCont}>{children}</div>
      </div>
      <div>
        <Theme theme={theme.sideNavTheme}>
          <Header aria-label="SUPCON WMS">
            <SkipToContent />
            <HeaderMenuButton
              aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
              onClick={setIsSideNavExpanded}
              isActive={isSideNavExpanded}
              aria-expanded={isSideNavExpanded}
            />
            <HeaderName
              prefix="SUPCON"
              onClick={() => {
                router.push(`/tab/tab2`);
              }}
              className="cursor-pointer"
            >
              APS
            </HeaderName>
            {/* 顶部菜单 */}
            {/* <HeaderNavigation aria-label="IBM [Platform]">
              <HeaderMenuItem href="#">Home</HeaderMenuItem>
              <HeaderMenu aria-label="Menu" menuLinkName="Menu">
                <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
                <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
              </HeaderMenu>
            </HeaderNavigation> */}

            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              addFocusListeners={false}
              className="w-10"
              onOverlayClick={() => {}}
            >
              <SideNavItems isSideNavExpanded={isSideNavExpanded}>
                <SideNavLink
                  isSideNavExpanded={isSideNavExpanded}
                  renderIcon={Dashboard}
                  onClick={() => {
                    router.push(`/tab/tab1`);
                  }}
                  className="cursor-pointer"
                  isActive={isCurrentPath('/tab/tab1')}
                >
                  tab1
                </SideNavLink>
                <SideNavLink
                  isSideNavExpanded={isSideNavExpanded}
                  renderIcon={AssetView}
                  onClick={() => {
                    router.push(`/tab/tab2`);
                  }}
                  className="cursor-pointer"
                  isActive={isCurrentPath('/tab/tab2')}
                >
                  tab2
                </SideNavLink>
                <SideNavLink
                  isSideNavExpanded={isSideNavExpanded}
                  renderIcon={InventoryManagement}
                  onClick={() => {
                    router.push(`/tab/tab3`);
                  }}
                  className="cursor-pointer"
                  isActive={isCurrentPath('/tab/tab3')}
                >
                  tab3
                </SideNavLink>
              </SideNavItems>
            </SideNav>
            <HeaderGlobalBar className="flex items-center">
              <Toggle
                labelA="Light"
                labelB="Dark"
                className="mr-[2rem]"
                size="sm"
                id="theme-toggle"
                toggled={theme.headerTheme === 'g100'}
                onToggle={(e) => {
                  console.log(e);
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
              <HeaderGlobalAction
                aria-label="Info"
                tooltipAlignment="end"
              ></HeaderGlobalAction>
            </HeaderGlobalBar>
          </Header>
        </Theme>
      </div>
    </div>
  );
};
export default HeaderWSideNav;