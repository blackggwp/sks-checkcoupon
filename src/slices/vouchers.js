import { createSlice } from '@reduxjs/toolkit'
import config from "../config";
import Axios from 'axios';

export const initialState = {
  loading: false,
  hasErrors: false,
  cols: [],
  vouchers: [],
}

const vouchersSlice = createSlice({
  name: 'vouchers',
  initialState,
  reducers: {
    fetchCol: state => {
      state.loading = true
    },
    fetchColSuccess: (state, { payload }) => {
      state.cols = payload
      state.loading = false
      state.hasErrors = false
    },
    fetchColFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
    fetchVoucher: state => {
      state.loading = true
    },
    fetchVoucherSuccess: (state, { payload }) => {
      state.vouchers = payload
      state.loading = false
      state.hasErrors = false
    },
    fetchVoucherFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const {
  fetchCol,
  fetchColSuccess,
  fetchColFailure,
  fetchVoucher,
  fetchVoucherSuccess,
  fetchVoucherFailure } = vouchersSlice.actions
export const vouchersSelector = state => state.vouchers
export default vouchersSlice.reducer

export function fetchCols() {
  return async dispatch => {
    dispatch(fetchCol())

    try {
      const response = await Axios(`${config.apiUrl}coupons/cols`)
      // console.log(response)
      dispatch(fetchColSuccess(response.data))
    } catch (error) {
      dispatch(fetchColFailure())
    }
  }
}
export function fetchVouchers(query) {
  return async dispatch => {
    dispatch(fetchVoucher())

    try {
      // const response = await Axios(`${config.apiUrl}coupons/${str}`)
      const response = await Axios.get(`${config.apiUrl}coupons/query`, {
        params: {
          query
        }
      });
      console.log(response)
      dispatch(fetchVoucherSuccess(response.data))
    } catch (error) {
      dispatch(fetchVoucherFailure())
    }
  }
}
