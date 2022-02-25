import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

const ERROR_OCCURED = 'ERROR_OCCURED';

export const errorOccured = createAction(ERROR_OCCURED);

export const fetchAPI = createAsyncThunk('users/fetchByIdStatus', async (arg: { API: () => Promise<AxiosResponse> }, thunkAPI) => {
  const response = await arg.API();
  return response.data;
});

interface APIProps {
  loading: boolean;
  error: boolean;
  errorText: string;
}
const initialState: APIProps = {
  loading: false,
  error: false,
  errorText: '',
};

const apiSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state: APIProps, action: PayloadAction<APIProps>) => {
      state.error = true;
      state.errorText = action.payload.errorText;
    },
    resetError: (state: APIProps, action: PayloadAction<APIProps>) => {
      state.error = false;
      state.errorText = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAPI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAPI.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

const { actions: errorActions, reducer: error } = apiSlice;
export const { setError, resetError } = errorActions;
export default error;
