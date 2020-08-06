import React, { useState, useEffect } from 'react'
import { Button, Table, Modal } from 'antd'
import { getArticleList } from '../../service'

export default function ArticleList() {
  const [list, setList] = useState([])
  // 表格配置数据项
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '类别',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '发布时间',
      dataIndex: 'add_time',
      key: 'add_time',
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
      key: 'view_count',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <>
          <Button type="primary">修改</Button>
          <Button type="ghost">删除</Button>
        </>
      ),
    },
  ]
  useEffect(() => {
    getArticleList().then(res => {
      if (res.data.code === 200) {
        // table的datasource需要key，手动添加
        const list = res.data.data
        list.forEach((item, index) => {
          item.key = index
        })
        setList(list)
      }
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <div>
      <Table columns={columns} dataSource={list} />
    </div>
  )
}
