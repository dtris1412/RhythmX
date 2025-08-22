import React from "react";
import Sidebar from "../Sidebar/sidebar";
import RightSidebar from "../RightSidebar/rightsidebar";
import MusicPlayer from "../MusicPlayer/musicplayer";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">{children}</main>
      <RightSidebar />
      <MusicPlayer />
    </div>
  );
};

export default Layout;
