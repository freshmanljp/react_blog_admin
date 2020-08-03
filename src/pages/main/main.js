import React from 'react'
import { Frame } from '../../components'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AddArticle } from '../../pages'

export default function main() {
  return (
    <div>
      <Frame>
        <Switch>
          <Route path="/main/addArticle" exact component={AddArticle}></Route>
          <Redirect path="/main" exact to="/main/addArticle"/>
          <Redirect to="/404"/>
        </Switch>
      </Frame>
    </div>
  )
}
