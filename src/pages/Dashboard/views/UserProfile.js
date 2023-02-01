import React, { useEffect, useState } from 'react';
// react-bootstrap components
import { Col, Container, Form, Row } from 'react-bootstrap';
import Select from 'react-select';

import { userApi } from '../../../api/userApi';
import { Loading } from '../../../components/Loading';
import { formatDate, optionsRule, toastify } from '../../../utils/common';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModelUser({ user, isShow, onClose, onSuccess }) {
  const [maQuyen, setMaQuyen] = useState(user.maQuyen);
  const [disabled, setDisabled] = useState(false);
  const handleOnChange = (value) => {
    setMaQuyen(value);
  };

  const handleOnSubmit = async () => {
    try {
      setDisabled(true);
      const res = await userApi.editRoleUser({
        maQuyen: maQuyen,
        maND: user.maND,
      });

      toastify('success', res.message);
      setDisabled(false);
      onClose();
      onSuccess();
    } catch (error) {}
  };
  return (
    <Modal show={isShow} onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa người dùng: </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
              value={user.hoTen}
              style={{
                fontSize: '1.5rem',
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label
              style={{
                fontSize: '1.5rem',
              }}
            >
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
              disabled
              value={user.email}
              style={{
                fontSize: '1.5rem',
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label
              style={{
                fontSize: '1.5rem',
              }}
            >
              Vai trò
            </Form.Label>
            <Select
              name="maQuyen"
              options={optionsRule}
              onChange={(selectedOption) => {
                handleOnChange(selectedOption.value);
              }}
              value={optionsRule.find((c) => c.value === maQuyen) || ''}
              style={{
                fontSize: '1.5rem',
              }}
            />
          </Form.Group>
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

function User() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await userApi.getAllUser({
        role: '',
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
        <h2 className="text-center">Danh sách người dùng hệ thống</h2>
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
        <h6>Tổng có: {users.totalData} người dùng</h6>

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
}

export default User;
