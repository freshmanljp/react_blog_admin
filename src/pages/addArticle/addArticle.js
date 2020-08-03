import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Input, Select, DatePicker} from 'antd'
import './addArticle.css'
import marked from 'marked'
import { getTypeList } from '../../service'

const Option = Select.Option
const TextArea = Input.TextArea

export default function AddArticle(props) {
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent,setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent,setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState(1) //选择的文章类别
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
  // 文章内容改变处理
  const contentChange = (e) => {
    const content = e.target.value
    setArticleContent(content)
    const html = marked(content)
    setMarkdownContent(html)
  }
  // 简介内容改变处理
  const introduceChange = (e) => {
    const introduce = e.target.value
    setIntroducemd(introduce)
    const html = marked(introduce)
    setIntroducehtml(html)
  }
  // 获取文章类型列表处理
  const getTypeListFun = () => {
    getTypeList().then(res => {
      if (res.data.code === 200) {
        setTypeInfo(res.data.data)
        console.log(typeInfo)
      } else {
        if (res.data.code === 403) {
          props.history.push('/')
        }
      }
    })
  }
  // 在挂载时获取相关数据
  useEffect(() => {
    getTypeListFun()
  }, [])
  return (
    <div>
      <Row gutter={20}>
        {/* 文章内容和标题部分分栏 */}
        <Col span={16}>
          {/* 文章标题部分 */}
          <Row gutter={10} className="article_title">
            {/* 标题输入 */}
            <Col span={20}>
              <Input placeholder="文章标题"></Input>
            </Col>
            <Col span={4}>
              <Select defaultValue={1}>
                {
                  typeInfo.map(item => <Option value={item.Id}>{item.type_name}</Option>)
                }
              </Select>
            </Col>
          </Row>
          {/* 文章内容部分 */}
          <Row gutter={10}>
            {/* 文章内容输入框 */}
            <Col span={12}>
              <TextArea 
                className="markdown-content" 
                rows={20}  
                placeholder="文章内容"
                onChange={contentChange}
              />
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
              <Button>暂存文章</Button>
            </Col>
            <Col>
              <Button type="primary">发布文章</Button>
            </Col>
          </Row>
          {/* 文章简介编辑框 */}
          <Row>
            <Col span={24}>
              <TextArea 
                  rows={4} 
                  placeholder="文章简介"
                  onChange={introduceChange}
              />
              <div className="introduce-html" dangerouslySetInnerHTML={{__html: introducehtml}}></div>
            </Col>
          </Row>
          <Row>
            <div className="date-select">
              <DatePicker placeholder="发布日期"  />
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
