import { Form, Input, Modal, Select } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../../store/reducers/brandsSlice'
import { addProduct } from '../../../store/reducers/productsSlice'
import { brandsSelector } from '../../../store/selectors'

const AddForm = ({open, handleClose}) => {
    const brandsStore = useSelector(brandsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBrands())
    }, [dispatch])

    const [addForm] = Form.useForm()

    const handleAdd = () => {
        addForm
            .validateFields()
            .then(values => {
                addForm.resetFields()
                const newProduct = {
                    ...values,
                    price: Number(values.price),
                    in_stock: Number(values.in_stock)
                }
                dispatch(addProduct(newProduct))
                handleClose()
            })
            .catch(info => {
                console.log("Validate Failed: ", info)
            })
    }

    return (
        <Modal
            title="Thêm sản phẩm"
            open={open}
            okText="Thêm mới"
            cancelText="Hủy"
            onCancel={handleClose}
            onOk={handleAdd}
        >
            <Form
                form={addForm}
                layout="vertical"
                name="add_form"
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
                    name="brand_name"
                    label="Hãng sản xuất"
                    rules={[
                        {
                            required: true,
                            message: "Hãy điền số lượng của sản phẩm!"
                        }
                    ]}
                >
                    <Select
                        allowClear
                    >
                        {brandsStore.brands.map(item => (
                            <Select.Option key={item.id} value={item.brand_name}>{item.brand_name}</Select.Option>
                        ))}
                    </Select>
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

export default AddForm