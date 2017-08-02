import React, { Component } from 'react'
import * as constants from '../../constant.js'
import axios from 'axios'
import { PieChart, Pie, Legend, Tooltip,Sector, Cell } from 'recharts'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import '../app.css'

class Polls extends Component {
    constructor() {
        super()
        this.state = {showmsg: false}
        this.state.showchart = false
        this.state.polls = []
        this.state.chartdata = []
        this.state.currentpoll = []
        this.state.curenttitle = ''
        this.state.selectedoption = ''
        this.onOptionChange = this.onOptionChange.bind(this)
        this.votePoll = this.votePoll.bind(this)
        this.createChart = this.createChart.bind(this)
        this.onBackBtn = this.onBackBtn.bind(this)
    }
    componentDidMount() {
        axios.get(constants.serverUrl + `/api/getallpolls`)
            .then(res => {
                this.state.polls = res.data
                this.setState({ polls: res.data })
            })
            .catch(console.error)
    }
    createChart(e) {
        this.setState({ showchart: true })
        this.state.chartdata = []
        let index = parseInt(e.target.id)
        this.state.curenttitle = this.state.polls[index].title
        this.state.currentpoll = this.state.polls[index].options
        this.state.currentpoll.map(item => {
            let row = {}
            row.name = item.option
            row.value = item.votes
            this.state.chartdata.push(row)
        })
        //this.setState(this.state.curenttitle)
        this.setState(this.state.currentpoll)
        this.setState(this.state.chartdata)
    }
    onOptionChange(e) {
        console.log(e.target.value)
        this.state.selectedoption = e.target.value
    }
    votePoll(e) {
        e.preventDefault()
        if (this.state.selectedoption !== '') {
            let pollId = e.target.id
            let vote = this.state.selectedoption
            axios.post(constants.serverUrl + `/api/updatepollvote`, { pollId, vote })
                .then(res => {
                    axios.get(constants.serverUrl + `/api/getallpolls`)
                        .then(res => {
                            this.state.polls = res.data
                            this.setState({ polls: res.data })
                        })
                        .catch(console.error)
                })
                .catch(console.error)
        }
        else {
            this.setState({showmsg: true})
        }
    }
    onBackBtn(e){
        e.preventDefault()
        this.setState({showchart: false})
    }
    render() {
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#8884d8', '#008000'];
        return (
            <div className='container'>
                <NotificationContainer />
                {this.state.showchart ? <div>
                    <div className='col-md-6'>
                        <ul className="list-group ">
                            <li className='ul'><h3>{this.state.curenttitle}</h3><br /></li>
                            {this.state.currentpoll.map((item, i) => {
                                return <li key={i} className='list' style={{ fontSize: '20px' }}>&nbsp;{item.option}<br /></li>
                            })}
                        </ul>
                        <button className='btn btn-primary' onClick={this.onBackBtn}><i className="fa fa-arrow-left"></i>&nbsp;Back</button>
                    </div>
                    <div className='col-md-6'>
                        <PieChart width={800} height={400} >
                            <Pie data={this.state.chartdata} cx={200} cy={200} innerRadius={50} outerRadius={150}  fill="#8884d8" label={true}>
                            {this.state.chartdata.map((entry, index) => 
                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            )}
                            </Pie>
                             <Legend />
                             <Tooltip />
                        </PieChart>
                    </div>
                </div> :
                    <div>
                        {this.state.polls.map((item, i) => {
                            return <div key={i} className='container'>
                                <div className="panel panel-default">
                                    <div className="panel-heading">{item.title}</div>
                                    <div className="panel-body">
                                        <ul className="list-group ul">
                                            {item.options.map((item, i) => {
                                                return <li key={i} className='list'> <input type='radio' name='options' value={item.option} onChange={this.onOptionChange} />&nbsp;{item.option}<br /></li>
                                            })}
                                        </ul>
                                        &nbsp;<button className='btn btn-success' id={item._id} onClick={this.votePoll}>Vote</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <button className='btn btn-success' id={i} onClick={this.createChart}>Check Result in Chart</button><br />
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                }
            </div>
        )
    }
}
export default Polls