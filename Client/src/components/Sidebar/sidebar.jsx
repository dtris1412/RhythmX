import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import "./sidebar.css";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", icon: "fas fa-home", label: "Trang chủ" },
    { path: "/search", icon: "fas fa-search", label: "Tìm kiếm" },
    { path: "/favorites", icon: "fas fa-heart", label: "Yêu thích" },
    { path: "/artists", icon: "fas fa-user-music", label: "Nghệ sĩ" },
  ];

  const playlists = ["Playlist #1", "Chill Vibes", "Top Hits"];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">
          <i className="fas fa-music"></i>
          RhythmX
        </h1>
      </div>

      <div className="nav-menu">
        <h3>Menu</h3>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-library">
        <h3>Thư viện</h3>
        <ul className="playlist-list">
          {playlists.map((playlist, index) => (
            <li key={index} className="playlist-item">
              <i className="fas fa-music"></i>
              <span>{playlist}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="user-section">
        <div className="user-profile">
          <div className="avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="user-info">
            <span className="username">{user?.name || "Người dùng"}</span>
            <button className="logout-btn" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
