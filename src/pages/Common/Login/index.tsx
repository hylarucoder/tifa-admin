import React, { useEffect, FC } from 'react'
import { useHistory } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, message } from 'antd'
import ReactCanvasNest from 'react-canvas-nest'
import './index.less'

const Login: FC<any> = ({}) => {
  const history = useHistory()
  useEffect(() => {}, [history])

  const onFinish = () => {}

  const FormView = (
    <Form className="login-form" name="login-form" onFinish={onFinish}>
      <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" prefix={<UserOutlined />} size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
        extra="用户名：admin 密码：123456"
      >
        <Input.Password placeholder="密码" prefix={<LockOutlined />} size="large" />
      </Form.Item>
      <Form.Item>
        <Button className="login-form-button" htmlType="submit" size="large" type="primary">
          登录
        </Button>
      </Form.Item>
    </Form>
  )

  const floatColor = '24,144,255'
  return (
    <div className="login-layout" id="login-layout">
      <ReactCanvasNest
        config={{
          pointColor: floatColor,
          lineColor: floatColor,
          pointOpacity: 0.6,
        }}
        style={{ zIndex: 1 }}
      />
      <div className="logo-box">
        {/*<img alt="" className="logo" src={bgLogin}/>*/}
        <span className="logo-name">React-Antd Multi-Tab</span>
      </div>
      {FormView}
    </div>
  )
}

export default Login
