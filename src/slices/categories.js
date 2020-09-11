import { createSlice } from '@reduxjs/toolkit'
import config from "../config";
import { callAPI } from '../helpers';

export const initialState = {
  loading: false,
  hasErrors: false,
  cats: [],
  ftcode: '',
  isSelectedCat: false,
}

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    getCats: state => {
      state.loading = true
    },
    getCatsSuccess: (state, { payload }) => {
      state.cats = payload
      state.loading = false
      state.hasErrors = false
    },
    getCatsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
    getFoodsSingleCat: (state, { payload }) => {
      state.loading = false
      state.ftcode = payload
      state.hasErrors = false
      state.isSelectedCat = true
    },
    clearFilterCategory: state => {
      state.isSelectedCat = false
    },
  },
})

export const { getCats, getCatsSuccess, getCatsFailure, getFoodsSingleCat, clearFilterCategory } = catsSlice.actions
export const catsSelector = state => state.cats
export default catsSlice.reducer

export function fetchCategories() {
  return async dispatch => {
    dispatch(getCats())

    try {
      const response = await callAPI(`${config.apiUrl}posx/cats`, null, "GET")
      // console.log(response)

      dispatch(getCatsSuccess(response))
    } catch (error) {
      dispatch(getCatsFailure())
    }
  }
}

export function fetchFoodsByCat(ftcode) {
  return async dispatch => {
    dispatch(getFoodsSingleCat(ftcode))
  }
}

export function clearFilterCat() {
  return async dispatch => {
    dispatch(clearFilterCategory())
  }
}