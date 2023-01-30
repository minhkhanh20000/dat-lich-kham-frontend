import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
  specialtyed: '',
  department: '',
  services: {},
};
export const bookServiceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    addSpecial(state, action) {
      state.specialtyed = action.payload;
    },
    // chon khoa
    addDepartment(state, action) {
      state.department = action.payload;
    },
    addService(state, action) {
      state.services = action.payload;
    },
    deleteService(state, action) {
      state.services = {};
    },

    resetData(state, action) {
      state.department = '';
    },
  },
  extraReducers: (builder) => {},
});
export const {
  addSpecial,
  addService,
  deleteService,
  addDepartment,
  resetData,
} = bookServiceSlice.actions;

export default bookServiceSlice.reducer;
