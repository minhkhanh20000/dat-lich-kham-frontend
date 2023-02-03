import React, { useEffect, useMemo, useState } from 'react';
// react-bootstrap components
import { Col, Container, Form, Row } from 'react-bootstrap';
import Select from 'react-select';

import { userApi } from '../../../api/userApi';
import { Loading } from '../../../components/Loading';
import { formatDate, optionsRule, toastify } from '../../../utils/common';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ruleUser } from '../../../utils/common';
import InputControl from '../../../form-control/InputControl';
import { useForm } from 'react-hook-form';
import TextareaControl from '../../../form-control/TextareaControl';
import SelectControl from '../../../form-control/SelectControl';
import { khoaApi } from '../../../api/khoaApi';

function ModelUser({ user, isShow, onClose, onSuccess }) {
  const { control, reset, handleSubmit } = useForm({});
  const [khoa, setKhoa] = useState([]);

  const handleOnSubmit = async (values) => {
    try {
      const {
        chuyenNganh,
        truongTotNghiep,
        kinhNghiem,
        maKhoa,
        lyLichCongTac,
      } = values;
      const formData = new FormData();
      formData.append('chuyenNganh', chuyenNganh);
      formData.append('truongTotNghiep', truongTotNghiep);
      formData.append('kinhNghiem', kinhNghiem);
      formData.append('maKhoa', maKhoa);
      formData.append('lyLichCongTac', lyLichCongTac);

      const res = await userApi.editProfileDoctor(user.maND, formData);
      toastify('success', res.message);
      onClose();
      onSuccess();
    } catch (error) {}
  };

  const fetchOptions = async () => {
    try {
      const data = await khoaApi.getKhoa();
      setKhoa(data);
    } catch (error) {}
  };
  useEffect(() => {
    reset(user);
    fetchOptions();
  }, [user]);

  const memoOption = useMemo(() => {
    return khoa?.map((item) => {
      return {
        value: item.maKhoa,
        label: item.tenKhoa,
      };
    });
  }, [khoa]);
  return (
    <Modal show={isShow} onHide={() => onClose()}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Bác sĩ: {user?.hoTen}</Modal.Title>

          <img
            width="100"
            height="100"
            style={{
              borderRadius: '100%',
            }}
            src={
              user.avatar ||
              'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'
            }
            alt=""
          />
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label
              style={{
                fontSize: '1.5rem',
              }}
            >
              Khoa
            </Form.Label>

            <SelectControl
              name="maKhoa"
              control={control}
              values={memoOption}
              placeholder="Chọn khoa"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label
              style={{
                fontSize: '1.5rem',
              }}
            >
              Trường tốt nghiệp
            </Form.Label>
            <InputControl
              placeholder="Đại học X"
              name="truongTotNghiep"
              control={control}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label
              style={{
                fontSize: '1.5rem',
              }}
            >
              Kinh nghiệm
            </Form.Label>
            <InputControl
              placeholder="Số năm kinh nghiệm"
              name="kinhNghiem"
              control={control}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label
              style={{
                fontSize: '1.5rem',
              }}
            >
              Lý lịch công tác
            </Form.Label>
            <TextareaControl
              placeholder="Lý lịch công tác"
              name="lyLichCongTac"
              control={control}
              type="text"
            />
          </Form.Group>
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
          <button className="btn-button btn-button-primary mx-3" type="submit">
            Lưu
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

const QuanLyBacSi = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await userApi.getAllUser({
        role: ruleUser.BACSI,
      });
      setUsers(res);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleOnClick = (user) => {
    setUser(user);
    setIsShow(true);
  };

  const handleOnClose = (user) => {
    setUser('');
    setIsShow(false);
  };
  if (loading) return <Loading />;
  return (
    <>
      <Container fluid>
        <h3 className="text-center">Danh sách bác sĩ</h3>
        <Row>
          <Col xs={12}>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">SDT</th>
                  <th scope="col">Email</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col">Vai trò</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.users?.map((user, index) => (
                  <tr key={user.maND}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.hoTen}</td>
                    <td>{user.SDT}</td>
                    <td>{user.email}</td>
                    <td>{user.gioiTinh}</td>
                    <td>{formatDate(user.ngaySinh)}</td>
                    <td>{user.tenQuyen}</td>
                    <td>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <button
                          className="btn-button bg-primary text-light p-2"
                          style={{
                            width: '10rem',
                          }}
                          onClick={() => handleOnClick(user)}
                        >
                          Chỉnh sửa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
        <h6>Tổng có: {users.totalData} bác sĩ</h6>

        {isShow && (
          <ModelUser
            user={user}
            isShow={isShow}
            onClose={handleOnClose}
            onSuccess={() => fetchData()}
          />
        )}
      </Container>
    </>
  );
};

export default QuanLyBacSi;
