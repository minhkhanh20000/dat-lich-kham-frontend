import { toastify } from '../utils/common';
import axiosClient from './axiosClient';

export const register = async (formData) => {};

export const userApi = {
  async login(formData) {
    try {
      const res = await axiosClient.post(`login`, formData);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async register(formData) {
    try {
      const res = await axiosClient.post(`register`, formData);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async addProfileDoctor(id, formData) {
    try {
      const res = await axiosClient.post(`add-profile-doctor/${id}`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async editProfileDoctor(id, formData) {
    try {
      const res = await axiosClient.put(`edit-profile-doctor/${id}`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },

  async editProfileUser(id, formData) {
    try {
      const res = await axiosClient.put(`edit-profile-user/${id}`, formData);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async editRoleUser(formData) {
    try {
      const res = await axiosClient.put(`edit-role`, formData);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
  async getProfileDoctor(id) {
    try {
      const res = await axiosClient.get(`get-profile-doctor/${id}`);
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },

  async getAllUser(params) {
    try {
      const res = await axiosClient.get('get-all-user', {
        params,
      });
      return res;
    } catch (error) {
      toastify('error', error.message);
    }
  },
};
