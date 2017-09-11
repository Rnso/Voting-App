import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as constants from '../../constant.js'
import axios from 'axios'
import Index from '../index'
import '../app.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.logOut = this.logOut.bind(this)
    }
    logOut() {
        sessionStorage.removeItem('obj')
        ReactDOM.render(<Index />, document.getElementById('app'))
    }
    render() {
        let session = typeof sessionStorage.obj != 'undefined' ? JSON.parse(sessionStorage.obj) : ''
        session.active ? this.state.isactive = true : this.state.isactive = false
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className="navbar-brand">VotingGround</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/polls">Polls </Link></li>
                        </ul>
                        {this.state.isactive ? <ul className="nav navbar-nav navbar-right">
                            <li><Link to='/userpolls'> My Polls</Link></li>
                            <li><Link to='/change_password'>Change Password </Link></li>
                            <li><Link to='/' onClick={this.logOut}>Logout</Link></li>
                        </ul> : ''}
                    </div>
                </div>
            </nav>
        )
    }
}

export default App