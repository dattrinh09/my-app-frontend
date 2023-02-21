import { DeleteOutlined } from '@ant-design/icons'
import { Button, Modal, Space, Table } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../../components/layout/AdminLayout'
import Loader from '../../../components/Loader/Loader'
import { deleteUser, getUsers } from '../../../store/reducers/usersSlice'
import { usersSelector } from '../../../store/selectors'
import { Container, Content } from './users-styles'

const { confirm } = Modal

const Users = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { users } = useSelector(usersSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
        setIsLoading(false)
    }, [dispatch])

    const handleDelete = id => {
        confirm({
            title: "Bạn muốn xóa người dùng này?",
            content: "Bạn sẽ xóa luôn những đơn hàng của người dùng này!",
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk() {
                dispatch(deleteUser(id))
            }
        })
    }

    const data = useMemo(() => {
        return users.map(value => ({
            key: value.id,
            id: value.id,
            username: value.username,
            email: value.email,
            password: value.password
        }))
    }, [users])

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên",
            dataIndex: "username",
            key: "username"
        },
        {
            title: "E-mail",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Mật khẩu",
            dataIndex: "password",
            key: "password",
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
                    <h2>Người dùng</h2>
                    {isLoading ? <Loader /> : <Table columns={columns} dataSource={data} />}
                </Content>
            </Container>
        </AdminLayout>
    )
}

export default Users