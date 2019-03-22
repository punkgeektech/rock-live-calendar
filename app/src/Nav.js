import React from 'react'

class Nav extends React.Component {
  constructor(props) {
    super(props)

    const now = new Date()
    const current_month = parseInt(now.getMonth() + 1)

    this.state = {
      active: current_month
    }

    this.filterMonthHandler = this.filterMonthHandler.bind(this)
  }

  filterMonthHandler(e) {
    const month = e.target.getAttribute('data-month')
    this.props.navClick(month)
    this.setState({ active: parseInt(month) })
  }

  render() {
    const months = this.props.data.map((v, i) => {
      return (
        <li style={ this.state.active == v ? { backgroundColor: '#7183bb', color: '#fff' } : {  } } data-month={ v } key={ i } onClick={ this.filterMonthHandler }>{ v }</li>
      )
    })

    return (
      <ul id="nav">{ months }</ul>
    )
  }
}

export default Nav
