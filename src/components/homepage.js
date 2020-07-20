import React, { useState } from "react";
import "../App.css";
import Navbar from "./navbar";
import Content from "./content";
import "./navbar.css";
import SideDrawer from "./sideMenu";
import Backdrop from "./backdrop";

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let sideDrawer;
  let backdrop;

  if (isMenuOpen) {
    sideDrawer = <SideDrawer />;
    backdrop = <Backdrop click={() => setIsMenuOpen(!isMenuOpen)} />;
  }

  return (
    <div className="App" style={{ height: "100%" }}>
      <Navbar drawerClickHandler={() => setIsMenuOpen(!isMenuOpen)} />
      {sideDrawer}
      {backdrop}
      <Content />
    </div>
  );
}

export default HomePage;
