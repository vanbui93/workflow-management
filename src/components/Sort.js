import React, { Component } from 'react'

export default class Sort extends Component {

  // componentWillReceiveProps(nextProps){
  //   console.log(nextProps);
  // }

  onClickSort = (sortBy, sortValue) => {
    this.props.onClickSort(sortBy, sortValue) //props ban đầu (App -> Sort)
    console.log(sortBy,sortValue); //sau khi truyền ngược lại props (Sort.js -> App.js -> Sort.js)
  }

  render() {    
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Sắp Xếp</button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={()=> this.onClickSort('name',1)}>
              <button
                className={(this.props.sortBy === 'name' && this.props.sortValue === 1) ? 'sort-selected' : ''}
              >
                <i className="fa fa-sort-alpha-asc pr-5">Tên A-Z</i>
              </button>
            </li>
            <li onClick={()=> this.onClickSort('name',-1)}>
              <button
                className={(this.props.sortBy ==='name' && this.props.sortValue === -1) ? 'sort-selected' : ''}
              >
                <i className="fa fa-sort-alpha-desc pr-5">Tên Z-A</i>
              </button>
            </li>
            <li role="separator" className="divider" />
            <li  onClick={()=> this.onClickSort('status',1)}>
              <button
                className={(this.props.sortBy ==='status' && this.props.sortValue === 1) ? 'sort-selected' : ''}
                >
                Trạng Thái Kích Hoạt
              </button>
            </li>
            <li onClick={()=> this.onClickSort('status',-1)}>
              <button
                className={(this.props.sortBy ==='status' && this.props.sortValue === -1) ? 'sort-selected' : ''}
              >
                Trạng Thái Ẩn
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
