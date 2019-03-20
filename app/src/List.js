import React from 'react'

class List extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const list = this.props.data.filter((v) => {
      const year = v.date.substr(0, 4)
      const current_month = Math.abs(parseInt(v.date.substr(4, 6)))

      if (year == '2019') {
        if (current_month == this.props.currentMonth) {
          return v
        }
      }
    })

    const items = list.map((v, i) => (
      <li key={ i }>
        { v.date }<br />
        Bands: { v.bands }<br />
        Location: { v.location }
      </li>
    ))

    return (
      <ul id="list">{ items }</ul>
    )
  }
}

export default List
