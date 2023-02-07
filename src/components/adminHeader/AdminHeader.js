import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ConstanthPaths } from '../../constants/constants'
import MyLink from '../Link/Link'
import { Container, Item } from './admin-header-styles'

const AdminHeader = () => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("isAdmin")
    navigate(ConstanthPaths.HOME_PAGE)
  }

  return (
    <Container>
      <MyLink name="CellPhone" path={ConstanthPaths.HOME_PAGE} color="#333" size="20px" />
      <Item>Admin</Item>
      <Item onClick={handleSignOut}>Đăng xuất</Item>
    </Container>
  )
}

export default AdminHeader