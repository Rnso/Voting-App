import React, { Component } from 'react'
import * as constants from '../../constant.js'
import { NotificationManager } from 'react-notifications'
import axios from 'axios'
import '../app.css'

class Register extends Component {
    constructor() {
        super()
        this.state = {}
        this.state.message = false
        this.submit = this.submit.bind(this)
    }
    submit(e) {
        e.preventDefault()
        let request = {}
        var name = this.refs.name.value
        var email = this.refs.email.value
        var pwd = this.refs.pwd.value
        axios.post(constants.serverUrl + `/api/register`, {name, email, pwd})
            .then(res => {
                console.log(res)
                this.setState({message : true})
                this.refs.name.value = ''
                this.refs.email.value = ''
                this.refs.pwd.value = ''
            })
            .catch(console.error)
    }
    render() {
        return (
            <div className='container-fluid'>
                <div className='text-center'>
                    <h1 className='heading'>Sign Up Form</h1><hr />
                </div>
                <div className='container'>
                    <form>
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
                        <button className="btn btn-primary" onClick={this.submit}>Submit</button>
                    </form><br/>
                    {this.state.message ? <div className='alert alert-success'>Sign Up Successful!</div> : ""}
                </div>
            </div>
        )
    }
}
export default Register