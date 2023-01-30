import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Support.module.css';

function SupportCard({ image, title, href, name }) {
  return (
    <div className={styles.box}>
      <div className={styles.boxCard}>
        <img src={image} alt="" className={styles.image} />
        <p className={styles.title}>{title}</p>
        <a href={href} className={styles.detail}>
          {name}
        </a>
      </div>
    </div>
  );
}
function Support(props) {
  return (
    <div style={{ marginBottom: '7rem' }}>
      <h2 className={styles.headTitle}>CÁC HÌNH THỨC HỖ TRỢ</h2>

      <Container>
        <Row>
          <Col xs={4} className="px-md-4">
            <SupportCard
              image="https://medpro.vn/static/media/support.08dda31d.svg"
              title="Hỗ trợ đặt khám"
              href="tel:19002115"
              name="1900-2115"
            />
          </Col>
          <Col xs={4} className="px-md-4">
            <SupportCard
              image="https://medpro.vn/static/media/facebook.e2d57020.svg"
              title="Fanpage facebook"
              href="https://www.facebook.com/profile.php?id=100028820784061"
              name="Bấm vào đây"
            />
          </Col>
          <Col xs={4} className="px-md-4">
            <SupportCard
              image="https://medpro.vn/static/media/qrmed.f0bb2880.jpg"
              title="Hỗ trợ Zalo"
              href="https://www.facebook.com/profile.php?id=100028820784061"
              name="Bấm vào đây"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Support;
