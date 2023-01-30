import React from 'react';
import styles from './Intro.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import IntroCard from './IntroCard';
import { images } from '../../../../constants/constants';
function Intro(props) {
  return (
    <div style={{ marginBottom: '15rem' }}>
      <div
        className={styles.box}
        style={{ backgroundImage: `url(${images.INTRO})` }}
      >
        <Container>
          <Row>
            <Col xs={4}>
              <div className={styles.boxLeft}>
                <p>GIỚI THIỆU</p>
                <h2>Phòng khám Minh Khánh</h2>
                <p>Đặt lịch khám bệnh</p>
              </div>
            </Col>

            <Col xs={8}>
              <div className={styles.boxRight}>
                <strong>Phòng khám Minh Khánh </strong>
                là giải pháp đặt lịch khám bệnh, chăm sóc sức khỏe trực tuyến
                cho cả gia đình. Người dùng chủ động trong việc khám chữa bệnh,
                được lựa chọn dịch vụ, chuyên khoa, bác sĩ tại phòng khám Đa
                khoa Hải Châu - Đà Nẵng
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col>
            <IntroCard
              title="Đặt khám nhanh chóng"
              image={images.NEW1}
              description="Bệnh nhân chủ động chọn thông tin đặt khám (ngày khám và giờ khám)"
            />
          </Col>
          <Col>
            <IntroCard
              title="Xem lịch khám"
              image={images.NEW2}
              description="Người dùng chủ động xem được lịch khám"
            />
          </Col>
          <Col>
            <IntroCard
              title="Nhận phiếu trực tuyến"
              image={images.NEW3}
              description="Bệnh nhân sẽ nhận phiếu khám trực tuyến ngay trên phần mềm"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Intro;
