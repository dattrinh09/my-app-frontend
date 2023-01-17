import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ConstanthPaths } from '../../constanth/constanth.path'
import axiosInstance from '../../requests/axiosInstance'
import { FormContainer, FormHeading } from './form-styles'

const SignIn = () => {
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleFinish = async values => {
    console.log('Received values of form: ', values)
    try {
        const body = {
            email: values.email,
            password: values.password
        }
        const res = await axiosInstance.post('auth/signin', body)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userName", res.data.result.name)
        localStorage.setItem("userEmail", res.data.result.email)
        navigate(ConstanthPaths.HOME_PAGE)
    } catch (e) {
        setError('E-mail hoặc Mật khẩu không chính xác!')
        throw new Error(e)
    }
  }

  return (
    <FormContainer>
      <FormHeading>Đăng nhập</FormHeading>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Hãy điền e-mail của bạn!',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="E-Mail"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Hãy điền mật khẩu của bạn!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <br />
        <span>
          Nếu bạn chưa có tài khoản hãy nhấn vào
          <NavLink
            style={{ color: "blue" }}
            to={ConstanthPaths.SIGN_UP}
          > đây.
          </NavLink>
        </span>
        <div>
          <Button
            className="form-btn"
            type='primary'
            htmlType="submit"
            style={{ margin: "20px 0" }}
          >
            Đăng nhập
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default SignIn