import React from 'react'
import { Container } from "reactstrap";

// import styled from "styled-components";

export const Content = (props) => (
    <Container className="themed-container" fluid={true}>{props.children}</Container>
  )