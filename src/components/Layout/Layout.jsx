import React from 'react';
import Header from './Header/Header';
import { Outlet } from 'react-router';
import Footer from './Footer/Footer';

function Layout(props) {
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
