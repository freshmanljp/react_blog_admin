import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'

import { mainRouter } from './routes'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {
            mainRouter.map(item => {
              return  <Route
                        path={item.pathname}
                        component={item.component}
                        exact={item.exact}
                        key={item.pathname}
                      ></Route>
            })
          }
          <Redirect to={mainRouter[1].pathname} from='/' exact />
          <Redirect to='/404'/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
