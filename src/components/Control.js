import React, { Component } from 'react'
import Search from './Search'
import Sort from './Sort'

export default class Control extends Component {
  render() {
    return (
      <div className="row mt-15">
        <Search onSearch={this.props.onSearch} />
        <Sort 
          onClickSort={this.props.onClickSort}
          sortBy = {this.props.sortBy}
          sortValue = {this.props.sortValue}
        />
      </div>
    )
  }
}
