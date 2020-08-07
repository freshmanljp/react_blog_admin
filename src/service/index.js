import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? 'http://localhost:7002' : '',
  // `withCredentials` 表示跨域请求时是否需要使用cookies
  withCredentials: true, // 默认的
})

// 用户登录请求
export const checkLogin = (userData) => {
  return service.post('/admin/login', userData)
}
// 获取文章类型请求
export const getTypeList = () => {
  return service.get('/admin/typeList')
}
// 添加文章请求
export const addArticle = (data) => {
  return service.post('/admin/addArticle', data)
}
// 修改文章请求
export const updateArticle = (data) => {
  return service.post('/admin/updateArticle', data)
}
// 获取文章列表请求
export const getArticleList = (data) => {
  return service.get('/admin/getArticleList', data)
}
// 删除文章请求
export const deleteArticle = (id) => {
  return service.get('/admin/deleteArticle/' + id)
}
// 根据id获取文章详情
export const getArticleById = (id) => {
  return service.get('/admin/getArticleById/' + id)
}
