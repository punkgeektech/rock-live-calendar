import React from 'react'
import CalendarMonth from './CalendarMonth'

class Calendar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="float-calendar">
        <CalendarMonth current={ this.props.current } data={ this.props.data } />
      </div>
    )
  }
}

export default Calendar
