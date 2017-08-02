import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as constants from '../../constant.js'
import axios from 'axios'
import '../app.css'


class Login extends Component {
    constructor() {
        super()
        this.state = { showmsg: false }
        this.LogIn = this.LogIn.bind(this)
    }
    LogIn(e) {
        e.preventDefault()
        let email = this.refs.email.value
        let pwd = this.refs.pwd.value
        axios.post(constants.serverUrl + `/api/login`, { email, pwd })
            .then(res => {
                console.log(res)
                if (res.data != '') {
                    constants.USERID = res.data._id
                    constants.USERNAME = res.data.email
                    this.props.history.push('/home')
                }
                else {
                    this.setState({ showmsg: true })
                }
            })
            .catch(console.error)        
    }
    render() {
        const {history} = this.props
        return (
            <div className='container'>
                <div>
                    <div className='text-center'>
                        <h1 className='heading'>Log In</h1><hr />
                    </div>
                    <div className='container'>
                        <form>
                            <div className="form-group">
                                <label >Email address:</label>
                                <input type="email" className="form-control" ref="email" />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" className="form-control" ref="pwd" />
                            </div><br />
                            <button className="btn btn-primary" onClick={this.LogIn}>LogIn</button>
                        </form><br />
                        {this.state.showmsg ? <div className='alert alert-danger'>Enter the corect details</div> : ''}
                    </div>
                </div>

            </div>
        )
    }
}
export default Login