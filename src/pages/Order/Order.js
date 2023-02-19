import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, List, Radio, Result } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout'
import { ConstanthPaths, OrderStatus } from '../../constants/constants'
import { getUserOrders } from '../../store/reducers/ordersSlice'
import { ordersSelector } from '../../store/selectors'
import { formatPrice } from '../../ultis/ulti'
import { Container, Content, Control, Info, Photo, PhotoContainer, Price, Section, Status, StatusTag, Title } from './order-styles'

const Order = () => {
    const { userOrders } = useSelector(ordersSelector)
    const [status, setStatus] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("user_id")) {
            const userId = Number(localStorage.getItem("user_id"))
            dispatch(getUserOrders(userId))
        }
    }, [dispatch])

    const listOrders = useMemo(() => {
        return userOrders.filter(item => item.status === status)
    }, [userOrders, status])

    return (
        <MainLayout>
            <Container>
                {userOrders.length !== 0 ? (
                    <Content>
                        <h3>Lịch sử mua hàng</h3>
                        <Control>
                            <Radio.Group
                                value={status}
                                buttonStyle="solid"
                                size="large"
                                onChange={e => setStatus(e.target.value)}
                            >
                                {OrderStatus.map(item => (
                                    <Radio.Button key={item.key} value={item.value}>
                                        {item.title}
                                    </Radio.Button>
                                ))}
                            </Radio.Group>
                        </Control>
                        {listOrders.length !== 0 ? (
                            <List
                                size="large"
                                bordered
                                dataSource={listOrders}
                                renderItem={item => (
                                    <List.Item style={{ backgroundColor: "#fff" }}>
                                        <Section key={item.id}>
                                            <PhotoContainer>
                                                <Photo src={item.product.url} alt="phone" />
                                            </PhotoContainer>
                                            <Info>
                                                <Title>{item.product.product_name}</Title>
                                                <div>Số điện thoại: {item.phone_number}</div>
                                                <div>Địa chỉ nhận hàng: {item.address}</div>
                                            </Info>
                                            <Price>{formatPrice(item.total)}</Price>
                                            <Status>
                                                <StatusTag color={OrderStatus[item.status].color}>
                                                    {OrderStatus[item.status].title}
                                                </StatusTag>
                                            </Status>
                                        </Section>
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <Result
                                status="error"
                                icon={<ShoppingCartOutlined />}
                                title={`Không có đơn hàng nào ${OrderStatus[status].title.toLowerCase()}.`}
                            />
                        )}
                    </Content>
                ) : (
                    <Result
                        status="error"
                        icon={<ShoppingCartOutlined />}
                        title="Lịch sử mua hàng không có đơn hàng nào!"
                        extra={
                            <Link to={ConstanthPaths.HOME_PAGE}>
                                <Button type="primary" danger size="large" >Trở về trang chủ</Button>
                            </Link>
                        }
                    />
                )}
            </Container>
        </MainLayout>
    )
}

export default Order