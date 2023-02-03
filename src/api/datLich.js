import { toastify } from '../utils/common';
import axiosClient from './axiosClient';

export const datLichApi = {
  async getDatLich(params) {
    try {
      const res = await axiosClient.get('dat-lich', {
        params: params,
      });
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async dangKyDatLich(formData) {
    try {
      const res = await axiosClient.post('dat-lich', formData);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },

  async getDatLichUser(maND, params) {
    try {
      if (params) {
        const res = await axiosClient.get(`dat-lich-user/${maND}`, {
          params,
        });
        return res;
      } else {
        const res = await axiosClient.get(`dat-lich-user/${maND}`);
        return res;
      }
    } catch (error) {
      toastify('error', error.message);
    }
  },

  async getAllDatLich(params) {
    try {
      const res = await axiosClient.get(`all-dat-lich`, {
        params: params,
      });
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async getDatLichByMaThoiGian(params) {
    try {
      const res = await axiosClient.get(`get-dat-lich-by-thoi-gian`, {
        params: params,
      });
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },

  async comfirmDangKy(params, payload) {
    try {
      const res = await axiosClient.put('confirm-dat-lich', payload, {
        params: params,
      });
      return res;
    } catch (error) {}
  },
  async editNoteDatLich(params, payload) {
    try {
      const res = await axiosClient.put('edit-note', payload, {
        params: params,
      });
      return res;
    } catch (error) {}
  },
  async countDatLich() {
    try {
      const res = await axiosClient.get('count-datlich');
      return res;
    } catch (error) {}
  },
};
