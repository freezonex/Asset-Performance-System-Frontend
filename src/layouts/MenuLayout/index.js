'use client';
import React, { useContext } from 'react';
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
  Product,
} from '@carbon/icons-react';
import styles from './index.module.scss';
import { usePathname } from 'next/navigation';
import { ThemeContext } from '@/utils/ThemeContext';
import { useRouter } from 'next/navigation';

const HeaderWSideNav = (
  props,
  { isExpanded = true, toggleSideNavExpanded },
) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useContext(ThemeContext);
  const isCurrentPath = (path) => {
    return process.env.PATH_PREFIX + path === pathname;
  };
  console.log(isExpanded);

  return (
    <div className={styles.layoutCont}>
      <div className={styles.body}>
        <div className={styles.bodyCont}>{props.children}</div>
      </div>
      <div>
        <Theme theme={theme.sideNavTheme}>
          <Header aria-label="SUPCON WMS">
            <SkipToContent />
            <HeaderName
              prefix="SUPCON"
              onClick={() => {
                router.push(`/tab/tab2`);
              }}
              className="cursor-pointer"
            >
              WMS
            </HeaderName>
            <HeaderNavigation aria-label="IBM [Platform]">
              <HeaderMenuItem href="#">Home</HeaderMenuItem>
              <HeaderMenu aria-label="Menu" menuLinkName="Menu">
                <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
                <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
              </HeaderMenu>
            </HeaderNavigation>

            <SideNav
              aria-label="Side navigation"
              expanded={isExpanded}
              addFocusListeners={false}
              className="w-10"
              onOverlayClick={() => {}}
            >
              <SideNavItems isSideNavExpanded={isExpanded}>
                <SideNavLink
                  isSideNavExpanded={isExpanded}
                  renderIcon={Product}
                  onClick={() => {
                    router.push(`/tab/tab1`);
                  }}
                  className="cursor-pointer"
                  isActive={isCurrentPath('/tab/tab1')}
                >
                  tab1
                </SideNavLink>
                <SideNavLink
                  isSideNavExpanded={isExpanded}
                  renderIcon={Product}
                  onClick={() => {
                    router.push(`/tab/tab2`);
                  }}
                  className="cursor-pointer"
                  isActive={isCurrentPath('/tab/tab2')}
                >
                  tab2
                </SideNavLink>
                <SideNavLink
                  isSideNavExpanded={isExpanded}
                  renderIcon={Product}
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
          </Header>
        </Theme>
      </div>
    </div>
  );
};
export default HeaderWSideNav;
