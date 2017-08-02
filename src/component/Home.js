import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import * as constants from '../../constant.js'
import axios from 'axios'
import '../app.css'

class Home extends Component {
    constructor() {
        super()
        this.state = {}
        constants.USERID = ''
        constants.USERNAME = ''
    }
    render() {
        return (
            <div className='container text-center desc'>
                <h1>VotingGround</h1>
                <h3>Create polls and know what others have to say !</h3><hr />
                <Link to='/register'><button className='btn btn-info'>Sign Up</button></Link>&nbsp;&nbsp;<span><h5>to create polls</h5></span>
                <h3>or</h3>
                <Link to='/login'><button className='btn btn-success'>Log In</button></Link>&nbsp;&nbsp;<span><h5>to access your polls</h5></span>
            </div>
        )
    }
}
export default Home