import React from 'react'

class BandRank extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sortedList = this.props.data.sort((a, b) => {
      return b.value - a.value
    })

    const rankItems = sortedList.slice(0, 10).map((v, i) => {
      if (v.value >= 1) {
        return (
          <li key={ i }>{ v.name }</li>
        )
      }
    })

    return (
      <ul id="band-rank">
      <h5>Likes</h5>
      { rankItems }
      </ul>
    )
  }
}

export default BandRank
