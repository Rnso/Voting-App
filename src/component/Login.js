import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as constants from '../../constant.js'
import axios from 'axios'
import Index from '../index'
import '../app.css'


class Login extends Component {
    constructor() {
        super()
        this.state = { showmsg: false }
        this.state.errormsg = false
        this.LogIn = this.LogIn.bind(this)
    }
    LogIn(e) {
        e.preventDefault()
        let email = this.refs.email.value
        let pwd = this.refs.pwd.value
        if (email !== '' || pwd !== '') {
            this.setState({ errormsg: false })
            axios.post(constants.serverUrl + `/api/login`, { email, pwd })
                .then(res => {
                    //  console.log(res)
                    if (res.data != '') {
                        constants.USERID = res.data._id
                        let obj = {}
                        obj.active = true
                        obj._id = res.data._id
                        sessionStorage.obj = JSON.stringify(obj)
                        ReactDOM.render(<Index />, document.getElementById('app'))
                        this.props.history.push('/userpolls')
                        this.setState({ showmsg: false })
                    }
                    else {
                        this.setState({ showmsg: true })
                    }
                })
                .catch(console.error)
        }
        else {
            this.setState({ errormsg: true })
        }
    }
    render() {
        const { history } = this.props
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
                        {this.state.errormsg ? <div className='alert alert-warning'>Enter all the details</div> : ''}
                    </div>
                </div>

            </div>
        )
    }
}
export default Login