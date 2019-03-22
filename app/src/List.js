import React from 'react'
import Fade from 'react-reveal/Fade'
import ListDetailItems from './ListDetailItems'

class List extends React.Component {
  constructor(props) {
    super(props)
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
          <ListDetailItems value={ v } index={ i } items={ items } values={ this.props.values } ifNow={ ifNow } now={ now } />
        </Fade>
      )
    })

    return (
      <ul id="list">{ items }</ul>
    )
  }
}

export default List
