import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkContainer = styled(Link)`
    color: ${props => props.color};
    font-size: ${props => props.size ? props.size : "14px"};
    font-weight: 700; 
    text-decoration: none;
`

const MyLink = ({ name, path, color, size }) => {
  return (
    <LinkContainer to={path} color={color} size={size}>
        {name}
    </LinkContainer>
  )
}

export default MyLink