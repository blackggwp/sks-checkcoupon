import React from "react";
import CategoryList from "../components/CategoryList";
import FoodList from "../components/FoodList";
import { Content } from "../components/layout/Content";
import Cart from "../components/Cart";
import { useSelector } from 'react-redux'
import { cartSelector } from '../slices/cart'

export default function Home() {
  const { loading } = useSelector(cartSelector)

  return (
    <Content>
      <div style={{ display: 'none' }}>
        <Cart />
      </div>
      {loading ? 
      <img src={process.env.PUBLIC_URL + '/images/loading.gif'}
      alt="loadingPic"
      // style={{ position: 'relative', right: '50%', top: '50%'}}
      /> :
      <div>
      <div>
        <CategoryList />
      </div>
      <div>
        <FoodList />
      </div>
      </div>}
    </Content>
  )
}
