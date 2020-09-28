import React from 'react'
// import styled from "styled-components";
// import { Container } from "reactstrap";
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';


export function Content(props) {
  const { Header, Footer, Content: Body } = Layout;

  return (
    // <Container className="themed-container" fluid={true}>{props.children}</Container>
    <Layout className="layout" style={{ maxWidth: 'none', padding: 0 }}>
      <Header>
        <div className="logo" />
        <h1 style={{ color: 'salmon' }}>Sukishi Voucher</h1>
      </Header>
      <Body style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>{props.children}</Body>
      <Footer style={{ textAlign: 'center' }}>Sukishi ©2020</Footer>
    </Layout >
  )
}
