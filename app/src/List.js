import React from 'react'
import Fade from 'react-reveal/Fade';

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
      const current_month = parseInt(v.date.substr(5, 2))

      if (year == '2019') {
        if (current_month == this.props.currentMonth) {
          return v
        }
      }
    })

    // sort list by date
    const sorted_list = list.sort(function(a, b) {
      return new Date(a.date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1/$2/$3")) - new Date(b.date.replace( /(\d{4})-(\d{2})-(\d{2})/, "$1/$2/$3"))
    })

    const now = new Date()

    const items = list.map((v, i, items) => {
      const month = now.getMonth() + 1
      const day = now.getDate()
      // check if is today's date
      const ifNow = parseInt(v.date.substr(5, 2)) == month && parseInt(v.date.substr(8, 2)) == day

      return (
        // add different classes depends on the date
        <Fade bottom delay={ 100 } duration={ 500 } distance={'20px'} key={ i }>
          <li className={ new Date(v.date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1/$2/$3")) - now < 0 ? ( ifNow ? "list-item today-item" : "list-item out-dated-item" ) : "list-item"}>
            <div className="item-date">
              {/* conbine same month date */}
              { items[i].date == (items[i - 1] != undefined ? items[i - 1] : items[items.length - 1]).date ? '' : items[i].date }
            </div>
            <div className="item-detail">
              { v.bands.map((vv, ii) => {
                  let value = this.findBandValues(vv)
                  let bgcolor = { backgroundColor: '#a2aac5' }

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
                    <span className="detail-name" data-name={ vv } style={ bgcolor } data-value={ value } key={ vv } onClick={ this.updateBandValue }>
                      { vv }
                    </span>
                  )
                }) }<br />
                <span className="detail-location"><i class="fas fa-map-marker-alt"></i>{ v.location }</span>
            </div>
          </li>
        </Fade>
      )
    })

    return (
      <ul id="list">{ items }</ul>
    )
  }
}

export default List
