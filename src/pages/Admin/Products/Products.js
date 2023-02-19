import { Button, Space, Table, Tag, Input, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import { AddButton, Container, Content, ProductImg } from './products-styles'
import AddForm from './AddForm'
import EditForm from './EditForm'
import { useDispatch, useSelector } from 'react-redux'
import { productsSelector } from '../../../store/selectors'
import { deleteProduct, getProducts } from '../../../store/reducers/productsSlice'
import { formatPrice } from '../../../ultis/ulti'
import AdminLayout from '../../../components/layout/AdminLayout'
import { useMemo } from 'react'

const { confirm } = Modal

const Products = () => {
  // Lấy danh sách sản phẩm
  const { products } = useSelector(productsSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const data = useMemo(() => {
    return products.map(value => ({
      key: value.id,
      id: value.id,
      product_name: value.product_name,
      price: value.price,
      in_stock: value.in_stock,
      brand_name: value.brand.brand_name,
      description: value.description,
      url: value.url
    }))
  }, [products])

  // Thêm sản phẩm
  const [open, setOpen] = useState(false)

  // Chỉnh sửa sản phẩm
  const [selected, setSelected] = useState()

  // Xóa sản phẩm
  const handleDelete = (id) => {
    confirm({
      title: "Bạn muốn xóa sản phẩm này?",
      content: "Bạn sẽ xóa luôn những đơn hàng của sản phẩm này!",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        dispatch(deleteProduct(id))
      }
    })
  }

  // Hiển thị bảng
  const searchInput = useRef(null)

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder="Tìm kiếm ..."
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
          >
            Tìm kiếm
          </Button>
          <Button
            size="small"
            onClick={() => close()}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered && '#1890ff',
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'product_name',
      key: 'product_name',
      ...getColumnSearchProps("product_name")
    },
    {
      title: 'Ảnh',
      dataIndex: 'url',
      key: 'url',
      render: (url) => <ProductImg src={url} />
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hãng sản xuất',
      dataIndex: 'brand_name',
      key: 'brand',
      ...getColumnSearchProps("brand_name"),
      render: (brand) => <Tag color="blue">{brand}</Tag>
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span>{formatPrice(price)}</span>
    },
    {
      title: 'Số lượng',
      dataIndex: 'in_stock',
      key: 'in_stock',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (item) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => setSelected(item)}>Sửa</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(item.id)}>Xóa</Button>
        </Space>
      )
    }
  ]

  return (
    <AdminLayout>
      <Container>
        <Content>
          <h2>Sản phẩm</h2>
          <AddButton>
            <Button
              type="primary"
              size="large"
              icon={<PlusCircleOutlined />}
              onClick={() => setOpen(true)}
            >
              Thêm sản phẩm
            </Button>
          </AddButton>
          <AddForm open={open} handleClose={() => setOpen(false)} />
          <Table columns={columns} dataSource={data} />
          {selected && <EditForm product={selected} handleClose={() => setSelected()} />}
        </Content>
      </Container>
    </AdminLayout>
  )
}

export default Products