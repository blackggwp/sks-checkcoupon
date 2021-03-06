import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import config from "../config";

export const initialState = {
  loading: false,
  hasErrors: false,
  userData: {},
  isLoggedIn: false,
  loginText: '',
  regisText: ''
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    postingData: (state) => {
      state.loading = true;
    },
    postRegisSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.regisText = payload.status
      state.isLoggedIn = true
      state.userData = payload.username
      const userInfo = {
        username: payload.username,
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('user_token', JSON.stringify(payload.user_token))
    },
    postRegisFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.regisText = 'Username has already!'
    },
    register: (state, { payload }) => {
      state.userItems.push(payload);
    },
    addItemToUser: (state, { payload }) => {
      state.userItems.push(payload);
    },
    loggingIn: (state) => {
      state.loading = true;
    },
    fetchLoginSuccess: (state, { payload }) => {
      state.loading = false
      state.hasErrors = false
      state.isLoggedIn = true
      state.userData = payload
      const userInfo = {
        username: payload.username,
      }
      // console.log(JSON.stringify(userInfo))
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('isLogin', 'true');
      // localStorage.setItem('user_token', JSON.stringify(payload.user_token))
    },
    fetchLoginFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    userPassMismatch: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.loginText = 'Username or Password mismatch!!.'
    },
    loggingOut: (state) => {
      state.loading = false
      state.hasErrors = false
      state.isLoggedIn = false
      state.userData = {}
      state.loginText = ''
      state.regisText = ''
      localStorage.clear()
    },
  },
});

export const {
  postingData,
  postRegisSuccess,
  postRegisFailure,
  addItemToUser,
  loggingIn,
  fetchLoginSuccess,
  fetchLoginFailure,
  userPassMismatch,
  loggingOut,
} = usersSlice.actions;
export const usersSelector = (state) => state.users;
export default usersSlice.reducer;

export function saveRegisterData(userData) {
  return async (dispatch) => {
    dispatch(postingData());
    try {
      // const response = await callAPI(`${config.apiUrl}posx/register`, postData);
      const response = await Axios(`${config.apiUrl}posx/register`, userData);
      // if (response.rowCount !== undefined && response.rowCount === 1)
      console.log(response)
      response ?
        dispatch(postRegisSuccess(response.data)) :
        dispatch(postRegisFailure())
    } catch (error) {
      console.log("postRegister Error ", error);
      dispatch(postRegisFailure());
    }
  };
}

export function fetchLogin(userData) {
  return async (dispatch) => {
    dispatch(loggingIn());
    const systemdate = new Date(Date.now()).toISOString();
    const userinfo = { ...userData, systemdate: systemdate }
    try {
      const response = await Axios.post(`${config.apiUrl}coupons/login`, userinfo)
      // console.log(response)
      response ?
        dispatch(fetchLoginSuccess(response.data.recordset[0])) :
        dispatch(userPassMismatch());
    } catch (error) {
      console.log("fetchLogin Error ", error);
      dispatch(fetchLoginFailure());
    }
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch(loggingOut());
  };
}