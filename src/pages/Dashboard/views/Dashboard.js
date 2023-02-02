import moment from 'moment';
import React, { useEffect, useState } from 'react';
// react-bootstrap components
import { Col, Container, Row, Table } from 'react-bootstrap';
import { datLichApi } from '../../../api/datLich';
import { lichLamViecApi } from '../../../api/lichLamViecApi';
import { userApi } from '../../../api/userApi';
import { Chip } from '../../../components/Chip/Chip';
import { Loading } from '../../../components/Loading';
import { formatDate, toastify } from '../../../utils/common';
import iconuser from '../assets/images/iconuser.png';
import stethoscope from '../assets/images/stethoscope.png';
import styles from './Dashboard.module.css';
import { ModelNote } from './QuanLyLichKham';

function Dashboard() {
  const [totalService, setTotalService] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [lich, setLich] = useState([]);
  const [dataDatLich, setDataDatLich] = useState();
  const [keyTime, setKeyTime] = useState(0);
  const [params, setParams] = useState({
    maThoiGian: '',
    thoiGianDky: formatDate(new Date()),
  });

  const optionTime = React.useMemo(() => {
    return lich.map((item) => {
      return {
        value: item.maTG,
        label: `${item.thoiGianBatDau} - ${item.thoiGianKetThuc}`,
      };
    });
  }, [lich]);

  const fetchGetTime = async () => {
    try {
      const res = await lichLamViecApi.getThoiGianLamViec();
      setLich(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchGetTime();
  }, []);
  const fetchTotalService = async () => {
    try {
      const res = await datLichApi.countDatLich();
      const total = await userApi.getAllUser();
      setTotalUser(total.totalData);
      setTotalService(res.total);
      setLoading(false);
    } catch (error) {}
  };
  const fetchDataDatLich = async (params) => {
    try {
      const res = await datLichApi.getDatLichByMaThoiGian(params);
      setDataDatLich(res);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTotalService();
    fetchDataDatLich(params);
  }, [params]);

  const handleOnConfirm = (maND, maThoiGian, thoiGianDky) => {
    try {
      const res = datLichApi.comfirmDangKy(
        { maND, maThoiGian, thoiGianDky: formatDate(thoiGianDky) },
        { tinhTrangDangKy: 'hoanThanh' }
      );

      const timer = setTimeout(() => {
        fetchDataDatLich({
          maThoiGian: '',
          thoiGianDky: formatDate(new Date()),
        });
      }, 100);

      toastify('success', res.message);

      return () => {
        clearTimeout(timer);
      };
    } catch (error) {}
  };

  const handleOnClose = () => {
    setIsShow(false);
  };

  const memoDatLich = React.useMemo(() => {
    return dataDatLich?.data?.filter(
      (item) => item.tinhTrangDangKy === 'Success'
    );
  });

  if (loading) return <Loading />;
  return (
    <div style={{ marginTop: '9rem' }}>
      <Container fluid>
        <Row>
          <Col lg="4" sm="6">
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
          <Col lg="4" sm="6">
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
          <Col lg="4" sm="6">
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
                  src="data:image/png;base64,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"
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
                  Số lượt chờ khám ngày{' '}
                  {moment(new Date()).format('DD-MM-YYYY')}
                </h6>
                <h2
                  className="text-center"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {memoDatLich.length}
                </h2>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <div>
            <div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <h5
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Thời gian:
                </h5>
              </div>

              <div className="d-flex justify-content-between gap-2 flex-wrap">
                <div
                  className={`${styles.boxTime} ${
                    keyTime === 0 && styles.boxTimeActive
                  }`}
                  style={{
                    userSelect: 'none',
                    padding: '1rem 2rem',
                    backgroundColor: '#fff',
                    marginBottom: '1rem',
                    color: '#000',
                    fontSize: '1.4rem',
                    width: '12%',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: '1px solid var(--color-primary)',
                    textAlign: 'center',
                  }}
                  onClick={() => {
                    setParams({
                      ...params,
                      maThoiGian: '',
                    });
                    setKeyTime(0);
                  }}
                >
                  <p className="text-center">Tất cả</p>
                </div>
                {optionTime.map((item) => (
                  <div
                    className={`${styles.boxTime} ${
                      keyTime === item.value && styles.boxTimeActive
                    }`}
                    style={{
                      userSelect: 'none',
                      padding: '1rem 2rem',
                      backgroundColor: '#fff',
                      marginBottom: '1rem',
                      color: '#000',
                      fontSize: '1.4rem',
                      width: '12%',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid var(--color-primary)',
                    }}
                    key={item.value}
                    onClick={() => {
                      setParams({
                        ...params,
                        maThoiGian: item.value,
                      });
                      setKeyTime(item.value);
                    }}
                  >
                    <p className="text-center">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div>
            {dataDatLich?.total > 0 && (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>SDT</th>
                    <th>Ngày khám</th>
                    <th>Thời gian khám</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDatLich?.data?.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.hoTen}</td>
                      <td>{item.SDT}</td>
                      <td>{formatDate(item.thoiGianDky)}</td>
                      <td>{item.thoiGianBatDau}</td>
                      <td>
                        {item.tinhTrangDangKy === 'Success' ? (
                          <Chip status={'Đã xác nhận'} variant={'#03a9f4'} />
                        ) : (
                          <Chip status={'Đã khám'} variant={'#03a9f4'} />
                        )}
                      </td>
                      <td>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          {item.tinhTrangDangKy === 'Success' && (
                            <button
                              style={{
                                width: '14rem',
                              }}
                              className="p-3 mx-1 mb-1 bg-primary btn-button text-light "
                              onClick={() =>
                                handleOnConfirm(
                                  item.maND,
                                  item.maThoiGian,
                                  item.thoiGianDky
                                )
                              }
                            >
                              Hoàn thành
                            </button>
                          )}
                          <button
                            style={{
                              width: '14rem',
                              fontSize: '1.4rem',
                            }}
                            className="btn-button p-3 mx-1 text-light bg-danger"
                            onClick={() => {
                              setUser(item);
                              setIsShow(true);
                            }}
                          >
                            {item.ghiChu ? 'Sửa ghi chú' : 'Ghi chú'}
                          </button>
                        </div>
                      </td>
                      {isShow && (
                        <ModelNote
                          user={item}
                          isShow={isShow}
                          onClose={handleOnClose}
                          onSuccess={() => fetchDataDatLich(params)}
                        />
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            {dataDatLich.total <= 0 && (
              <h4 className="text-warning">Không có người khám</h4>
            )}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
