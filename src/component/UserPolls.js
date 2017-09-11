import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import * as constants from '../../constant.js'
import axios from 'axios'
import '../app.css'
import Home from './Home'

class UserPolls extends Component {
    constructor() {
        super()
        this.state = {}
        this.state.msg = false
        this.state.showcreatepolls = true
        this.state.polls = []
        this.state.options = ['green']
        this.deletePolls = this.deletePolls.bind(this)
        this.showMyPolls = this.showMyPolls.bind(this)
        this.showCreatePolls = this.showCreatePolls.bind(this)
        this.createPolls = this.createPolls.bind(this)
        this.addOptions = this.addOptions.bind(this)
    }

    deletePolls(e) {
        e.preventDefault()
        let pollsId = e.target.id
        let userId = constants.USERID
        axios.post(constants.serverUrl + `/api/deletePolls`, { userId, pollsId })
            .then(res => {
                this.showMyPolls()
            })
            .catch(console.error)
    }
    showMyPolls() {
        this.setState({ showcreatepolls: false })
        axios.post(constants.serverUrl + `/api/getpolls/${constants.USERID}`)
            .then(res => {
                if (res.data != '')
                    this.setState({ polls: res.data })
            })
    }
    showCreatePolls() {
        this.setState({ showcreatepolls: true })
    }
    createPolls(e) {
        e.preventDefault()
        let userId = constants.USERID
        let title = this.refs.title.value
        let options = []
        for (var i = 0; i < this.state.options.length; i++) {
            let ref = 'option' + i
            options.push({ option: this.refs[ref].value, votes: 0 })
        }
        if (this.state.options.length !== 0 && this.refs.title.value) {
            axios.post(constants.serverUrl + `/api/createPolls`, { userId, title, options })
                .then(res => {
                    this.showMyPolls()
                })
                .catch(console.error)
        }
        else {
            this.setState({ msg: true })
        }
    }
    addOptions(e) {
        e.preventDefault()
        this.state.options.push('option')
        this.setState(this.state.options)
    }

    render() {
        return (
            <div className='background'>
                <div className='container'>
                    <div className='col-md-3'>
                        <nav>
                            <ul className='ul'>
                                <li className='polls_sidebar'> <a href='#' onClick={this.showCreatePolls}>Create Poll</a></li>
                                <li className='polls_sidebar'> <a href='#' onClick={this.showMyPolls}>Show my Polls</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className='col-md-9 polls_content'>
                        {this.state.showcreatepolls ?
                            <div>
                                <div className="form-group">
                                    <label >Enter the name of poll</label>
                                    <input type="text" className="form-control" ref="title" placeholder='What is your favorite color?' />
                                </div>
                                <div className="form-group">
                                    <label >Enter the Options</label>
                                    {this.state.options.map((item, i) => {
                                        return <input key={i} type="text" className="form-control" placeholder={item} ref={`option${i}`} />
                                    })}
                                </div>
                                <div className="form-group">
                                    <input type="button" className="form-control btn btn-info" value='Add option' onClick={this.addOptions} />
                                </div>
                                <button className='btn btn-primary' onClick={this.createPolls}>Submit poll</button><br /><br />
                                {this.state.msg ? <div className='alert alert-danger'>Enter both the name and options</div> : ''}
                            </div> :
                            <div className="panel-group" id="accordion">
                                {this.state.polls.map((item, i) => {
                                    return <div key={i} className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion" href={`#${i}`}>{item.title}</a>
                                            </h4>
                                        </div>
                                        <div id={i} className="panel-collapse collapse">
                                            <ul className="list-group list">
                                                {item.options.map((item, i) => {
                                                    return <li key={i} className=''>&nbsp;{item.option}<br /></li>
                                                })}
                                            </ul>
                                            &nbsp;<button className='btn btn-danger' id={item._id} onClick={this.deletePolls}>Delete</button><br /><br />
                                        </div>
                                    </div>
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default UserPolls