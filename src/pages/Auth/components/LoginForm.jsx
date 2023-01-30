import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '../Auth.module.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { phoneRegExp } from '../../../utils/common';
import { images } from '../../../constants/constants';

function LoginForm({ onSubmitForm }) {
  const navigate = useNavigate();
  const initialValues = {
    phone: '',
    password: '',
  };
  const schema = yup.object().shape({
    phone: yup
      .string()
      .required('SDT không được bỏ trống.')
      .matches(phoneRegExp, 'SDT không đúng định dạng')
      .max(10, 'Số điện thoại không hợp lệ'),
    password: yup.string().required('Xin vui lòng nhập lại mật khẩu.').min(8),
  });
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
      <p className={styles.text}>Vui lòng nhập số điện thoại để tiếp tục</p>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mb-3">
          <label htmlFor="phone" className="form-label h6 fw-bold">
            Số điện thoại
          </label>
          <input
            type="number"
            className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
              errors.phone && styles.inputError
            }`}
            id="phone"
            {...register('phone')}
            placeholder="Nhập số điện thoại..."
          />
          {errors.phone && (
            <Form.Text className="text-danger" style={{ fontSize: '1.6rem' }}>
              {errors.phone.message}
            </Form.Text>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label h6 fw-bold">
            Mật khẩu
          </label>
          <input
            type="password"
            className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
              errors.password && styles.inputError
            }`}
            id="password"
            {...register('password')}
            placeholder="Nhập mật khẩu..."
            autoComplete="off"
          />
          {errors.password && (
            <Form.Text className="text-danger" style={{ fontSize: '1.6rem' }}>
              {errors.password.message}
            </Form.Text>
          )}
        </div>

        <div className="mb-3 mt-5">
          <button
            className="btn-button btn-button-primary"
            style={{ width: '100%' }}
          >
            Đăng nhập
          </button>
        </div>
      </form>

      <div className={styles.textRegister}>
        Bạn chưa có tài khoản? <Link to="/auth/register">Đăng ký ngay</Link>
      </div>
    </div>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
