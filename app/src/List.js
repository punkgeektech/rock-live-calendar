import React, { Component } from 'react';

class List extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const list = this.props.data
    const items = list.map((v) => (
      <li>
        { v.date }<br />
        Bands: { v.bands }<br />
        Location: { v.location }
      </li>
    ))

    return (
      <ul>{ items }</ul>
    )
  }
}

export default List;
