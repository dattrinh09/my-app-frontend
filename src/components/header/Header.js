import { Dropdown, Input } from 'antd';
import React from 'react'
import { ConstanthPaths } from '../../constanth/constanth.path'
import MyLink from '../Link/Link'
import { Container, HeaderButton, HeaderLayout, Item, Menu } from './header-styles';

const items = [
    {
        key: '1',
        label: '',
    }
]

const Header = () => {
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
                    <MyLink name="Đăng nhập" path={ConstanthPaths.SIGN_IN} color="#333" size="20px" />
                </Item>
            </Container >
        </HeaderLayout >
    )
}

export default Header