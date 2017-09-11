import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import * as constants from '../constant.js'
import App from './component/App'
import Home from './component/Home'
import Polls from './component/Polls'
import Register from './component/Register'
import Login from './component/Login'
import ChangePassword from './component/ChangePassword'
import UserPolls from './component/UserPolls'

class Index extends Component {
  render() {
    return (
      <Router >
        <div>
          <App />
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/userpolls" component={UserPolls} />
            <Route path="/polls" component={Polls} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/change_password" component={ChangePassword} />
          </div>
        </div>
      </Router>
    )
  }
}
ReactDOM.render(<Index />, document.getElementById('app'))
export default Index
