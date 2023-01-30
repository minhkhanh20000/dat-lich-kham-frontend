import React, { useEffect, useState } from 'react';
// react-bootstrap components
import { Col, Container, Row } from 'react-bootstrap';
import { datLichApi } from '../../../api/datLich';
import { userApi } from '../../../api/userApi';
import iconuser from '../assets/images/iconuser.png';
import stethoscope from '../assets/images/stethoscope.png';

function Dashboard() {
  const [totalService, setTotalService] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const fetchTotalService = async () => {
    try {
      const res = await datLichApi.countDatLich();
      const total = await userApi.getAllUser();
      setTotalUser(total.totalData);
      setTotalService(res.total);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTotalService();
  }, []);
  return (
    <div style={{ marginTop: '9rem' }}>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <div
              style={{
                border: '1px solid #c1c1c1',
                borderRadius: '1rem',
                padding: '2rem',
                minHeight: '145px',
              }}
            >
              <Row>
                <img src={iconuser} alt="icons" width="200px" height="150px" />
                <h6
                  className="text-center my-2"
                  style={{
                    lineHeight: '2rem',
                    height: '42px',
                  }}
                >
                  Tổng số người dùng ứng dụng hệ thống
                </h6>
                <h2
                  className="text-center"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {totalUser}
                </h2>
              </Row>
            </div>
          </Col>
          <Col lg="3" sm="6">
            <div
              style={{
                border: '1px solid #c1c1c1',
                borderRadius: '1rem',
                padding: '2rem',
                minHeight: '145px',
              }}
            >
              <Row>
                <img
                  src={stethoscope}
                  alt="icons"
                  width="200px"
                  height="150px"
                />

                <h6
                  className="text-center my-2"
                  style={{
                    lineHeight: '2rem',
                    height: '42px',
                  }}
                >
                  Tổng số lượt đăng ký khám
                </h6>
                <h2
                  className="text-center"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {totalService}
                </h2>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
