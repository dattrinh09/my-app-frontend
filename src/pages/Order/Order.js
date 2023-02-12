import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout'
import { ConstanthPaths } from '../../constants/constants'
import { Container } from './order-styles'

const Order = () => {
    return (
        <MainLayout>
            <Container>
                <Result
                    status="info"
                    title="Lịch sử mua hàng không có đơn hàng nào!"
                    extra={[
                        <Link to={ConstanthPaths.HOME_PAGE}>
                            <Button type="primary">Trở về trang chủ</Button>
                        </Link>
                    ]}
                />
            </Container>
        </MainLayout>
    )
}

export default Order