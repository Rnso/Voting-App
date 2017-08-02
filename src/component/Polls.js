import React, { Component } from 'react'
import * as constants from '../../constant.js'
import axios from 'axios'
import { PieChart, Pie, Legend, Tooltip, Sector, Cell } from 'recharts'
import '../app.css'

class Polls extends Component {
    constructor() {
        super()
        this.state = { showmsg: false }
        this.state.count = 0
        this.state.showchart = false
        this.state.polls = []
        this.state.currentpoll = ''
        this.state.currenttitle = ''
        this.state.currentoptions = []
        this.state.chartdata = []
        this.state.selectedoption = ''
        this.onOptionChange = this.onOptionChange.bind(this)
        this.votePoll = this.votePoll.bind(this)
        this.createChart = this.createChart.bind(this)
        this.handlePrev = this.handlePrev.bind(this)
        this.handleNext = this.handleNext.bind(this)
    }
    componentDidMount() {
        axios.get(constants.serverUrl + `/api/getallpolls`)
            .then(res => {
                this.state.polls = res.data
                this.state.currentpoll = this.state.polls[0]
                this.state.currenttitle = this.state.polls[0].title
                this.state.currentoptions = this.state.polls[0].options
                this.setState({ polls: res.data })
                this.setState(this.state.currentpoll)
                this.setState({ currenttitle: this.state.currenttitle })
                this.setState(this.state.currentoptions)
            })
            .catch(console.error)
    }
    onOptionChange(e) {
        this.state.selectedoption = e.target.value
    }
    votePoll(e) {
        e.preventDefault()
        if (this.state.selectedoption !== '') {
            this.setState({ showmsg: false })
            let pollId = e.target.id
            let vote = this.state.selectedoption
            axios.post(constants.serverUrl + `/api/updatepollvote`, { pollId, vote })
                .then(res => {
                    axios.get(constants.serverUrl + `/api/getallpolls`)
                        .then(res => {
                            this.state.polls = res.data
                            this.state.currentpoll = this.state.polls[this.state.count]
                            this.state.currenttitle = this.state.polls[this.state.count].title
                            this.state.currentoptions = this.state.polls[this.state.count].options
                            this.setState({ polls: res.data })
                            this.setState(this.state.currentpoll)
                            this.setState({ currenttitle: this.state.currenttitle })
                            this.setState(this.state.currentoptions)
                            this.createChart()
                        })
                        .catch(console.error)
                })
                .catch(console.error)
        }
        else {
            this.setState({ showmsg: true })
        }
    }
    createChart() {
        this.state.chartdata = []
        this.state.currentoptions.map(item => {
            let row = {}
            row.name = item.option
            row.value = item.votes
            this.state.chartdata.push(row)
        })
        this.setState(this.state.currentoptions)
        this.setState(this.state.chartdata)
        this.setState({ showchart: true })
    }
    handleNext() {
        this.setState({ showchart: false })
        if (this.state.count === this.state.polls.length - 1) {
            console.log('the last poll')
        }
        else {
            this.state.count = this.state.count + 1
            this.state.currentpoll = this.state.polls[this.state.count]
            this.state.currenttitle = this.state.polls[this.state.count].title
            this.state.currentoptions = this.state.polls[this.state.count].options
            this.setState(this.state.currentpoll)
            this.setState({ currenttitle: this.state.currenttitle })
            this.setState(this.state.currentoptions)
        }
    }
    handlePrev() {
        this.setState({ showchart: false })
        if (this.state.count === 0) {
            console.log('no prev')
        }
        else {
            this.state.count = this.state.count - 1
            this.state.currentpoll = this.state.polls[this.state.count]
            this.state.currenttitle = this.state.polls[this.state.count].title
            this.state.currentoptions = this.state.polls[this.state.count].options
            this.setState(this.state.currentpoll)
            this.setState({ currenttitle: this.state.currenttitle })
            this.setState(this.state.currentoptions)
        }
    }
    render() {
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#8884d8', '#008000'];
        return (
            <div id='holder' className='container'>
                <div className='col-md-6'>
                    <ul className="list-group ul">
                        <li className='ul'><h3>{this.state.currenttitle}</h3><br /></li>
                        {this.state.currentoptions.map((item, i) => {
                            return <li key={i} className='list'>&nbsp;<input type='radio' name='options' value={item.option} onClick={this.onOptionChange} />{item.option}<br /></li>
                        })}
                    </ul>
                    &nbsp; <button className='btn btn-success' id={this.state.currentpoll._id} onClick={this.votePoll}>Vote</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className='btn btn-success' onClick={this.createChart}>See Result in Chart</button><br /><br />
                    {this.state.showmsg ? <div className='alert alert-danger'>Choose an option to vote</div> : ''}
                </div>
                {this.state.showchart ?
                    <div className='col-md-6'>
                        <PieChart width={800} height={400} >
                            <Pie data={this.state.chartdata} cx={200} cy={200} innerRadius={50} outerRadius={150} fill="#8884d8" label={true}>
                                {this.state.chartdata.map((entry, index) =>
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                )}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </div> : ''}
                <div className='col-md-12'><br />
                    <ul className="pager">
                        <li><a href="#" onClick={this.handlePrev}>&larr; Previous</a></li>
                        <li><a href="#" onClick={this.handleNext}>Next &rarr;</a></li>
                    </ul>
                </div>
            </div >
        )
    }
}
export default Polls