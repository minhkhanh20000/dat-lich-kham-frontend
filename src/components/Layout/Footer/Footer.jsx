import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imagesFT from '../../../assets/images/footer.JPG';
import { images } from '../../../constants/constants';
import styles from './Footer.module.css';

function Footer(props) {
  return (
    <footer id={styles.footer}>
      <Container>
        <Row>
          <Col xs={3}>
            <div>
              <img src={images.LOGO} alt="" className={styles.image} />
            </div>
          </Col>
          <Col xs={5}>
            <div>
              <ul className={styles.listFooter}>
                <li>
                  <h4 style={{ margin: 0 }}>
                    Phòng khám Minh Khánh - ĐẶT LỊCH KHÁM BỆNH
                  </h4>
                </li>
                <li>
                  Địa chỉ: 97 Trần Quang Diệu, phường Thanh Bình, quận Hải Châu,
                  Tp Đà Nẵng.
                </li>
                <li>
                  <Link>Website: https://pkh.vn</Link>
                </li>
                <li>Email: contact@pkh.vn</li>
                <li>Điện thoại: (028) 710 78098</li>
              </ul>
            </div>
          </Col>
          <Col xs={2}>
            <div>
              <ul className={styles.listFooter}>
                <li>Liên hệ</li>
                <li>Điều khoản dịch vụ</li>
                <li>Chính sách bảo mật</li>
                <li>Quy định sử dụng</li>
              </ul>
            </div>
          </Col>
          <Col xs={2}>
            <img src={imagesFT} alt="" width="100%" />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
