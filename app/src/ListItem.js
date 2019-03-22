import React from 'react'

class ListDetailItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      likedItem: false,
      itemOnHover: false
    }

    this.updateBandValue = this.updateBandValue.bind(this)
    this.hoverHandler = this.hoverHandler.bind(this)
    this.hoverLeaveHandler = this.hoverLeaveHandler.bind(this)
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

    this.setState({ likedItem: true })
  }

  hoverHandler() {
    this.setState({ itemOnHover: true })
  }

  hoverLeaveHandler() {
    this.setState({ itemOnHover: false })
  }

  render() {
    let vv = this.props.value
    let bgColor = this.props.bgColor

    return (
      <span onMouseEnter={ this.hoverHandler } onMouseLeave={ this.hoverLeaveHandler } className="detail-name" style={ bgColor } data-name={ vv } data-value={ this.props.bandValue } onClick={ this.updateBandValue }>
        { vv }<span data-name={ vv } data-value={ this.props.bandValue } onClick={ this.updateBandValue } className="like-button" style={ this.state.itemOnHover || this.state.likedItem ? { display: 'block' } : { display: 'none' } }><i data-name={ vv } data-value={ this.props.bandValue } onClick={ this.updateBandValue } className={ this.state.likedItem ? "fas fa-heart" : "far fa-heart"}></i></span>
      </span>
    )
  }
}

export default ListDetailItems
