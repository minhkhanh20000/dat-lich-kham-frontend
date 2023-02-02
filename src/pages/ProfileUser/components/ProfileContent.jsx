import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Scrollbars from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { datLichApi } from '../../../api/datLich';
import { Chip } from '../../../components/Chip/Chip';
import { formatDate } from '../../../utils/common';

export function CardTicker({ item, isCheck, onClick }) {
  const {
    ngaySinh,
    gioiTinh,
    tinhTrangDangKy,
    hoTen,
    SDT,
    maND,
    lyDo,
    maThoiGian,
    thoiGianDky,
    thoiGianBatDau,
    ghiChu,
    tenKhoa,
  } = item;

  return (
    <Card
      text={'dark'}
      style={{ width: '100%', maxHeight: '300px' }}
      className="mb-4"
    >
      <div style={{ borderBottom: '1px solid rgb(215 204 204)' }}>
        <Card.Header
          style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '5px',
          }}
        >
          Thông tin lịch khám
        </Card.Header>
      </div>

      <Scrollbars style={{ width: '100%', height: 300 }}>
        <Card.Body>
          <div>
            <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ fontWeight: 600, paddingRight: '8px' }}>
                Họ tên:
              </span>
              <span
                style={{ color: 'var(--color-primary)', fontWeight: '600' }}
              >
                {hoTen}
              </span>
            </Card.Text>
            <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ fontWeight: 600, paddingRight: '8px' }}>
                Giới tính:
              </span>
              <span
                style={{ color: 'var(--color-primary)', fontWeight: '600' }}
              >
                {gioiTinh}
              </span>
            </Card.Text>
            <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ fontWeight: 600, paddingRight: '8px' }}>
                Ngày sinh:
              </span>
              <span
                style={{ color: 'var(--color-primary)', fontWeight: '600' }}
              >
                {moment(ngaySinh).format('YYYY-MM-DD')}
              </span>
            </Card.Text>
            <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ fontWeight: 600, paddingRight: '8px' }}>SDT:</span>
              <span
                style={{ color: 'var(--color-primary)', fontWeight: '600' }}
              >
                {SDT}
              </span>
            </Card.Text>
            <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ fontWeight: 600, paddingRight: '8px' }}>
                Ngày khám:
              </span>
              <span
                style={{ color: 'var(--color-primary)', fontWeight: '600' }}
              >
                {thoiGianBatDau} - {formatDate(thoiGianDky)}
              </span>
            </Card.Text>
            <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ fontWeight: 600, paddingRight: '8px' }}>
                Khoa:
              </span>
              <span style={{ color: 'red', fontWeight: '600' }}>{tenKhoa}</span>
            </Card.Text>
            <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ fontWeight: 600, paddingRight: '8px' }}>
                Lý do:
              </span>
              <span style={{ color: 'red', fontWeight: '600' }}>{lyDo}</span>
            </Card.Text>
            <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ fontWeight: 600, paddingRight: '8px' }}>
                Ghi chú:
              </span>
              <span style={{ color: 'red', fontWeight: '600' }}>{ghiChu}</span>
            </Card.Text>
            {tinhTrangDangKy !== 'hoanThanh' ? (
              <Card.Text style={{ marginBottom: '10px', fontSize: '14px' }}>
                <span style={{ fontWeight: 600, paddingRight: '8px' }}>
                  Tình trạng:
                </span>
                {tinhTrangDangKy === 'Success' ? (
                  <Chip status={'Đã xác nhận'} variant={'#03a9f4'} />
                ) : tinhTrangDangKy === 'Pending' ? (
                  <Chip status={'Đang chờ'} variant={'#ffc107'} />
                ) : (
                  ''
                )}
              </Card.Text>
            ) : (
              ''
            )}
          </div>

          {isCheck && (
            <>
              <div className="d-flex justify-content-between mt-4">
                {tinhTrangDangKy === 'Pending' && (
                  <button
                    className="btn-button btn-button-primary p-p-5 mx-1"
                    onClick={() => onClick(maND, maThoiGian, thoiGianDky)}
                  >
                    Xác nhận
                  </button>
                )}
                <button
                  className="btn-button"
                  style={{
                    backgroundColor: '#ff1744',
                    color: '#fff',
                    flex: 1,
                  }}
                >
                  Từ chối
                </button>
              </div>
            </>
          )}
        </Card.Body>
      </Scrollbars>
    </Card>
  );
}

export function ProfileInforTicker() {
  const navigate = useNavigate();
  const { maND } = useSelector((state) => state.auth.currentUser);
  const [listTicker, setListTicker] = useState([]);
  const fetchData = async () => {
    try {
      const res = await datLichApi.getDatLichUser(maND);
      setListTicker(res);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h5 className="text-center mb-5 fw-bold">Phiếu đăng ký khám bệnh</h5>
      <h6 className="text-danger text-center mb-2">
        {listTicker.total < 0 && 'Hiện chưa có thông tin phiếu khám bệnh'}
      </h6>
      <div>
        {listTicker.total > 0 ? (
          <Container>
            <Row>
              {listTicker.data.map((item) => (
                <Col xs={4}>
                  <CardTicker
                    item={item}
                    key={`${item.thoiGianDky}${item.thoiGianBatDau} `}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        ) : (
          <>
            <div style={{ display: 'flex' }}>
              <button
                className="btn-button btn-button-primary"
                style={{ margin: '2rem auto' }}
                onClick={() => navigate('/dich-vu')}
              >
                Đăng ký khám ngay
              </button>
            </div>
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
    </div>
  );
}
