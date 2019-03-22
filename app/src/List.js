import React from 'react'

class List extends React.Component {
  constructor(props) {
    super(props)

    this.updateBandValue = this.updateBandValue.bind(this)
    this.findBandValues = this.findBandValues.bind(this)
  }

  updateBandValue(e) {
    const name = e.target.getAttribute('data-name')
    const value = e.target.getAttribute('data-value')

    fetch('http://127.0.0.1:3001/api/bands/' + name, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ value: parseInt(value) + 1 })  // increase band value
    })
    .then(res => res.text())
    .then(res => console.log(res))
  }

  findBandValues(name) {
    // Searching Algorithm
    // NEED TO BE MORE OPTIMAL
    for (let i = 0; i < this.props.values.length; i++) {
      if (this.props.values[i].name == name) {
        return this.props.values[i].value
        break
      }
    }
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
          // conbine same month date
          { items[i].date == (items[i - 1] != undefined ? items[i - 1] : items[items.length - 1]).date ? '' : items[i].date }
        </div>
        <div>
          Bands: { v.bands.map((vv, ii) => {
                    let value = this.findBandValues(vv)
                    let bgcolor = { backgroundColor: '#efefef' }

                    for (i = 1; i < 11; i++) {
                      if ( value == i ) {
                        // use background color to measure the value of band
                        // Max color(darkest color) rgb(255, 120, 0) -- Min color(lightest color) rgb(255, 230, 220)
                        // For test use: value criterion range (1 - 10), step: 1
                        bgcolor = { backgroundColor: `rgb(255, ${ 230 - (i - 1) * 10 }, ${ 220 - (i - 1) * 20 })` }
                        break
                      }
                    }

                    // set darkest color while value is over the max
                    if (value > 10) {
                      bgcolor = { backgroundColor: 'rgb(255, 120 , 0)' }
                    }

                    return (
                      <span data-name={ vv } style={ bgcolor } data-value={ value } key={ vv } onClick={ this.updateBandValue }>
                        { vv }
                      </span>
                    )
                  }) }<br />
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
