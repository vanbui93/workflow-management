import React, { Component } from 'react'

export default class TaskItem extends Component {
  render() {
    var {task,index} = this.props;
    // console.log(task.status);
    
    return (
      <tr>
        <td>{index +1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span className={ task.status === true ? 'label btn btn-success' : 'label btn btn-warning'} >
            {task.status === true ? 'Kích Hoạt' : 'Ẩn'}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning mr-3"><i className="fa fa-pencil mr-2" />Sửa</button>
          <button type="button" className="btn btn-danger"><i className="fa fa-trash mr-2" />Xóa</button>
        </td>
      </tr>
    )
  }
}
