import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { datLichApi } from '../../../api/datLich';
import { Loading } from '../../../components/Loading';
import { CardTicker } from './ProfileContent';

export function ProfileHistory() {
  const [loading, setLoading] = useState(true);
  const { maND } = useSelector((state) => state.auth.currentUser);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await datLichApi.getDatLichUser(maND, {
        tinhTrangDky: 'hoanThanh',
      });
      setData(res);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <h5 className="text-center mb-5 fw-bold">Lịch sử khám bệnh</h5>
      {data.total > 0 ? (
        <>
          <Container>
            <Row>
              {data.data.map((item) => (
                <Col xs={4}>
                  <CardTicker
                    item={item}
                    key={`${item.thoiGianDky}${item.thoiGianBatDau} `}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      ) : (
        <>
          <h6 className="text-danger text-center mb-2">
            Hiện chưa có thông tin lịch sử khám
          </h6>
          <div>
            <img
              width="100%"
              src="https://medpro.vn/static/media/phieukham_notfound.e2166690.svg"
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
}
