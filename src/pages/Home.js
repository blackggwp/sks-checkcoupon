import React, { useEffect } from "react";
import { Content } from "../components/layout/Content";
import { useDispatch } from 'react-redux'
import { fetchCols } from '../slices/vouchers'

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Button from 'devextreme-react/button'
 
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCols())
  }, [])

  return (
    <Content>
      <Button
        text="Click me"
      />
    </Content>
  )
}
