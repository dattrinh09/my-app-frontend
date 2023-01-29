import React from 'react'
import MyLink from '../Link/Link'
import { Container, NavContainer } from './naviagtor-styles'

const Navigator = () => {
  return (
    <NavContainer>
        <Container>
            <MyLink name="Trang chủ" color="#fff" size="20px" />
            <MyLink name="Hãng sản xuất" color="#fff" size="20px" />
            <MyLink name="Giá" color="#fff" size="20px" />
        </Container>
    </NavContainer>
  )
}

export default Navigator