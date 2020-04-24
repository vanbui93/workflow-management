import React, { Component } from 'react'
import Search from './Search'

export default class Control extends Component {
  render() {
    return (
      <div className="row mt-15">
        <Search onSearch={this.props.onSearch} />
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Sắp Xếp</button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li>
                <a href="/"><i className="fa fa-sort-alpha-asc pr-5">Tên A-Z</i></a>
              </li>
              <li>
                <a href="/"><i className="fa fa-sort-alpha-desc pr-5">Tên Z-A</i></a>
              </li>
              <li role="separator" className="divider" />
              <li><a href="/">Trạng Thái Kích Hoạt</a></li>
              <li><a href="/">Trạng Thái Ẩn</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
