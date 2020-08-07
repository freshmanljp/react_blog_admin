import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, message } from 'antd'
import { getArticleList, deleteArticle } from '../../service'

import './articleList.css'

export default function ArticleList(props) {
  const [list, setList] = useState([])
  // 修改文章事件处理
  const handleUpdate = (id) => {
    props.history.push('/main/addArticle/' + id)
  }
  // 获取confirm类型的Modal，使用时直接调用即可
  const confirm = Modal.confirm
  // 删除事件处理
  const handleDelete = (id) => {
    // 删除请求提交
    const deleteArticleFun = (id) => {
      deleteArticle(id).then(res => {
        if (res.data.code === 200) {
          message.success(res.data.data)
          // 从list里面删除这个元素，重新从服务器请求会比较慢
          const delId = list.findIndex(item => {
            return item.Id === id
          })
          list.splice(delId, 1)
          // set函数数据必须发生改变，引用对象类型不能仅仅改内容，还要改引用
          setList([...list])
        } else {
          console.log(res.data.data)
        }
      })
    }
    confirm({
      // 弹出确认框
      title: '删除文章',
      content: '此操作不可逆，确认删除该文章吗',
      onOk: () => deleteArticleFun(id),
      onCancel: () => {message.info('操作已取消')},
      okText: "确认别墨迹",
      cancelText: "还是算了"
    })
  }
  // 表格配置数据项
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '类别',
      dataIndex: 'type_name',
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
      render: (text) => {
        return (<>
                    <Button type="primary" onClick={() => handleUpdate(text.Id)}>修改</Button>&nbsp;
                    <Button type="ghost" onClick={() => handleDelete(text.Id)}>删除</Button>
                </>)
      },
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
