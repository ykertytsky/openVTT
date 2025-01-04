import React from "react";
import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "@carbon/react";
import { 
  Notification,
  User,
  Settings
 } from "@carbon/icons-react";

const NavBarLayout: React.FC = () => {
  // Get the current path
  const currentPath = window.location.pathname;

  return (
    <HeaderContainer
      render={({
        isSideNavExpanded,
        onClickSideNavExpand,
      }: {
        isSideNavExpanded: boolean;
        onClickSideNavExpand: () => void;
      }) => (
        <Header aria-label="Open VTT">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded} // Accessibility
          />
          <HeaderName href="/" prefix="Open">
            VTT
          </HeaderName>
          <HeaderNavigation aria-label="Main Menu">
            <HeaderMenuItem
              href="/active_session"
              isActive={currentPath === "/active_session"}
            >
              Ruined Temple of Azariel
            </HeaderMenuItem>
            <HeaderMenuItem
              href="/campaigns"
              isActive={currentPath === "/campaigns"}
            >
              Campaigns
            </HeaderMenuItem>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={() => console.log("Notification clicked")}
            >
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Settings"
              onClick={() => console.log("Settings clicked")}
              href="/settings"
            >
              <Settings size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="User"
              onClick={() => console.log("User clicked")}
              href="/user"
            >
              <User size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
};

export default NavBarLayout;