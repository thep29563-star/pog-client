import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastType = 'success' | 'error' ;
interface ToastState {
  open: boolean;
  message: string;
  severity: ToastType;
  time?: number;
}

const initialState: ToastState = {
  open: false,
  message: '',
  severity: 'success',
  time: 5000,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        severity: ToastType;
        time?: number;
      }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.time = action.payload.time ?? 5000;
    },
    hideToast: (state) => {
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
