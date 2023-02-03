import { toastify } from '../utils/common';
import axiosClient from './axiosClient';

export const lichLamViecUserApi = {
  async themLichLamViecUser(body) {
    try {
      const res = await axiosClient.post('them-lich-lam-viec-user', body);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async editLichLamViecUser(body) {
    try {
      const res = await axiosClient.put('edit-lich-lam-viec-user', body);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },

  async getLichLamViecUser(params) {
    try {
      const res = await axiosClient.get('get-lich-lam-viec-user', { params });
      return res.data[0];
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async getAllLichLamViecUser(params) {
    try {
      const res = await axiosClient.get('get-all-lich-lam-viec-user');
      return res.data;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async acceptCalender(maND, trangThai, thang, lydohuy) {
    try {
      const res = await axiosClient.put(
        `accept-calender/${maND}/${trangThai}/${thang}/${lydohuy}`
      );
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async getLichLamViecByMonth(params) {
    try {
      const res = await axiosClient.get(`get-lich-lam-viec-month`, { params });
      return res.data;
    } catch (error) {
      toastify('error', error.message);
    }
  },
};
