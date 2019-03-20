import React from 'react'
import List from './List'
import Nav from './Nav'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      months: [],
      current: null
    }

    this.getMonths = this.getMonths.bind(this)
    this.navClickHandler = this.navClickHandler.bind(this)
  }

  componentDidMount() {
    fetch('http://127.0.0.1:3001/api')
    .then(res => res.json())
    .then(data => {
      this.setState({ data })
      this.getMonths(data)
    })
  }

  getMonths(data) {
    const start_month = data[0].date.substr(4, 6)
    let months_list = []

    for (let i = Math.abs(parseInt(start_month)); i < 13; i++) {
      months_list.push(i)
    }

    this.setState({
      months: months_list,
      current: Math.abs(parseInt(start_month))
    })
  }

  navClickHandler(month) {
    this.setState({
      current: month
    })
  }

  render() {
    return (
      <div id="wrapper">
        <Nav data={ this.state.months } navClick={ this.navClickHandler } />
        <List data={ this.state.data } currentMonth={ this.state.current } />
      </div>
    )
  }
}

export default App
