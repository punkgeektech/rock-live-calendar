import React from 'react'
import ListItem from './ListItem'

class ListDetailItems extends React.Component {
  constructor(props) {
    super(props)

    this.findBandValues = this.findBandValues.bind(this)
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
    let v = this.props.value
    let i = this.props.index
    let items = this.props.items

    return (
      <li className={ new Date(v.date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1/$2/$3")) - this.props.now < 0 ? ( this.props.ifNow ? "list-item today-item" : "list-item out-dated-item" ) : "list-item"}>
        <div className="item-date">
          {/* conbine same month date */}
          { items[i].date == (items[i - 1] != undefined ? items[i - 1] : items[items.length - 1]).date ? '' : items[i].date }
        </div>
        <div className="item-detail">
          { v.bands.map((vv, ii) => {
              let value = this.findBandValues(vv)
              let bgcolor = { backgroundColor: 'rgba(162,170,197,0.1)' }

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
                <React.Fragment key={ vv }>
                  <ListItem value={ vv } bgColor={ bgcolor } bandValue={ value } />
                </React.Fragment>
              )
            }) }<br />
            <span className="detail-location"><i className="fas fa-map-marker-alt"></i>{ v.location }</span>
        </div>
      </li>
    )
  }
}

export default ListDetailItems
