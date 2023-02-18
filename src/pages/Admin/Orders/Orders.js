import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Modal, Select, Space, Table, Tag } from 'antd'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../../components/layout/AdminLayout'
import { OrderStatus } from '../../../constants/constants'
import { deleteOrder, getAllOrders, updateOrder } from '../../../store/reducers/ordersSlice'
import { ordersSelector } from '../../../store/selectors'
import { formatDate, formatPrice } from '../../../ultis/ulti'
import { Container, Content, ProductImg } from './orders-styles'

const { confirm } = Modal

const Orders = () => {
  const { orders } = useSelector(ordersSelector)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState()
  const [editForm] = Form.useForm()

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  const data = orders.map(value => ({
    key: value.id,
    id: value.id,
    username: value.user.username,
    product_name: value.product.product_name,
    url: value.product.url,
    total: formatPrice(value.total),
    phone_number: value.phone_number,
    address: value.address,
    order_time: formatDate(value.order_time),
    status: value.status
  }))

  const handleEdit = (item) => {
    editForm.setFieldsValue({
      status: OrderStatus[item.status].title
    })
    setSelected(item)
  }

  const handleUpdate = () => {
    editForm
      .validateFields()
      .then(values => {
        editForm.resetFields()
        const data = OrderStatus.find(item => item.title === values.status)
        dispatch(updateOrder({id: selected.id, data: {status: data.value}}))
        setSelected()
      })
      .catch(info => {
        console.log("Validate Failed: ", info)
      })
  }

  const handleDelete = (id) => {
    confirm({
      content: "Bạn muốn xóa đơn hàng này khỏi cơ sở dữ liệu? Số lượng sản phẩm tương ứng sẽ được khôi phục!",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        dispatch(deleteOrder(id))
      }
    })
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Người mua",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Sản phẩm",
      dataIndex: "product_name",
      key: "product_name"
    },
    {
      title: "Ảnh",
      dataIndex: "url",
      key: "url",
      render: (url) => <ProductImg src={url} />
    },
    {
      title: "Giá tiền",
      dataIndex: "total",
      key: "total"
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thời gian",
      dataIndex: "order_time",
      key: "order_time",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag size="" color={OrderStatus[status].color}>{OrderStatus[status].title}</Tag>
    },
    {
      title: "Hành động",
      key: "actions",
      render: (item) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(item)}>Cập nhật</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(item.id)}>Xóa</Button>
        </Space>
      )
    }
  ]

  return (
    <AdminLayout>
      <Container>
        <Content>
          <h2>Đơn hàng</h2>
          <Table columns={columns} dataSource={data} />
          <Modal
            title="Cập nhật trạng thái đơn hàng"
            open={!!selected}
            okText="Cập nhật"
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
                name="status"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: "Hãy lựa chọn trạng thái của đơn hàng!"
                  }
                ]}
              >
                <Select
                  allowClear
                >
                  {OrderStatus.map(item => (
                    <Select.Option key={item.key} value={item.title}>{item.title}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Container>
    </AdminLayout>
  )
}

export default Orders