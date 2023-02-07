import { Menu, MenuItem } from '@mui/material';
import { Input } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConstanthPaths } from '../../constants/constants'
import MyLink from '../Link/Link'
import { Container, HeaderLayout, Item, UserMenu, } from './header-styles';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("isAdmin")
        setAnchorEl(null)
    }

    const handleOrder = () => {
        navigate(ConstanthPaths.PRODUCT_LIST)
        setAnchorEl(null)
    }

    const handleAdmin = () => {
        navigate(ConstanthPaths.ADMIN_PRODUCT)
        setAnchorEl(null)
    }

    return (
        <HeaderLayout>
            <Container>
                <Item>
                    <MyLink name="CellPhone" path={ConstanthPaths.HOME_PAGE} color="#333" size="20px" />
                </Item>
                <Item>
                    <Input.Search
                        placeholder="Tìm kiếm theo tên sản phẩm ..."
                        enterButton="Tìm kiếm"
                        size="large"
                    />
                </Item>
                <Item>
                    {!localStorage.getItem("token")
                        ? (
                            <MyLink name="Đăng nhập" path={ConstanthPaths.SIGN_IN} color="#333" size="20px" />
                        ) : (
                            <>
                                <UserMenu onClick={e => setAnchorEl(e.currentTarget)}>{localStorage.getItem("userName")}</UserMenu>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    {localStorage.getItem("isAdmin") === "1" ? (
                                        <MenuItem onClick={handleAdmin}>Trang quản lý</MenuItem>
                                    ) : (
                                        <MenuItem onClick={handleOrder}>Lịch sử mua hàng</MenuItem>
                                    )}
                                    <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
                                </Menu>
                            </>
                        )
                    }
                </Item>
            </Container >
        </HeaderLayout >
    )
}

export default Header