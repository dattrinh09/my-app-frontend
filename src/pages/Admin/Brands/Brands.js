import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../../components/layout/AdminLayout'
import { addBrand, deleteBrand, getBrands, updateBrand } from '../../../store/reducers/brandsSlice'
import { brandsSelector } from '../../../store/selectors'
import { AddButton, Container, Content } from './brands-styles'

const { confirm } = Modal

const Brands = () => {
    // Lấy dữ liệu
    const { brands } = useSelector(brandsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBrands())
    }, [dispatch])

    const data = brands.map(value => ({
        key: value.id,
        id: value.id,
        brand_name: value.brand_name
    }))

    // Thêm mới
    const [open, setOpen] = useState(false)
    const [addForm] = Form.useForm()

    const handleAdd = () => {
        addForm
            .validateFields()
            .then(values => {
                addForm.resetFields()
                dispatch(addBrand(values))
                setOpen(false)
            })
            .catch(info => {
                console.log("Validate Failed: ", info)
            })
    }

    // Chỉnh sửa
    const [selected, setSelected] = useState()
    const [editForm] = Form.useForm()

    const handleEdit = (value) => {
        editForm.setFieldsValue({
            brand_name: value.brand_name
        })
        setSelected(value)
    }

    const handleUpdate = () => {
        editForm
            .validateFields()
            .then(values => {
                editForm.resetFields()
                dispatch(updateBrand({ id: selected.id, data: values }))
                setSelected()
            })
            .catch(info => {
                console.log("Validate Failed: ", info)
            })
    }

    // Xóa
    const handleDelete = (id) => {
        confirm({
            content: "Bạn muốn xóa hãng sản xuất này khỏi cơ sở dữ liệu? Bạn sẽ xóa luôn những sản phẩm thuộc hãng này!",
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk() {
                dispatch(deleteBrand(id))
            }
        })
    }

    // Hiện thị
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên',
            dataIndex: 'brand_name',
            key: 'brand_name',
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (item) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(item)} >Sửa</Button>
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(item.id)}>Xóa</Button>
                </Space>
            )
        }
    ]

    return (
        <AdminLayout>
            <Container>
                <Content>
                    <h2>Hãng sản xuất</h2>
                    <AddButton>
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusCircleOutlined />}
                            onClick={() => setOpen(true)}
                        >
                            Thêm hãng sản xuất
                        </Button>
                    </AddButton>
                    <Modal
                        title="Thêm mới hãng sản xuất"
                        open={open}
                        okText="Thêm mới"
                        cancelText="Hủy"
                        onCancel={() => setOpen(false)}
                        onOk={handleAdd}
                    >
                        <Form
                            form={addForm}
                            layout="vertical"
                            name="add_form"
                        >
                            <Form.Item
                                name="brand_name"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: "Hãy điền tên của hãng sản xuất!"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Table columns={columns} dataSource={data} tableLayout="fixed" />
                    <Modal
                        title="Chỉnh sửa thông tin hãng sản xuất"
                        open={!!selected}
                        okText="Cập nhận"
                        cancelText="Hủy"
                        onCancel={() => setSelected()}
                        onOk={handleUpdate}
                    >
                        <Form
                            form={editForm}
                            layout="vertical"
                            name="edit_form"
                        >
                            <Form.Item
                                name="brand_name"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: "Hãy điền tên của hãng sản xuất!"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
            </Container>
        </AdminLayout>
    )
}

export default Brands