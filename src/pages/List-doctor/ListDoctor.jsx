import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { userApi } from '../../api/userApi';
import { Loading } from '../../components/Loading';
import { ruleUser } from '../../utils/common';
import styles from './ListDoctor.module.css';

const CartDoctor = ({ user }) => {
  return (
    <Col xs={3}>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <img src={user.avatar} alt="" width={200} height={200} />
        </div>
        <p className="text-center fw-bold">{user.hoTen}</p>
        <div className={styles.cardInfo}>
          <p className="text-center">{user?.tenKhoa}</p>
        </div>
        <p className="text-center pb-4">
          Số năm kinh nghiệm: {user.kinhNghiem}
        </p>
        <div className="px-4">
          <p
            style={{
              minHeight: '45px',
            }}
          >
            Trường tốt nghiệp: {user.truongTotNghiep}
          </p>
          <p
            style={{
              minHeight: '45px',
            }}
          >
            Chuyên ngành: {user.chuyenNganh}
          </p>
        </div>
      </div>
    </Col>
  );
};

const ListDoctor = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await userApi.getAllUser({
        role: ruleUser.BACSI,
      });
      setUsers(res.users);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
      }}
    >
      <div className={styles.head}>
        <h2>Thông tin bác sĩ</h2>
      </div>

      <div>
        <Container>
          <Row>
            {users?.map((user, index) => (
              <CartDoctor user={user} key={index} />
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ListDoctor;
