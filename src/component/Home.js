import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect, Link } from 'react-router-dom'
import * as constants from '../../constant.js'
import axios from 'axios'
import '../app.css'

class Home extends Component {
    constructor() {
        super()
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
            <div className='container text-center desc'>
                <h1>VotingGround</h1>
                <h3>Create polls and know what others have to say !</h3><hr />
                {this.state.isactive ? <Link to='/'><button className='btn btn-success' onClick={this.logOut}>Log Out</button></Link>
                    : <div>
                        <Link to='/register'><button className='btn btn-info'>Sign Up</button></Link>&nbsp;&nbsp;<span><h5>to create polls</h5></span>
                        <h3>or</h3>
                        <Link to='/login'><button className='btn btn-success'>Log In</button></Link>&nbsp;&nbsp;<span><h5>to access your polls</h5></span>
                    </div>
                }
            </div>
        )
    }
}
export default Home