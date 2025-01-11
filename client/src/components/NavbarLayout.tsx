import React, { useEffect, useState } from "react";
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
import { Notification, User, Settings } from "@carbon/icons-react";
import { supabase } from "../supabaseClient";

interface HeaderRenderProps {
  isSideNavExpanded: boolean;
  onClickSideNavExpand: () => void;
}

const NavBarLayout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentPath = window.location.pathname;

  useEffect(() => {
    // Check initial auth status
    const checkAuthStatus = async () => {
      const user = await supabase.auth.getUser();
      setIsLoggedIn(!!user.data.user);
    };

    // Listen to login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setIsLoggedIn(true);
      } else if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
      }
    });

    checkAuthStatus();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }: HeaderRenderProps) => (
        <Header aria-label="Open VTT">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="/" prefix="Open">
            VTT
          </HeaderName>
          <HeaderNavigation aria-label="Main Menu">
            {isLoggedIn ? (
              <>
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
              </>
            ) : (
              <>
                {/* Logged-out menu can be added here */}
              </>
            )}
          </HeaderNavigation>
          <HeaderGlobalBar>
            {isLoggedIn ? (
              <>
                <HeaderGlobalAction
                  aria-label="Notifications"
                  onClick={() => console.log("Notification clicked")}
                >
                  <Notification size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Settings"
                  href="/settings"
                >
                  <Settings size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="User"
                  href="/user"
                >
                  <User size={20} />
                </HeaderGlobalAction>
              </>
            ) : (
              <HeaderGlobalAction
                aria-label="Login"
                href="/login"
              >
                <User size={20} />
              </HeaderGlobalAction>
            )}
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
};

export default NavBarLayout;