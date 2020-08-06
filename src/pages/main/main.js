import React, { useEffect, useState } from 'react'
import { Frame } from '../../components'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AddArticle, ArticleList } from '../../pages'

export default function Main(props) {
  const [path, setPath] = useState('')
  useEffect(() => {
    const temPath = props.location.pathname.split('/')[2]
    setPath(temPath)
  }, [props])
  return (
    <div>
      <Frame path={path}>
        <Switch>
          <Route path="/main/addArticle" exact component={AddArticle}></Route>
          <Route path="/main/articleList" exact component={ArticleList}></Route>
          <Redirect path="/main" exact to="/main/addArticle"/>
          <Redirect to="/404"/>
        </Switch>
      </Frame>
    </div>
  )
}
