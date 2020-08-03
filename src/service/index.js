import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? 'http://localhost:7001' : '',
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