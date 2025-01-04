import React from "react";
import NavBarLayout from "./components/NavbarLayout";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBarLayout />
      <main>{children}</main>
    </>
  );
};

export default Layout;