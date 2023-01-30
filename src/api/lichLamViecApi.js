import { toastify } from '../utils/common';
import axiosClient from './axiosClient';

export const register = async (formData) => {};

export const lichLamViecApi = {
  async getThoiGianLamViec() {
    try {
      const res = await axiosClient.get('thoi-gian');
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
};
