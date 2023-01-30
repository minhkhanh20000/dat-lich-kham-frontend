import React, { Component } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';

import { Nav } from 'react-bootstrap';

function DashboardSideBar({ color, routes }) {
  const navigate = useNavigate();
  const activeRoute = (routeName) => {
    return 'active';
  };
  return (
    <div
      className="sidebar position-fixed "
      data-color={color}
      style={{
        backgroundImage:
          'url("https://img.lovepik.com/photo/50079/1339.jpg_wh860.jpg")',
      }}
    >
      <div className="sidebar-background" />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <Link to="/" className="simple-text">
            Hệ thống quản lý lịch khám
          </Link>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? 'active active-pro'
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i>{prop.icon}</i>
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default DashboardSideBar;
