import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storegeKeys from '../../constants/storegeKeys';
import { removeUser, setUserData } from '../../utils/local';
import { userApi } from '../../api/userApi';
const initialState = {
  currentUser: JSON.parse(localStorage.getItem(storegeKeys.USER)),
};

export const updateProfileUser = createAsyncThunk(
  'auth/updateProfileUser',
  async (payload) => {
    // Call API to register
    const res = await userApi.editProfileUser(payload.maND, payload.formData);
    return { user: res.user[0], message: res.message };
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
      removeUser();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfileUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      removeUser();
      setUserData(action.payload.user);
    });
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
