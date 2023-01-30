import styles from './Auth.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router';
import {images} from '../../constants/constants';
const Auth = () => {
  return (
    <div className={styles.root}>
      <Row>
        <Col xs={6}>
          <div className={styles.boxForm}>
            <Outlet />
          </div>
        </Col>
        <Col xs={6}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${images.BKLOGIN})`,
            }}
          ></div>
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
