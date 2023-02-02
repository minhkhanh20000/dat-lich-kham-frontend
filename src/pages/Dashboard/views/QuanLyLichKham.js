import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Modal,
  Table,
  Button,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import { GoSearch } from 'react-icons/go';
import { Calendar } from 'react-calendar';

import { datLichApi } from '../../../api/datLich';
import { lichLamViecApi } from '../../../api/lichLamViecApi';
import { Chip } from '../../../components/Chip/Chip';
import { Loading } from '../../../components/Loading';
import { formatDate, toastify } from '../../../utils/common';
import styles from './Dashboard.module.css';

export function ModelNote({ user, isShow, onClose, onSuccess }) {
  const [disabled, setDisabled] = useState(false);
  const [ghiChu, setGhiChu] = useState(user.ghiChu);
  const handleOnSubmit = async () => {
    try {
      setDisabled(true);
      const res = await datLichApi.editNoteDatLich(
        {
          thoiGianDky: formatDate(user.thoiGianDky),
          maND: user.maND,
          maThoiGian: user.maThoiGian,
        },
        {
          ghiChu: ghiChu,
        }
      );

      toastify('success', res.message);
      setDisabled(false);
      onClose();
      onSuccess();
    } catch (error) {}
  };
  return (
    <Modal
      show={isShow}
      onHide={() => {
        onClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Thông tin khám: </Modal.Title>
      </Modal.Header>

      <Modal.Body className="show-grid">
        <Form>
          <Container>
            <Row>
              <Col xs={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: '1.5rem',
                    }}
                  >
                    Họ và tên
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                    disabled
                    value={user?.hoTen}
                    style={{
                      fontSize: '1.5rem',
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: '1.5rem',
                    }}
                  >
                    Ngày khám
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                    disabled
                    value={formatDate(user.thoiGianDky)}
                    style={{
                      fontSize: '1.5rem',
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: '1.5rem',
                    }}
                  >
                    Giờ khám
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                    disabled
                    value={user.thoiGianBatDau}
                    style={{
                      fontSize: '1.5rem',
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: '1.5rem',
                    }}
                  >
                    Ghi chú
                  </Form.Label>
                  <textarea
                    rows="3"
                    cols="38"
                    type="text"
                    style={{ fontSize: '1.6rem', width: '100%' }}
                    className={`${`p-4 h4 m-0`}`}
                    placeholder="Nhập ghi chú"
                    value={ghiChu}
                    onChange={(e) => setGhiChu(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal.Body>

      <Modal.Footer
        style={{
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        <Button
          variant="secondary"
          onClick={() => onClose()}
          className="mx-2"
          style={{
            fontSize: '1.5rem',
          }}
        >
          Đóng
        </Button>
        <Button
          onClick={handleOnSubmit}
          type="submit"
          variant="primary"
          style={{
            fontSize: '1.5rem',
          }}
          disabled={disabled}
        >
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function QuanLyLichKham() {
  const [lich, setLich] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [value, onChangeDate] = useState(new Date());

  const [keyTime, setKeyTime] = useState(0);
  const [dataDatLich, setDataDatLich] = useState();
  const [params, setParams] = useState({
    maThoiGian: '',
    thoiGianDky: formatDate(value),
  });
  const fetchGetTime = async () => {
    try {
      const res = await lichLamViecApi.getThoiGianLamViec();
      setLich(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchGetTime();
  }, []);

  const optionTime = useMemo(() => {
    return lich.map((item) => {
      return {
        value: item.maTG,
        label: `${item.thoiGianBatDau} - ${item.thoiGianKetThuc}`,
      };
    });
  }, [lich]);

  const fetchDataDatLich = async (params) => {
    try {
      const res = await datLichApi.getDatLichByMaThoiGian(params);
      setDataDatLich(res);
      setLoading(false);
    } catch (error) {}
  };

  const handleOnConfirm = (maND, maThoiGian, thoiGianDky) => {
    try {
      const res = datLichApi.comfirmDangKy(
        { maND, maThoiGian, thoiGianDky: formatDate(thoiGianDky) },
        { tinhTrangDangKy: 'hoanThanh' }
      );

      const timer = setTimeout(() => {
        fetchDataDatLich(params);
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

  const handleOnClickDay = (value) => {
    setParams({
      ...params,
      thoiGianDky: formatDate(value),
    });
  };

  useEffect(() => {
    fetchDataDatLich(params);
  }, [params]);

  if (loading) return <Loading />;

  return (
    <div
      style={{
        marginTop: '9rem',
        width: '100%',
      }}
    >
      <Container fluid>
        <h3 className="text-center my-5">
          Quản lý lịch khám ngày: {formatDate(value)}
        </h3>

        <Container fluid>
          <Row>
            <Col xs={7}>
              <div
                style={{
                  height: '300px',
                }}
              >
                <Calendar
                  onChange={onChangeDate}
                  value={value}
                  onClickDay={handleOnClickDay}
                  locale="vi"
                />
              </div>
            </Col>
            <Col xs={5}>
              <div>
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Thời gian:
                    </h5>
                    <div>
                      <div className={styles.boxSearch}>
                        <input
                          placeholder="Nhập từ khóa tìm kiếm..."
                          className={styles.search}
                        />
                        <GoSearch />
                      </div>
                    </div>
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
                        width: '32%',
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
                          width: '32%',
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
            </Col>
          </Row>
        </Container>

        <div>
          {dataDatLich.total > 0 && (
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
                {dataDatLich.data?.map((item, index) => (
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
        {isShow && (
          <ModelNote
            user={user}
            isShow={isShow}
            onClose={handleOnClose}
            onSuccess={() => fetchDataDatLich(params)}
          />
        )}
      </Container>
    </div>
  );
}

export default QuanLyLichKham;
