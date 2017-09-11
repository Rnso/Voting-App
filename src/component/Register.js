import React, { Component } from 'react'
import * as constants from '../../constant.js'
import axios from 'axios'
import '../app.css'

class Register extends Component {
    constructor() {
        super()
        this.state = { errormessage: false }
        this.state.message = false
        this.state.existmsg = false
        this.submit = this.submit.bind(this)
    }
    submit(e) {
        e.preventDefault()
        var name = this.refs.name.value
        var email = this.refs.email.value
        var pwd = this.refs.pwd.value
        if (name !== '' && email !== '' && pwd !== '') {
            this.setState({ errormessage: false })
            axios.post(constants.serverUrl + `/api/register`, { name, email, pwd })
                .then(res => {
                    if (res.data == 'Already Signed up') {
                        this.setState({ existmsg: true })
                        this.setState({ message: false })
                    }
                    else if (res.data != '') {
                        this.refs.name.value = ''
                        this.refs.email.value = ''
                        this.refs.pwd.value = ''
                        this.setState({ message: true })
                        this.setState({ existmsg: false })
                    }
                    else {
                        this.setState({ message: false })
                        this.setState({ existmsg: false })
                    }
                })
                .catch(console.error)
        }
        else {
            this.setState({ errormessage: true })
        }
    }
    render() {
        return (
            <div className='container-fluid'>
                <div className='text-center'>
                    <h1 className='heading'>Sign Up Form</h1><hr />
                </div>
                <div className='container'>
                    <form onSubmit={this.submit}>
                        <div className="form-group">
                            <label >Name:</label>
                            <input type="text" className="form-control" ref="name" />
                        </div>
                        <div className="form-group">
                            <label >Email address:</label>
                            <input type="email" className="form-control" ref="email" />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" ref="pwd" />
                        </div><br />
                        <button className="btn btn-primary" >Submit</button>
                    </form><br />
                    {this.state.message ? <div className='alert alert-success'>Sign Up Successful!</div> : ""}
                    {this.state.existmsg ? <div className='alert alert-success'>Already Signed Up!</div> : ""}
                    {this.state.errormessage ? <div className='alert alert-warning'>Enter all the details</div> : ''}
                </div>
            </div>
        )
    }
}
export default Register