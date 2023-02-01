import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { removeUser } from '../../../utils/local.js';
import { logout } from '../../../app/slices/authSlice.js';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle('nav-open');
    var node = document.createElement('div');
    node.id = 'bodyClick';
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle('nav-open');
    };
    document.body.appendChild(node);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="position-fixed top-0 "
      style={{ zIndex: 10, width: '100%', height: '60px' }}
    >
      <Container fluid>
        <div
          className="d-flex justify-content-end"
          style={{
            width: '80%',
          }}
        >
          <button className="btn" onClick={() => dispatch(logout())}>
            Đăng xuất
          </button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
