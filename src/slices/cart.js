import { createSlice } from "@reduxjs/toolkit";
import { callAPI } from "../helpers";
import config from "../config";

export const initialState = {
  items: [],
  hasItem: false,
  userID: "",
  postError: false,
  totalPrice: 0,
  totalQty: 0,
  loading: false,
  hasErrors: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      //check existing item
      const addedItem = state.items.find(
        (item) => item.rowid === payload.rowid
      )

      if (addedItem !== undefined) {
        console.log("existing");
        state.items.find((item) => item.rowid === payload.rowid).qty += 1;
        // state.totalPrice += payload.fprice;
        // state.totalQty += 1;


      } else {
        console.log("not existing");
        state.items = [...state.items, payload]
        // state.totalPrice += payload.fprice;
        // state.totalQty += 1;
      }
    },
    saveUserID: (state, { payload }) => {
      state.userID = payload;
    },
    postOrderlog: (state, { payload }) => {
      const url = `${config.apiUrl}posx/foods/order`;
      payload.map((row) => {
        const userLocal = JSON.parse(localStorage.getItem("userInfo")).username
        const { fcode, fname, username = userLocal } = row;
        const systemdate = new Date(Date.now()).toISOString();
        let subset = JSON.stringify({ fcode, fname, username, order_status: 'checkout', systemdate});
        return callAPI(url, subset);
      });
    },
    increment: (state, { payload }) => {
      state.items.find(
        (item) => item.rowid === payload.rowid
        ).qty += 1
      // state.totalPrice += payload.fprice
      // state.totalQty += 1
    },
    decrement: (state, { payload }) => {
      try {
        state.items.find(
          (item) => item.rowid === payload.rowid && item.qty > 1).qty -= 1
      } catch (error) {
        const idx = state.items.findIndex((item) => item.rowid === payload.rowid)
        state.items.splice(idx, 1);
      }
      
      // state.totalPrice -= payload.fprice;
      // state.totalQty -= 1;

      // if(payload.qty === 1) {
        // console.log(payload)
        // const index = state.items.findIndex(x => x.rowid === payload.rowid);
        // state.items.splice(index, 1);
      // }
    },
    clearItem: (state) => {
      state.items = []
    },
    fetchingCart: (state) => {
      state.loading = true;
    },
    fetchCartSuccess: (state, { payload }) => {
      state.loading = false
      state.hasErrors = false
      state.items = payload
    },
    fetchCartFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    postItemToDB: (state, { payload }) => {
      console.log(payload)
        
    },
    postItemDBSuccess: (state, {payload}) => {
      state.loading = false
      state.hasErrors = false
      state.items = [...state.items, payload]
    },
    postItemDBFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    delItemDBSuccess: (state, {payload}) => {
      state.loading = false
      state.hasErrors = false
      const idx = state.items.findIndex(ele => ele.rowid === payload.rowid)
      console.log(idx)
      state.items.splice(idx, 1);
    },
    delItemDBFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  increment,
  decrement,
  totalPrice,
  totalQty,
  postOrderlog,
  addItemToCart,
  saveUserID,
  clearItem,
  fetchingCart,
  fetchCartSuccess,
  fetchCartFailure,
  postItemToDB,
  postingItemDB,
  postItemDBSuccess,
  postItemDBFailure,
  delItemDBSuccess,
  delItemDBFailure,
} = cartSlice.actions;
export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;

export function addItemToDB(row) {
  return async (dispatch) => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")).username
    const systemdate = new Date(Date.now()).toISOString();
    let data = JSON.stringify({ ...row, username: userLocal, order_status: 'cart', systemdate: systemdate, qty: 1});
    // console.log(data)
    try {
      const response = await callAPI(`${config.apiUrl}posx/foods/order`, data)
      console.log(response)
      response ?
        dispatch(addItemToCart(response.response)) :
        // dispatch(postItemDBSuccess(response.response)) :
        dispatch(postItemDBFailure());

    } catch (error) {
      console.log("Add Item Error ", error);
      dispatch(postItemDBFailure());
    }
  };
}

export function decrementItemInDB(row) {
  return async (dispatch) => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")).username
    const systemdate = new Date(Date.now()).toISOString()
    let data = JSON.stringify({ ...row, username: userLocal, order_status: 'cart', systemdate: systemdate, qty: 1});
    // console.log(data)
    try {
      const response = await callAPI(`${config.apiUrl}posx/foods/order/decrement`, data)
      console.log(response)
      response ?
        dispatch(decrement(response.response)) :
        // dispatch(postItemDBSuccess(response.response)) :
        dispatch(postItemDBFailure())

    } catch (error) {
      console.log("DecrementItem Error ", error)
      dispatch(postItemDBFailure())
    }
  }
}

export function fetchCartDB() {
  return async (dispatch) => {
    dispatch(fetchingCart());

      const data = {
        username: JSON.parse(localStorage.getItem("userInfo")).username,
        order_status: 'order'
      }
    try {
      const response = await callAPI(`${config.apiUrl}posx/cart/${data.username}`, null, 'GET')
      // console.log(response)
      response ?
        dispatch(fetchCartSuccess(response)) :
        dispatch(fetchCartFailure())
    } catch (error) {
      console.log("fetchCart Error ", error);
      dispatch(fetchCartFailure());
    }
  };
}

export function delItemInCartDB(item) {
  console.log(item)
  return async (dispatch) => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")).username
    const systemdate = new Date(Date.now()).toISOString()
    let data = JSON.stringify({ ...item, username: userLocal, order_status: 'cart', systemdate: systemdate, qty: 1});
    // console.log(data)
    try {
      const response = await callAPI(`${config.apiUrl}posx/foods/order/delete/${item.rowid}`, data, 'DELETE')
      // console.log(response)
      response ?
        dispatch(delItemDBSuccess(response.response)) :
        dispatch(delItemDBFailure())

    } catch (error) {
      console.log("Delete Item Error ", error)
      dispatch(delItemDBFailure())
    }
  }
}
