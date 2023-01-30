import React from 'react';
import RegisterForm from './RegisterForm';
import { userApi } from '../../../api/userApi';
import { toastify } from '../../../utils/common';
import { useNavigate } from 'react-router';
import { unwrapResult } from '@reduxjs/toolkit';

export default function Register() {
  const navigate = useNavigate();

  const hanldeOnSubmitForm = async (values) => {
    try {
      const resultAction = await userApi.register({
        ...values,
        maQuyen: 'user',
      });

      unwrapResult(resultAction);

      toastify('success', 'Đăng ký tài khoản thành công');
      navigate('/auth/login');
    } catch (error) {
      // toastify('error', error.message);
    }
  };
  return (
    <div>
      <RegisterForm onSubmitForm={hanldeOnSubmitForm} />
    </div>
  );
}
