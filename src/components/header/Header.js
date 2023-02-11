import { Dropdown, Input } from 'antd';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConstanthPaths } from '../../constants/constants'
import { getProductBySearch } from '../../ultis/route';
import MyLink from '../Link/Link'
import { Container, HeaderLayout, Item, UserMenu, } from './header-styles';

const Header = () => {
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()

    const handleSearch = () => {
        setKeyword("")
        navigate(getProductBySearch(keyword))
    }

    const handleSignOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("isAdmin")
        navigate(ConstanthPaths.HOME_PAGE)
    }

    const items = [
        {
            key: '1',
            label: (
                <div onClick={handleSignOut}>Đăng xuất</div>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={localStorage.getItem("isAdmin") === "1" ? ConstanthPaths.ADMIN_PRODUCT : ConstanthPaths.PRODUCT_LIST}>
                    {localStorage.getItem("isAdmin") === "1" ? "Trang quản lý" : "Lịch sử mua hàng"}
                </Link>
            ),
        }
    ]

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
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onSearch={handleSearch}
                        onPressEnter={handleSearch}
                    />
                </Item>
                <Item>
                    {!localStorage.getItem("token")
                        ? (
                            <MyLink name="Đăng nhập" path={ConstanthPaths.SIGN_IN} color="#333" size="20px" />
                        ) : (
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                trigger={["click"]}
                                placement="bottomRight"
                                arrow
                            >
                                <UserMenu>
                                    {localStorage.getItem("userName")}
                                </UserMenu>
                            </Dropdown>
                        )}
                </Item>
            </Container >
        </HeaderLayout >
    )
}

export default Header