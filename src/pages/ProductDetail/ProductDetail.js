import { Button, Card, Form, Input, List, Modal, Pagination, Rate } from 'antd';
import React, { useMemo } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductRoute } from '../../ultis/route';
import { Brand, ButtonContent, BuyButton, Com, Container, Content, Heading, Heading1, Info, Pagin, Photo, PhotoContainer, Price, Price1, Section, SubContent, SubHeading, SubSection } from './product-detail-styles'

const products = []

for (var i = 0; i < 150; i++) {
    const product = {
        id: `${i + 1}`,
        name: "iphone 14 pro max " + `${i + 1}`,
        price: 24000000,
        description: "6GB - 256GB",
        brand: "apple",
        quanity: 10,
        url: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/09/08/1111.png"
    }
    products.push(product)
}

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
    const id = params.id
    const [form] = Form.useForm()
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)

    const listComments = useMemo(() => {
        const num = (page - 1) * 10
        return comments.slice(num, num + 10)
    }, [page])

    const item = products.find(value => value.id === id)

    const handleFinish = values => {
        console.log("comment", values)
    }

    const handleOrder = () => {
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
        <Container>
            <Content>
                <Section>
                    <PhotoContainer>
                        <Photo src={item.url} />
                    </PhotoContainer>
                    <Info>
                        <Heading>{item.name}</Heading>
                        {item.quanity === 0 && <span style={{ color: "red", fontSize: "20px", fontWeight: "500" }}>Hết hàng</span>}
                        <SubHeading>{item.description}</SubHeading>
                        <Brand>{item.brand}</Brand>
                        <Price>{item.price} đ</Price>
                        <BuyButton onClick={() => setOpen(true)}>
                            <ButtonContent>Mua ngay</ButtonContent>
                            <SubContent>Giao hàng tận nơi hoặc nhận tại cửa hàng</SubContent>
                        </BuyButton>
                        <Modal
                            open={open}
                            okText="Hoàn tất đặt hàng"
                            cancelText="Hủy đặt hàng"
                            onCancel={() => setOpen(false)}
                            onOk={handleOrder}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                name="order_form"
                            >
                                <Form.Item
                                    name="orderName"
                                    label="Tên"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Hãy điền vào tên của bạn!"
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
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
                        dataSource={products.slice(0, 4)}
                        renderItem={item => (
                            <List.Item>
                                <Link key={item.id} to={getProductRoute(item.id)}>
                                    <Card
                                        hoverable
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        cover={<img alt='photo' src={item.url} style={{ width: '120px', paddingTop: '20px' }} />}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <h4>{item.name}</h4>
                                            <Price1>{item.price} đ</Price1>
                                        </div>
                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </SubSection>
                <SubSection>
                    <Heading1>Đánh giá sản phẩm</Heading1>
                    <Com>
                        <Form
                            name="comment"
                            layout="vertical"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={handleFinish}
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
        </Container>
    )
}

export default ProductDetail