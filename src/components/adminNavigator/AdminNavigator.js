import React from 'react'
import { ConstanthPaths } from '../../constants/constants'
import MyLink from '../Link/Link'
import { Container, NavContainer } from './admin-navigator-styles'

const AdminNavigator = () => {
    return (
        <NavContainer>
            <Container>
                <MyLink name="Sản phẩm" path={ConstanthPaths.ADMIN_PRODUCT} color="#fff" size="20px" />
                <MyLink name="Hãng sản xuất" path={ConstanthPaths.ADMIN_BRAND} color="#fff" size="20px" />
                <MyLink name="Người dùng" path={ConstanthPaths.ADMIN_USER} color="#fff" size="20px" />
                <MyLink name="Bình luận" path={ConstanthPaths.ADMIN_COMMENT} color="#fff" size="20px" />
                <MyLink name="Đơn hàng" path={ConstanthPaths.ADMIN_ORDER} color="#fff" size="20px" />
            </Container>
        </NavContainer>
    )
}

export default AdminNavigator