import React from 'react'

class CalendarMonth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      monthLength: []
    }
  }

  componentDidMount() {
    // month grid max size
    for (let i = 1; i < 43; i++) {
      this.state.monthLength.push(null)
    }
  }

  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  render() {
    let firstDayWeek;
    const list = this.props.data.filter((v) => {
      const year = v.date.substr(0, 4)
      const current_month = parseInt(v.date.substr(5, 2))

      if (year == '2019') {
        if (current_month == this.props.current) {
          return v
        }
      }
    })

    // set the first day of month in week as an offset
    if (list[0] != undefined) {
      firstDayWeek = new Date(list[0].date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1/$2/$3")).getDay()
    }

    // get how many days in a month
    const maxDays = this.daysInMonth(this.props.current, 2019)
    const drawMonth = this.state.monthLength.map((v, i) => {
      const d = new Date()
      const nowDay = d.getDate()
      const nowMonth = d.getMonth() + 1

      // week-end style to break the line
      // anchor link
      // background color based on the day
      // use firstDayWeek offset to set the day number into right position
      
      return (
        <li key={ i } className={ i % 7 == 0 ? 'week-end' : '' }>
          <a href={`#2019-${ this.props.current < 10 ? "0"+this.props.current : this.props.current }-${ (i + 1 - firstDayWeek) < 10 ? "0"+(i + 1 - firstDayWeek) : (i + 1 - firstDayWeek) }`} className={ this.props.current != nowMonth ? ((this.props.current < nowMonth) ? 'bggrey' : '') : (i + 1 - firstDayWeek < nowDay ? 'bggrey' : (i + 1 - firstDayWeek == nowDay ? 'bgactive' : '')) }>
            { firstDayWeek != undefined ? (((i + 1 - firstDayWeek) > maxDays) || ((i + 1 - firstDayWeek) < 1) ? '' : i + 1 - firstDayWeek) : '' }
          </a>
        </li>
      )
    })

    return (
      <ul className="calendar-month">
        { drawMonth }
      </ul>
    )
  }
}

export default CalendarMonth
