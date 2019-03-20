import React from 'react'

class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.filterMonthHandler = this.filterMonthHandler.bind(this)
  }

  filterMonthHandler(e) {
    const month = e.target.getAttribute('data-month')
    this.props.navClick(month)
  }

  render() {
    const months = this.props.data.map((v, i) => (
      <li data-month={ v } key={ i } onClick={ this.filterMonthHandler }>{ v }</li>
    ))

    return (
      <ul id="nav">{ months }</ul>
    )
  }
}

export default Nav
