import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import { BiUserCircle } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { RiAdminFill } from 'react-icons/ri';
import { MdOutlineLogin } from 'react-icons/md';
import Search from '../../Search/Search';
import { logout } from '../../../app/slices/authSlice';
import { images } from '../../../constants/constants';
import { ruleUser } from '../../../utils/common';

function Navbar(props) {
  return (
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Trang chủ
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          to="/gioi-thieu"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Giới thiệu
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          to="/thong-tin"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Thông tin bác sĩ
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          to="/tin-tuc"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Tin tức
        </NavLink>
      </li>

      <li className={styles.navItem}>
        <Link to="/">Liên hệ</Link>
      </li>
    </ul>
  );
}

function Header(props) {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <div className={styles.header}>
        <Row
          style={{
            alignItems: 'center',
            height: '100%',
            boxShadow: 'rgba(17, 17, 26, 0.1) 0px 3px 0px',
          }}
        >
          <Col xs={3}>
            <div className={styles.logo} onClick={() => navigate('/')}>
              <img src={images.LOGO} alt="" wiidth="220px" height="100px" />
            </div>
          </Col>
          <Col xs={6}>
            <Navbar />
          </Col>
          <Col xs={3}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                className={`${styles.boxLogin} mx-3`}
                style={{ position: 'relative' }}
              >
                {user && (
                  <div className={styles.login}>
                    <BiUserCircle />
                    <div className={styles.userName}>{user.hoTen}</div>
                    <div className={styles.dropdown}>
                      <ul>
                        <li
                          onClick={() => navigate('/ho-so-ca-nhan')}
                          className={styles.itemDown}
                        >
                          <FaUserCircle />
                          Hồ sơ cá nhân
                        </li>
                        {user.maQuyen === ruleUser.ADMIN && (
                          <>
                            <li
                              onClick={() => navigate('/admin/')}
                              className={styles.itemDown}
                            >
                              <RiAdminFill />
                              Trang quản lý
                            </li>
                          </>
                        )}
                        <li
                          onClick={() => dispatch(logout())}
                          className={styles.itemDown}
                        >
                          <AiOutlineLogout />
                          Đăng xuất
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {!user && (
                  <div
                    onClick={() => navigate('/auth/login')}
                    className={styles.login}
                  >
                    <MdOutlineLogin />
                    <p>Đăng nhập</p>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <img
                  src="https://medpro.vn/static/media/chat.edd95b6c.svg"
                  alt=""
                />
                <div
                  style={{
                    marginLeft: '1rem',
                  }}
                >
                  <p className="pb-2 text-muted lead">Bạn cần trợ giúp?</p>
                  <p
                    style={{
                      color: 'red',
                      fontSize: '1.6rem',
                      fontWeight: '500',
                    }}
                  >
                    0920334544
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Header;
