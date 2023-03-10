import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Modal, Radio, Select, Space, Table, Tag } from 'antd'
import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../../components/layout/AdminLayout'
import Loader from '../../../components/Loader/Loader'
import { OrderStatus } from '../../../constants/constants'
import { deleteOrder, getOrders, updateOrder } from '../../../store/reducers/ordersSlice'
import { ordersSelector } from '../../../store/selectors'
import { formatDate, formatPrice } from '../../../ultis/ulti'
import { Container, Content, Control, ProductImg } from './orders-styles'

const { confirm } = Modal

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { orders } = useSelector(ordersSelector)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState()
  const [editForm] = Form.useForm()
  const [status, setStatus] = useState(4)

  useEffect(() => {
    dispatch(getOrders())
    setIsLoading(false)
  }, [dispatch])

  const data = useMemo(() => {
    const list = status === 4 ? orders : orders.filter(item => item.status === status)
    return list.map(value => ({
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
  }, [orders, status])

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
        dispatch(updateOrder({ id: selected.id, data: { status: data.value } }))
        setSelected()
      })
      .catch(info => {
        console.log("Validate Failed: ", info)
      })
  }

  const handleDelete = (id) => {
    confirm({
      title: "B???n mu???n x??a ????n h??ng n??y?",
      content: "S??? l?????ng s???n ph???m t????ng ???ng s??? ???????c kh??i ph???c!",
      okText: "?????ng ??",
      cancelText: "H???y",
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
      title: "Ng?????i mua",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "S???n ph???m",
      dataIndex: "product_name",
      key: "product_name"
    },
    {
      title: "???nh",
      dataIndex: "url",
      key: "url",
      render: (url) => <ProductImg src={url} />
    },
    {
      title: "Gi?? ti???n",
      dataIndex: "total",
      key: "total"
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "?????a ch???",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Th???i gian",
      dataIndex: "order_time",
      key: "order_time",
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag size="" color={OrderStatus[status].color}>{OrderStatus[status].title}</Tag>
    },
    {
      title: "H??nh ?????ng",
      key: "actions",
      render: (item) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(item)}>C???p nh???t</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(item.id)}>X??a</Button>
        </Space>
      )
    }
  ]

  return (
    <AdminLayout>
      <Container>
        <Content>
          <h2>????n h??ng</h2>
          <Control>
            <Radio.Group
              value={status}
              buttonStyle="solid"
              size="large"
              onChange={e => setStatus(e.target.value)}
            >
              <Radio.Button value={4}>T???t c???</Radio.Button>
              {OrderStatus.map(item => (
                <Radio.Button key={item.key} value={item.value}>
                  {item.title}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Control>
          {isLoading ? <Loader /> : <Table columns={columns} dataSource={data} />}
          <Modal
            title="C???p nh???t tr???ng th??i ????n h??ng"
            open={!!selected}
            okText="C???p nh???t"
            cancelText="H???y"
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
                label="Tr???ng th??i"
                rules={[
                  {
                    required: true,
                    message: "H??y l???a ch???n tr???ng th??i c???a ????n h??ng!"
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