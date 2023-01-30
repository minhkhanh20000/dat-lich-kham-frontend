import React from 'react';
import styles from '../Auth.module.css';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { images } from '../../../constants/constants';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function RegisterForm({ onSubmitForm }) {
  const initialValues = {
    phone: '',
    email: '',
    password: '',
    fullName: '',
  };
  const schema = yup.object().shape({
    phone: yup
      .string()
      .required('SDT không được bỏ trống.')
      .matches(phoneRegExp, 'SDT không đúng định dạng')
      .max(10, 'Số điện thoại không hợp lệ'),
    fullName: yup.string().required('Họ và tên không được bỏ trống'),
    email: yup
      .string()
      .email('Email không hợp lệ')
      .required('Email không được bỏ trống.'),
    password: yup
      .string()
      .required('Password không được bỏ trống.')
      .min(8, 'Mật khẩu cần ít nhất 8 ký tự'),
    confirmPassword: yup
      .string()
      .required('Password không được bỏ trống.')
      .min(8, 'Mật khẩu cần ít nhất 8 ký tự')
      .when('password', (password, field) =>
        password
          ? field
              .required('Mật khẩu không khớp.')
              .oneOf([yup.ref('password')], 'Mật khẩu không khớp.')
          : field
      ),
  });

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const onSubmit = (values) => {
    onSubmitForm(values);
  };
  return (
    <div>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <img src={images.LOGO} alt="" width="100px" height="100px" />
      </div>
      <p className={styles.text}>
        Vui lòng nhập thông tin để đăng ký tài khoản
      </p>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row>
          <Col xs={12} className="my-md-4">
            <div className="mb-3">
              <label for="fullname" class="form-label h6 fw-bold">
                Họ và tên <span className="text-danger">*</span>
              </label>
              <input
                type="string"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.fullName && styles.inputError
                }`}
                id="fullname"
                {...register('fullName')}
                placeholder="Nhập họ và tên..."
              />
              {errors.phone && (
                <Form.Text
                  className="text-danger"
                  style={{ fontSize: '1.5rem', paddingTop: '1rem' }}
                >
                  {errors.fullName.message}
                </Form.Text>
              )}
            </div>
          </Col>
          <Col xs={6} className="my-md-4">
            <div className="mb-3">
              <label for="phone-number" class="form-label h6 fw-bold">
                Số điện thoại <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.phone && styles.inputError
                }`}
                id="phone-number"
                {...register('phone')}
                placeholder="Nhập số điện thoại..."
              />
              {errors.phone && (
                <Form.Text
                  className="text-danger"
                  style={{ fontSize: '1.5rem', paddingTop: '1rem' }}
                >
                  {errors.phone.message}
                </Form.Text>
              )}
            </div>
          </Col>
          <Col xs={6} className="my-md-4">
            <div className="mb-3">
              <label for="email" class="form-label h6 fw-bold">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.email && styles.inputError
                }`}
                placeholder="Nhập email..."
                {...register('email')}
              />
              {errors.email && (
                <Form.Text
                  className="text-danger"
                  style={{ fontSize: '1.5rem', paddingTop: '1rem' }}
                >
                  {errors.email.message}
                </Form.Text>
              )}
            </div>
          </Col>
          <Col xs={6} className="my-md-4">
            <div className="mb-3">
              <label for="password" class="form-label h6 fw-bold">
                Mật khẩu <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.password && styles.inputError
                }`}
                id="password"
                placeholder="Nhập mật khẩu..."
                autoComplete="off"
                {...register('password')}
              />
              {errors.password && (
                <Form.Text
                  className="text-danger"
                  style={{ fontSize: '1.5rem', paddingTop: '1rem' }}
                >
                  {errors.password.message}
                </Form.Text>
              )}
            </div>
          </Col>
          <Col xs={6} className="my-md-4">
            <div className="mb-3">
              <label for="confirmPassword" class="form-label h6 fw-bold">
                Nhập lại mật khẩu <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
                  errors.confirmPassword && styles.inputError
                }`}
                id="confirmPassword"
                placeholder="Nhập mật khẩu..."
                autoComplete="off"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <Form.Text
                  className="text-danger"
                  style={{ fontSize: '1.5rem', paddingTop: '1rem' }}
                >
                  {errors.confirmPassword.message}
                </Form.Text>
              )}
            </div>
          </Col>
        </Row>

        <div className="mb-3 mt-5">
          <button
            className="btn-button btn-button-primary"
            style={{ width: '100%' }}
          >
            Đăng ký
          </button>
        </div>
      </form>

      <div className={styles.textRegister}>
        Bạn đã có tài khoản? <Link to="/auth/login">Đăng nhập ngay?</Link>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
