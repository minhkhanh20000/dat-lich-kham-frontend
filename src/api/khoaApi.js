import { toastify } from '../utils/common';
import axiosClient from './axiosClient';

export const khoaApi = {
  async getKhoa() {
    try {
      const res = await axiosClient.get('khoa');
      return res.data;
    } catch (error) {
      toastify('error', error.message);
    }
  },
};
