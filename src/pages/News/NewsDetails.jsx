import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import HTMLString from 'react-html-string';
import { Loading } from '../../components/Loading';
import { formatDate, toastify } from '../../utils/common';
import { baiDangApi } from '../../api/baiDang';

const NewsDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await baiDangApi.getChiTietBaiDang(id);
      setDetails(res.post);
      setLoading(false);
    } catch (error) {
      toastify('error', error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  if (loading) return <Loading />;
  return (
    <Container>
      <Row>
        <Col xs={8}>
          <div>
            <h3 style={{ lineHeight: '4rem' }}>{details.tieude}</h3>
            <p>
              <i>
                Ngày đăng: {formatDate(details.ngaydang)} bởi {details.hoten}
              </i>
            </p>
            <div
              style={{
                padding: '1rem',
                border: '1px solid #bfe0ff',
                borderLeft: '6px solid #1da1f2',
                backgroundColor: '#e8f4ff',
                margin: '1rem 0',
              }}
            >
              <p>{details.mota}</p>
            </div>
            <div>
              <HTMLString html={details.noidung} />
            </div>
          </div>
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
};

export default NewsDetails;
