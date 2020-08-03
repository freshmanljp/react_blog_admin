import React, { useState } from 'react'
import { Button, Input, Spin, Card, message } from 'antd'
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, KeyOutlined } from '@ant-design/icons'
import './login.css'
import { checkLogin } from '../../service'

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const submitLogin = () => {
    // 设置loading状态
    setIsLoading(true)
    // 用条件判断用户名和密码是否输入
    if (!username) {
      message.error('Please input the username')
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }
    if (!password) {
      message.error('Please input the password')
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }
    const userData = {
      username: username,
      password: password
    }
    // 登录业务逻辑处理
    checkLogin(userData).then((res) => {
      if (res.data.code === 200) {
        // 将返回的session信息存储在本地
        // localStorage.setItem('openId',res.data.data.openId)
        // 跳转到main管理页面
        props.history.push('/main')
        message.success('Login success')
      } else {
        message.error('Username or Password error')
        setTimeout(() => {
          setIsLoading(false)
        }, 300)
    }}).catch(err => {
        console.log(err)
    })
  }
  return (
    <div className="login-div">
      <Spin tip="Logining" spinning={isLoading}>
        <Card title="React Blog Admin System">
          <Input
            size="large"
            placeholder="username"
            prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
            onChange={(e) => {setUsername(e.target.value)}}/>
          <Input.Password
            size="large"
            placeholder="input password"
            prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={(e) => {setPassword(e.target.value)}}/>
          <Button  type="primary" onClick={submitLogin}>Login</Button>
        </Card>
      </Spin>
    </div>
  )
}
