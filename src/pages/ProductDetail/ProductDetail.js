import { Button, Card, Form, Input, List, Modal, Pagination, Rate, Spin } from 'antd';
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigator from '../../components/navigator/Navigator';
import { getProducts } from '../../store/reducers/productsSlice';
import { productsSelector } from '../../store/selectors';
import { getProducRoute, getProductByBrandRoute } from '../../ultis/route';
import { formatPrice } from '../../ultis/ulti';
import { Brand, ButtonContent, BuyButton, Com, Container, Content, Heading, Heading1, Info, Loader, Pagin, Photo, PhotoContainer, Price, Price1, Section, SubContent, SubHeading, SubSection } from './product-detail-styles'

const comments = []

for (var j = 0; j < 100; j++) {
    const cmt = {
        id: `${j + 1}`,
        user: {
            id: `u-${j + 1}`,
            name: `user-${j + 1}`
        },
        content: "abcdefghijklmno",
        rate: 2.5
    }
    comments.push(cmt)
}

const ProductDetail = () => {
    const params = useParams()
    const { products } = useSelector(productsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const productName = useMemo(() => {
        return params.product_name
    }, [params])

    const selectedProduct = useMemo(() => {
        return products.find(item => item.product_name.replaceAll(" ", "-") === productName)
    }, [products, productName])

    const relatedProducts = useMemo(() => {
        return selectedProduct ? products.filter(item =>
            item.brand.brand_name === selectedProduct.brand.brand_name
            && item.product_name !== selectedProduct.product_name
        ).slice(0, 4) : null
    }, [selectedProduct, products])

    // Đặt hàng
    const [form] = Form.useForm()
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)

    const listComments = useMemo(() => {
        const num = (page - 1) * 10
        return comments.slice(num, num + 10)
    }, [page])

    const handleSubmitComment = values => {
        console.log("comment", values)
    }

    const handleOrder = () => {
        if (localStorage.getItem('token')) {
            setOpen(true)
        } else {
            alert("Bạn chưa đăng nhập. Vui lòng đăng nhập!")
        }
    }

    const handleSubmitOrder = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields()
                console.log("order", values)
                setOpen(false)
            })
            .catch(info => {
                console.log("Validate Failed: ", info)
            })
    }

    return (
        <>
            <Header />
            <Navigator />
            <Container>
                {!selectedProduct ?
                    (
                        <Loader>
                            <Spin size="large" />
                        </Loader>
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
                                                    cover={<img alt='photo' src={item.url} style={{ width: '120px', paddingTop: '20px' }} />}
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
                            <SubSection>
                                <Heading1>Đánh giá sản phẩm</Heading1>
                                {localStorage.getItem('token') &&
                                    <Com>
                                        <Form
                                            name="comment"
                                            layout="vertical"
                                            initialValues={{
                                                remember: true,
                                            }}
                                            onFinish={handleSubmitComment}
                                        >
                                            <Form.Item
                                                name="content"
                                                label="Bình luận"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Hãy nhập bình luận của bạn!',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea
                                                    allowClear
                                                    showCount
                                                    maxLength={1000}
                                                    placeholder="Bình luận ..."
                                                    autoSize={{ minRows: 2 }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="rate"
                                                label="Đánh giá"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Hãy nhập đánh giá của bạn!',
                                                    },
                                                ]}
                                            >
                                                <Rate allowHalf />
                                            </Form.Item>
                                            <div>
                                                <Button
                                                    type='primary'
                                                    htmlType="submit"
                                                    style={{ marginTop: "20px" }}
                                                >
                                                    Nhập bình luận
                                                </Button>
                                            </div>
                                        </Form>
                                    </Com>
                                }
                                <List
                                    itemLayout="horizontal"
                                    dataSource={listComments}
                                    size="large"
                                    renderItem={item => (
                                        <List.Item key={item.id}>
                                            <List.Item.Meta
                                                title={item.user.name}
                                                description={item.content}
                                            />
                                            <Rate allowHalf value={item.rate} />
                                        </List.Item>
                                    )}>
                                </List>
                                <Pagin>
                                    <Pagination
                                        total={comments.length}
                                        pageSize={10}
                                        defaultCurrent={page}
                                        showSizeChanger={false}
                                        onChange={p => setPage(p)}
                                    />
                                </Pagin>
                            </SubSection>
                        </Content>
                    )}
            </Container>
        </>
    )
}

export default ProductDetail