import { toastify } from '../utils/common';
import axiosClient from './axiosClient';

export const baiDangApi = {
  async postBaiDang(formData) {
    try {
      const res = await axiosClient.post('new-post', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async editBaiDang(formData, id) {
    try {
      const res = await axiosClient.put(`edit-post/${id}`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },

  async getAllBaiDang() {
    try {
      const res = await axiosClient.get('get-all-post');
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async getChiTietBaiDang(id) {
    try {
      const res = await axiosClient.get(`get-detail-post/${id}`);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async deleteBaiDang(id) {
    try {
      const res = await axiosClient.delete(`delete-post/${id}`);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
};
