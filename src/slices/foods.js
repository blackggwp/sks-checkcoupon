import { createSlice } from '@reduxjs/toolkit'
import config from "../config";
import { callAPI, authHeader } from '../helpers';

export const initialState = {
  loading: false,
  hasErrors: false,
  foods: [],
  isSelectedCat: false,
}

const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    getFoods: state => {
      state.loading = true
    },
    getFoodsSuccess: (state, { payload }) => {
      state.foods = payload
      state.loading = false
      state.hasErrors = false
    },
    getFoodsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getFoods, getFoodsSuccess, getFoodsFailure, getFoodsSingleCat, clearFilterCategory } = foodsSlice.actions
export const foodsSelector = state => state.foods
export default foodsSlice.reducer

export function fetchFoods() {
  return async dispatch => {
    dispatch(getFoods())

    try {
      const response = await callAPI(`${config.apiUrl}posx/foods`, null, "GET", authHeader())

      dispatch(getFoodsSuccess(response))
    } catch (error) {
      dispatch(getFoodsFailure())
    }
  }
}