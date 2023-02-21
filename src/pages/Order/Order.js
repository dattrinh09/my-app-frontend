import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, List, Modal, Radio, Result } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../../components/layout/MainLayout'
import Loader from '../../components/Loader/Loader'
import { OrderStatus } from '../../constants/constants'
import { cancelOrder, getUserOrders } from '../../store/reducers/ordersSlice'
import { ordersSelector } from '../../store/selectors'
import { formatPrice } from '../../ultis/ulti'
import { Container, Content, Control, Info, Photo, PhotoContainer, Price, Section, Status, StatusTag, Title } from './order-styles'

const { confirm } = Modal

const Order = () => {
    const { userOrders } = useSelector(ordersSelector)
    const [status, setStatus] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("user_id")) {
            const userId = Number(localStorage.getItem("user_id"))
            dispatch(getUserOrders(userId))
            setIsLoading(false)
        }
    }, [dispatch])

    const listOrders = useMemo(() => {
        return userOrders.filter(item => item.status === status)
    }, [userOrders, status])

    const handleCancel = id => {
        confirm({
            title: "Hủy đơn hàng.",
            content: "Bạn muốn hủy đơn hàng này?",
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk() {
                dispatch(cancelOrder({ id: id, data: { status: 3 } }))
            }
        })
    }

    return (
        <MainLayout>
            <Container>
                {isLoading ? (
                    <Loader />
                ) : (
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
                        {listOrders.length === 0 ? (
                            <Result
                                status="error"
                                icon={<ShoppingCartOutlined />}
                                title={`Không có đơn hàng nào ${OrderStatus[status].title.toLowerCase()}.`}
                            />
                        ) : (
                            < List
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
                                                {item.status === 0 &&
                                                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleCancel(item.id)}>
                                                        Hủy đơn hàng
                                                    </Button>
                                                }
                                            </Status>
                                        </Section>
                                    </List.Item>
                                )}
                            />
                        )}
                    </Content>
                )}
            </Container>
        </MainLayout>
    )
}

export default Order