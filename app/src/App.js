import React from 'react'
import List from './List'
import Nav from './Nav'
import Calendar from './Calendar'
import BandRank from './BandRank'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],    // store event list
      months: [],    // store available months for current year
      current: null,    // active month
      bandValues: []    // store band value pairs
    }

    this.getMonths = this.getMonths.bind(this)
    this.navClickHandler = this.navClickHandler.bind(this)
  }

  componentDidMount() {
    fetch('http://127.0.0.1:3001/api/lists')
    .then(res => res.json())
    .then(data => {
      this.setState({ data: data.data })
      this.getMonths(data.data)
    })

    fetch('http://127.0.0.1:3001/api/bands')
    .then(res => res.json())
    .then(data => {
      this.setState({ bandValues: data.data })
    })
  }

  getMonths(data) {
    const year = data[0].date.substr(0, 4)
    const start_month = data[0].date.substr(5, 2)
    const now = new Date()
    let end_month = ''
    let months_list = []

    for (let i = data.length - 1; i > 0; i--) {
      if (data[i].date.substr(0, 4) == year) {
        end_month = data[i].date.substr(5, 2)
        break
      }
    }

    for (let i = parseInt(start_month); i <= parseInt(end_month); i++) {
      // generate month list
      months_list.push(i)
    }

    this.setState({
      months: months_list,
      current: parseInt(now.getMonth() + 1)
    })
  }

  navClickHandler(month) {
    this.setState({
      current: month
    })
  }

  render() {
    return (
      <React.Fragment>
        {/*<img id="logo" src="./guitar.svg" />*/}
        <div id="wrapper">
          <Nav data={ this.state.months } navClick={ this.navClickHandler } />
          <List data={ this.state.data } currentMonth={ this.state.current } values={ this.state.bandValues } />
          <Calendar data={ this.state.data } months={ this.state.months } current={ this.state.current } />
          <BandRank data={ this.state.bandValues } />
        </div>
      </React.Fragment>
    )
  }
}

export default App
