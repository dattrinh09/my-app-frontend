import { DeleteOutlined } from '@ant-design/icons'
import { Button, Modal, Space, Table } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../../components/layout/AdminLayout'
import { deleteOrder, getAllOrders } from '../../../store/reducers/ordersSlice'
import { ordersSelector } from '../../../store/selectors'
import { formatDate, formatPrice } from '../../../ultis/ulti'
import { Container, Content, ProductImg } from './orders-styles'

const { confirm } = Modal

const Orders = () => {
  const { orders } = useSelector(ordersSelector)
  const dispatch = useDispatch()

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
    order_time: formatDate(value.order_time)
  }))

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
      title: "Giá",
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
      title: "Hành động",
      key: "actions",
      render: ({ id }) => (
        <Space size="middle">
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(id)}>Xóa</Button>
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
        </Content>
      </Container>
    </AdminLayout>
  )
}

export default Orders