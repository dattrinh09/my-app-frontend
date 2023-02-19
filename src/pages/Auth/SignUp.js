import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import { ConstanthPaths } from '../../constants/constants'
import axiosInstance from '../../requests/axiosInstance'
import { FormContainer, FormHeading, FormLayout } from './form-styles'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
}

const SignUp = () => {
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleFinish = async values => {
    try {
      const body = {
        username: values.name,
        email: values.email,
        password: values.password,
      }
      await axiosInstance.post('api/auth/signup', body)
      navigate(ConstanthPaths.SIGN_IN)
    } catch (e) {
      setError('E-mail đã được sử dụng!')
      throw new Error(e)
    }
  }

  return (
    <FormLayout>
      <FormContainer>
        <FormHeading>
          Đăng ký
        </FormHeading>
        <Form
          {...formItemLayout}
          name="register"
          onFinish={handleFinish}
          onFocus={() => setError("")}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[
              {
                required: true,
                message: 'Hãy điền tên của bạn!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-Mail"
            rules={[
              {
                type: 'email',
                message: 'E-mail không hợp lệ!',
              },
              {
                required: true,
                message: 'Hãy điền e-mail của bạn!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật Khẩu"
            rules={[
              {
                required: true,
                message: 'Hãy điền mật khẩu của bạn!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Hãy điền lại mật khẩu!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          {error && <span style={{ color: 'red' }}>{error}</span>}
          <Form.Item>Nếu bạn đã có tài khoản. Nhấn vào <Link to={ConstanthPaths.SIGN_IN}>đây.</Link></Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType="submit"
              style={{ width: "100px" }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
    </FormLayout>
  )
}

export default SignUp