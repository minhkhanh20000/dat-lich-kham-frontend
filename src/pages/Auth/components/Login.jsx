import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userApi } from '../../../api/userApi';
import { login } from '../../../app/slices/authSlice';
import { toastify } from '../../../utils/common';
import { setRulesUser, setUserData } from '../../../utils/local';
import LoginForm from './LoginForm';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hanldeOnSubmitForm = async (formData) => {
    try {
      const resultAction = await userApi.login(formData);

      unwrapResult(resultAction);
      setUserData(resultAction.user);
      dispatch(login(resultAction.user));

      navigate('/');
      toastify('success', 'Đăng nhập thành công');
    } catch (error) {
      // toastify('error', error.message);
    }
  };
  return (
    <div>
      <LoginForm onSubmitForm={hanldeOnSubmitForm} />
    </div>
  );
}
