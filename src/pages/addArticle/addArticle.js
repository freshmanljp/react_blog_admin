import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button, Col, Row, Input, Select, DatePicker, Form, message} from 'antd'
import './addArticle.css'
import marked from 'marked'
import { getTypeList, addArticle, updateArticle, getArticleById } from '../../service'

const Option = Select.Option
const TextArea = Input.TextArea

export default function AddArticle(props) {
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [markdownContent,setMarkdownContent] = useState('预览内容') //html内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息

  // 创建表单form的ref
  const formEl = useRef(null);

  // markde相关配置
  marked.setOptions({
    // 可以通过自定义的Renderer渲染出自定义的格式
    renderer: new marked.Renderer(),
    // 只解析符合Markdown定义的，不修正Markdown的错误,false为修正Markdown的错误
    pedantic: false,
    // 启动类似Github样式的Markdown
    gfm: true,
    // 支持Github换行符
    breaks: false,
    // 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    sanitize: false,
    // 优化列表输出，这个填写ture之后，你的样式会好看很多
    smartLists: true,
  })
  // *****************这里需要一个节流处理**************************
  // 文章内容改变处理
  const contentChange = (e) => {
    const content = e.target.value
    const html = marked(content)
    setMarkdownContent(html)
  }
  // 简介内容改变处理
  const introduceChange = (e) => {
    const introduce = e.target.value
    const html = marked(introduce)
    setIntroducehtml(html)
  }
  // 获取文章类型列表处理
  const getTypeListFun = () => {
    getTypeList().then(res => {
      if (res.data.code === 200) {
        setTypeInfo(res.data.data)
        // console.log(typeInfo)
      } else {
        if (res.data.code === 403) {
          props.history.push('/')
        }
      }
    })
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!好好理解好useCallback的含义和使用场合！！！！！！！！！！！！！！！！！！！！！
  const stableGetTypeListFun = useCallback(getTypeListFun, [])
  // 保存按钮表单提交处理
  const onFinish = async (values) => {
    // 构造提交数据
    const submitData = {
      type_Id: values.selectedType,
      title: values.articleTitle,
      content: values.articleContent,
      introduce: values.introducemd,
      add_time: values.showDate.valueOf()/1000,
      // 阅读量先写死
      view_count: Math.ceil(Math.random()*100)+1000
    }
    if (articleId === 0) {
      addArticle(submitData).then(res => {
        if (res.data.code === 200 && res.data.data.insertSuccess) {
          message.success('文章提交成功')
          setArticleId(res.data.data.insertId)
        } else {
          message.error('文章提交失败')
        }
      })
    } else {
      // 注意这里id是小写
      submitData.id = articleId
      updateArticle(submitData).then(res => {
        if (res.data.code === 200 && res.data.data.updateSuccess) {
          message.success('文章修改成功')
        } else {
          message.error('文章修改失败')
        }
      })
    }
  }
  const handleSubmit = () => {
    // 先验证表单是否合法
    formEl.current.validateFields().then(() => {
      // 手动触发submit提交事件
      formEl.current.submit()
      setTimeout(() => {
        props.history.push('/main/articleList')
      }, 100)
    }).catch(err => {
      console.log(err)
    })
  }
  // 若是修改文章页面，则读取文章详细信息填充表单页
  const showArticleData = (id) => {
    let articleData = {}
    getArticleById(id).then(res => {
      if (res.data.code === 200) {
        // 获取文章信息并填充表单域
        articleData = res.data.data[0]
        formEl.current.setFieldsValue({
          selectedType: articleData.type_id,
          articleTitle: articleData.title,
          articleContent: articleData.content,
          introducemd: articleData.introduce
          // showDate: articleData.addTime
        })
        const html1 = marked(articleData.content)
        setMarkdownContent(html1)
        const html2 = marked(articleData.introduce)
        setIntroducehtml(html2)
      } else {
        console.log(res.data.data)
      }
    })
  }
  // 在挂载时获取相关数据
  useEffect(() => {
    const tempId = props.match.params.id
    stableGetTypeListFun()
    // 根据是否有路由参数Id传入判断是修改还是新建文章
    if(tempId) {
      showArticleData(tempId)
      // 记得设置文章保存的id，防止数据库重复保存文章数据
      setArticleId(tempId)
    }
  }, [stableGetTypeListFun, props.match.params.id])
  return (
    <div>
      {/* 整个文章添加页面form表单设置 */}
      <Form
        name="basic"
        initialValues={{ selectedType: '文章类别' }}
        onFinish={onFinish}
        ref={formEl}
      >
        <Row gutter={20}>
          {/* 文章内容和标题部分分栏 */}
          <Col span={16}>
            {/* 文章标题部分 */}
            <Row gutter={10} className="article_title">
              {/* 标题输入 */}
              <Col span={20}>
                {/* 文章标题表单项 */}
                <Form.Item
                  name="articleTitle"
                  rules={[{ required: true, message: 'Please input article title!' }]}
                >
                  <Input placeholder="文章标题"></Input>
                </Form.Item>
              </Col>
              <Col span={4}>
                {/* 文章类别表单项 */}
                <Form.Item
                  name="selectedType"
                  rules={[{ type: 'number', message: 'Please select article type!' }]}
                >
                  <Select>
                    {
                      typeInfo.map(item => <Option value={item.Id} key={item.Id}>{item.type_name}</Option>)
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {/* 文章内容部分 */}
            <Row gutter={10}>
              {/* 文章内容输入框 */}
              <Col span={12}>
                <Form.Item
                  name="articleContent"
                  rules={[{ required: true, message: 'Please input article content!' }]}
                >
                  <TextArea 
                    className="markdown-content" 
                    rows={20}  
                    placeholder="文章内容"
                    onChange={contentChange}
                  />
                </Form.Item>
              </Col>
              {/* 文章预览框 */}
              <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{__html: markdownContent}}></div>
              </Col>
            </Row>
          </Col>
          {/* 文章简介部分分栏 */}
          <Col span={8}>
            {/* 文章添加操作框 */}
            <Row gutter={10} className="article_oper">
              <Col>
                <Button htmlType="submit">暂存文章</Button>
              </Col>
              <Col>
                <Button type="primary" onClick={handleSubmit}>发布文章</Button>
              </Col>
            </Row>
            {/* 文章简介编辑框 */}
            <Row>
              <Col span={24}>
                <Form.Item
                  name="introducemd"
                >
                  <TextArea 
                    rows={4} 
                    placeholder="文章简介"
                    onChange={introduceChange}
                  />
                </Form.Item>
                <div className="introduce-html" dangerouslySetInnerHTML={{__html: introducehtml}}></div>
              </Col>
            </Row>
            <Row>
              <div className="date-select">
                <Form.Item
                  name="showDate"
                  rules={[{ required: true, message: 'Please select date!' }]}
                >
                  <DatePicker placeholder="发布日期"  />
                </Form.Item>
              </div>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
