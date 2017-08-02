import React, { Component } from 'react'
import { BrowserRouter as Link } from 'react-router-dom'
import * as constants from '../../constant.js'
import axios from 'axios'
import '../app.css'

class ChangePassword extends Component {
    constructor() {
        super()
        this.state = { showmsg: false }
        this.changePassword = this.changePassword.bind(this)
    }
    changePassword() {
        let userId = constants.USERID
        let old_pwd = this.refs.old_pwd.value
        let new_pwd = this.refs.new_pwd.value
        axios.post(constants.serverUrl + `/api/changepassword`, { userId, old_pwd, new_pwd })
            .then(res => {
                if (res.data !== '') {
                    this.setState({ showmsg: true })
                    
                }
            })
            .catch(console.error)
    }
    render() {
        return (
            <div className='container'>
                <div className='text-center'>
                    <h1 className='heading'>Change Password</h1><hr />
                </div>
                <div className='container'>
                    <div className="form-group">
                        <label >Old Password:</label>
                        <input type="password" className="form-control" ref="old_pwd" />
                    </div>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input type="password" className="form-control" ref="new_pwd" />
                    </div><br />
                    <button className="btn btn-primary" onClick={this.changePassword}>Change Password</button><br /><br/>
                    {this.state.showmsg ? <div className='alert alert-success'>Password set successfully</div> : ''}
                </div>
            </div>
        )
    }
}
export default ChangePassword