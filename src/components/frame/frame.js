import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './frame.css'
import { Link, withRouter } from 'react-router-dom'

const { Content, Footer, Sider } = Layout;

function Frame (props) {
  // 侧边栏是否折叠
  const [collapsed, setCollapsed] = useState(false)
  // 侧边栏折叠按钮事件处理
  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  }
  // 菜单栏点击事件处理
  const handleMenuClick = (e) => {
    switch (e.key){
      case '2': 
        props.history.push('/main/addArticle')
        return
      case '3':
        props.history.push('/main/articleList')
        return
      default:
        return
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            添加文章
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            文章管理
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px', minWidth: '850px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <Link to="/main/addArticle">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{props.path}</Breadcrumb.Item>
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

export default withRouter(Frame)