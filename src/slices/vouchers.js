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
    fetchingVoucher: state => {
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
  fetchingVoucher,
  fetchVoucherSuccess,
  fetchVoucherFailure } = vouchersSlice.actions
export const vouchersSelector = state => state.vouchers
export default vouchersSlice.reducer

export function fetchCols() {
  return async dispatch => {
    dispatch(fetchCol())

    try {
      const response = await Axios(`${config.apiUrl}coupons/cols`)
      const colsRaw = response.data.recordsets[0]
      var filteredItems = colsRaw.filter(function (item) {
        return item.isbinding !== '1'
      });
      const col = filteredItems.map(item => item.ColName)
      dispatch(fetchColSuccess(col))
    } catch (error) {
      dispatch(fetchColFailure())
    }
  }
}
export function fetchVouchers(query) {
  if (query === {}) {
    return async dispatch => {
      dispatch(fetchVoucherFailure())
    }
  }
  for (const key in query) {
    (query[key] === '') && delete query[key]
  }
  console.log(query)
  return async dispatch => {
    dispatch(fetchingVoucher())

    try {
      const response = await Axios.get(`${config.apiUrl}coupons/query`, {
        params: query
      });
      console.log(response)
      dispatch(fetchVoucherSuccess(response.data))
    } catch (error) {
      dispatch(fetchVoucherFailure())
    }
  }
}
