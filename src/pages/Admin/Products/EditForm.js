import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../../../store/reducers/productsSlice'

const EditForm = ({ product, handleClose }) => {
    const dispatch = useDispatch()
    const [editForm] = Form.useForm()

    useEffect(() => {
        editForm.setFieldsValue({
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            in_stock: product.in_stock,
            url: product.url
        })
    }, [product])

    const handleUpdate = () => {
        editForm
            .validateFields()
            .then(values => {
                editForm.resetFields()
                const newProduct = {
                    ...values,
                    price: Number(values.price),
                    in_stock: Number(values.in_stock)
                }
                dispatch(updateProduct({id: product.id, data: newProduct}))
                handleClose()
            })
            .catch(info => {
                console.log("Validate Failed: ", info)
            })
    }

    return (
        <Modal
            title="Chỉnh sửa thông tin sản phẩm"
            open={!!product.id}
            okText="Cập nhật"
            cancelText="Hủy"
            onCancel={handleClose}
            onOk={handleUpdate}
        >
            <Form
                form={editForm}
                layout="vertical"
                name="edit_form"
            >
                <Form.Item
                    name="product_name"
                    label="Tên"
                    rules={[
                        {
                            required: true,
                            message: "Hãy điền tên của sản phẩm!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[
                        {
                            required: true,
                            message: "Hãy điền mô tả của sản phẩm!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[
                        {
                            required: true,
                            message: "Hãy điền giá của sản phẩm!"
                        }
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="in_stock"
                    label="Số lượng"
                    rules={[
                        {
                            required: true,
                            message: "Hãy điền số lượng của sản phẩm!"
                        }
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="url"
                    label="Link ảnh"
                    rules={[
                        {
                            required: true,
                            message: "Hãy điền link ảnh của sản phẩm!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditForm