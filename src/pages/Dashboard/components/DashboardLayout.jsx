import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router';
import DashboardSideBar from './DashboardSideBar';
import AdminNavbar from './AdminNavbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/light-bootstrap-dashboard-react.css';
import '../css/animate.min.css';
import '../css/demo.css';
import routes from '../routes';

export default function DashboardLayout() {
  const [color, setColor] = React.useState('black');
  return (
    <>
      <DashboardSideBar color={color} routes={routes} />
      <div
        style={{
          width: 'calc(100% - 26rem)',
          marginLeft: '26rem',
          marginTop: '7rem',
        }}
      >
        <AdminNavbar />
        <Outlet />
      </div>
    </>
  );
}
