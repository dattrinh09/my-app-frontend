import { Card, Form, Input, List, Modal } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Loader from '../../components/Loader/Loader';
import { createOrder } from '../../store/reducers/ordersSlice';
import { getProductByName, getProducts } from '../../store/reducers/productsSlice';
import { productsSelector } from '../../store/selectors';
import { showNotification } from '../../ultis/notification';
import { getProducRoute, getProductByBrandRoute } from '../../ultis/route';
import { formatPrice } from '../../ultis/ulti';
import { Brand, ButtonContent, BuyButton, Container, Content, Heading, Heading1, Info, Photo, PhotoContainer, Price, Price1, Section, SubContent, SubHeading, SubSection } from './product-detail-styles'

const ProductDetail = () => {
    const params = useParams()
    const { products, selectedProduct } = useSelector(productsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
        if(params.product_name) {
            const productName = params.product_name.replaceAll("-", " ")
            dispatch(getProductByName(productName))
        }
    }, [dispatch, params])

    const relatedProducts = useMemo(() => {
        return selectedProduct ? products.filter(item =>
            item.brand.brand_name === selectedProduct.brand.brand_name
            && item.product_name !== selectedProduct.product_name
        ).slice(0, 4) : null
    }, [selectedProduct, products])

    // Đặt hàng
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)

    const handleOrder = () => {
        if (localStorage.getItem("token")) {
            setOpen(true)
        } else {
            showNotification("error", "Bạn chưa đăng nhập!", "Vui lòng đăng nhập trước khi mua hàng.")
        }
    }

    const handleSubmitOrder = () => {
        form
            .validateFields()
            .then(async values => {
                form.resetFields()
                const newOrder = {
                    user_id: Number(localStorage.getItem("user_id")),
                    product_id: selectedProduct.id,
                    phone_number: values.orderPhone,
                    address: values.orderAddress,
                }
                dispatch(createOrder(newOrder))
                setOpen(false)
            })
            .catch(info => {
                console.log("Validate Failed: ", info)
            })
    }

    return (
        <MainLayout>
            <Container>
                {!selectedProduct ?
                    (
                        <Loader />
                    ) : (
                        <Content>
                            <Section>
                                <PhotoContainer>
                                    <Photo src={selectedProduct.url} />
                                </PhotoContainer>
                                <Info>
                                    <Heading>{selectedProduct.product_name}</Heading>
                                    {selectedProduct.in_stock === 0 && <span style={{ color: "red", fontSize: "20px", fontWeight: "500" }}>Hết hàng</span>}
                                    <SubHeading>{selectedProduct.description}</SubHeading>
                                    <Link to={getProductByBrandRoute(selectedProduct.brand.brand_name)} style={{ textDecoration: "none" }}>
                                        <Brand>{selectedProduct.brand.brand_name}</Brand>
                                    </Link>
                                    <Price>{formatPrice(selectedProduct.price)}</Price>
                                    <BuyButton onClick={handleOrder} disabled={selectedProduct.in_stock === 0}>
                                        <ButtonContent>Mua ngay</ButtonContent>
                                        <SubContent>Giao hàng tận nơi hoặc nhận tại cửa hàng</SubContent>
                                    </BuyButton>
                                    <Modal
                                        open={open}
                                        okText="Hoàn tất đặt hàng"
                                        cancelText="Hủy đặt hàng"
                                        onCancel={() => setOpen(false)}
                                        onOk={handleSubmitOrder}
                                    >
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            name="order_form"
                                        >
                                            <Form.Item
                                                name="orderPhone"
                                                label="Số điện thoại"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Hãy điền vào số điện thoại của bạn!"
                                                    }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name="orderAddress"
                                                label="Địa chỉ"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Hãy điền vào địa chỉ của bạn!"
                                                    }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Form>
                                    </Modal>
                                </Info>
                            </Section>
                            <SubSection>
                                <Heading1>Sản phẩm tương tự</Heading1>
                                <List
                                    grid={{ column: 4 }}
                                    dataSource={relatedProducts}
                                    renderItem={item => (
                                        <List.Item>
                                            <Link key={item.id} to={getProducRoute(item.product_name)}>
                                                <Card
                                                    hoverable
                                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '300px' }}
                                                    cover={<img alt='phone' src={item.url} style={{ width: '120px', paddingTop: '20px' }} />}
                                                >
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <h4>{item.product_name}</h4>
                                                        <Price1>{formatPrice(item.price)}</Price1>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </List.Item>
                                    )}
                                />
                            </SubSection>
                        </Content>
                    )}
            </Container>
        </MainLayout>
    )
}

export default ProductDetail