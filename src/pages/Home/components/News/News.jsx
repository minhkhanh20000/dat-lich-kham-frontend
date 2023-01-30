import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './News.module.css';
import { baiDangApi } from '../../../../api/baiDang';
import { formatDate, toastify } from '../../../../utils/common';
import { Loading } from '../../../../components/Loading';
import { useNavigate } from 'react-router-dom';

function NewsCard({ card }) {
  const navigate = useNavigate();

  return (
    <div>
      <img
        src={card.anh}
        alt=""
        className={styles.imageCard}
        onClick={() => navigate(`/tin-tuc/${card.mabaidang}`)}
      />
      <h2
        className={styles.title}
        onClick={() => navigate(`/tin-tuc/${card.mabaidang}`)}
      >
        {card.tieude}
      </h2>
      <div className={styles.boxDate}>
        <span className={styles.date}>{formatDate(card.ngaydang)}</span>
      </div>
    </div>
  );
}
function News(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const res = await baiDangApi.getAllBaiDang();
      setData(res.posts);
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
    <div style={{ marginBottom: '13rem' }}>
      <h2 className={styles.headTitle}>TIN TỨC & SỰ KIỆN</h2>
      <Container>
        <Row>
          <Col xs={5}>
            <div>
              <img
                src={data[0].anh}
                alt=""
                className={styles.image}
                onClick={() => navigate(`/tin-tuc/${data[0].mabaidang}`)}
              />
              <h2
                className={styles.title}
                onClick={() => navigate(`/tin-tuc/${data[0].mabaidang}`)}
              >
                {data[0].tieude}
              </h2>
              <div className={styles.boxDate}>
                <span className={styles.date}>
                  {formatDate(data[0].ngaydang)}
                </span>
              </div>
              <Link to="/">
                <p className={styles.description}>{data[0].mota}</p>
              </Link>
            </div>
          </Col>

          <Col xs={7}>
            <Row>
              {data.slice(1, 5).map((card) => (
                <Col xs={6} className="px-md-4 pb-md-4" key={card.mabaidang}>
                  <NewsCard card={card} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <div className={styles.boxButton}>
        <button
          className={styles.buttonSee}
          onClick={() => navigate('/tin-tuc')}
        >
          Xem thêm
        </button>
      </div>
    </div>
  );
}

export default News;
