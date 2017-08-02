import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import * as constants from '../constant.js'
import Home from './component/Home'
import Polls from './component/Polls'
import Register from './component/Register'
import Login from './component/Login'
import ChangePassword from './component/ChangePassword'
import UserPolls from './component/UserPolls'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <Router >
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">VotingGround</a>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                  <li><Link to="/home">Home</Link></li>
                  <li><Link to="/polls">Polls </Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a className="dropdown dropdown-toggle" id="hide" data-toggle="dropdown">Account&nbsp;<i className="fa fa-caret-down"></i></a>
                    <ul className="dropdown-menu">
                      <li><Link to='/' ><i className="fa fa-sign-in" ></i>&nbsp;Logout</Link></li>
                      <li><Link to="/change_password"><i className="fa fa-cog"></i>&nbsp;Change Password</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={UserPolls} /> 
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
ReactDOM.render(<App />, document.getElementById('app'))
