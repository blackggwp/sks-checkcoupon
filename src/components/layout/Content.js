import React from 'react'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { loggingOut } from '../../slices/users'

export function Content(props) {
  const dispatch = useDispatch();
  const { Header, Footer, Content: Body } = Layout;

  const logout = () => {
    dispatch(loggingOut())
  }

  return (
    <Layout className="layout" style={{ maxWidth: 'none', padding: 0 }}>
      <Header>
        <div className="logo" />
        <h1 style={{ color: 'salmon' }}>Sukishi Voucher</h1>
        <Button
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={logout}
          variant="contained" color="secondary">
          Logout
    </Button>
      </Header>
      <Body style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>{props.children}</Body>
      <Footer style={{ textAlign: 'center' }}>Sukishi ©2020</Footer>
    </Layout >
  )
}
