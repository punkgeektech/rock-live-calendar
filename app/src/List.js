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

    const items = list.map((v, i, items) => (
      <li key={ i }>
        <div>
          { items[i].date == (items[i - 1] != undefined ? items[i - 1] : items[items.length - 1]).date ? '' : items[i].date }
        </div>
        <div>
          Bands: { v.bands.map((vv) => (
                    <span key={ vv }>
                      { vv }
                    </span>
                  )) }<br />
          Location: { v.location }
        </div>
      </li>
    ))

    return (
      <ul id="list">{ items }</ul>
    )
  }
}

export default List
