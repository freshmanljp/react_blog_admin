import { Login, Main } from '../pages'
export const mainRouter = [{
  pathname: '/main',
  component: Main
}, {
  pathname: '/login',
  component: Login,
  exact: true
}]