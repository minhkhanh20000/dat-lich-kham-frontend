import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { baiDangApi } from '../../api/baiDang';
import { Loading } from '../../components/Loading';
import { formatDate, toastify } from '../../utils/common';
import styles from './News.module.css';

const CardNew = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <img
        src={card.anh}
        alt=""
        className={styles.imageCard}
        onClick={() => navigate(`${card.mabaidang}`)}
      />
      <h2 className={styles.titleNew}>{card.tieude}</h2>
      <div className={styles.boxDate}>
        <span className={styles.date}>
          Ngày đăng: {formatDate(card.ngaydang)}
        </span>
      </div>
      <p className={styles.description}>{card.mota}</p>
    </div>
  );
};

const PageNews = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await baiDangApi.getAllBaiDang();
      setPosts(res.posts);
      setLoading(false);
    } catch (error) {
      toastify('error', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <div className={styles.head}>
        <h2>TIN TỨC VÀ SỰ KIỆN</h2>
      </div>

      <div>
        <Container>
          <Row>
            {posts.map((card) => (
              <CardNew card={card} key={card.mabaidang} />
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PageNews;
