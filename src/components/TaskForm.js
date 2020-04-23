import React, { Component } from 'react'

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name:'',
      status: false
    }
  }
  

  onCloseForm =() => {
    this.props.onCloseForm();
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status'){
      value = target.value === 'true' ? true : false;
    }
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onHandleSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name:'',
      state: false
    })
  }

  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            <span className="mr-2">Thêm Công Việc</span>
            <i className="fa fa-times" aria-hidden="true" 
            onClick={ this.onCloseForm }
            />
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" 
                className="form-control"
                name="name"
                value={ this.state.name }
                onChange={ this.onChange }
              />
            </div>
            <label>Trạng Thái :</label>
            <select 
              className="form-control" 
              required="required"
              name="status"
              value={ this.state.status }
              onChange={ this.onChange }
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
