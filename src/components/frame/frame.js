import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './frame.css'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Frame (props) {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            添加文章
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px', minWidth: '850px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {/* 插槽内容，一般就是放路由占位符 */}
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>本博客基于React+egg.js开发</Footer>
      </Layout>
    </Layout>
  )
}

export default Frame