import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Control from './components/Control';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditItem: null
    }
  }

  // đưa data localStorage vào trong cwm để khi load lại trạng thì ko bị mất dữ liệu
  componentWillMount() {
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }
  
  random = () => {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1)
  }

  generateID = () => {
    return this.random() + this.random() + '-' +this.random() + '-' + this.random() + '-' + this.random() + '-' + this.random() + '-' + this.random() + '-' + this.random();
  }

  // onGenerateData = () => {
  //   var tasks = [
  //     {
  //       id: this.generateID(),
  //       name:"hoc lap trinh",
  //       status: true
  //     },
  //     {
  //       id: this.generateID(),
  //       name:"hoc lap do hoa",
  //       status: true
  //     },
  //     {
  //       id: this.generateID(),
  //       name:"hoc react",
  //       status: false
  //     }
  //   ];
  //   // console.log(tasks);
  //   this.setState({
  //     tasks: tasks
  //   })

  //   //gán dữ liệu cho localStorage
  //   localStorage.setItem(
  //     'tasks', JSON.stringify(tasks)
  //   )
    
  // }

  onChangeForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    })
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }

  onHandleSubmit = (data) => {
    var {tasks} = this.state;
    console.log(data);
    data.id = this.generateID();
    tasks.push(data);
    this.setState({
      tasks: tasks
    })

    // đưa vào localStorage để lưu trữ mỗi lần load lại trang
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  onUpdateStatus = (id) => {
    // console.log(id);
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = ! tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  findIndex = (id) => {
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if(task.id === id){ // kiểm tra id bằng id truyền từ TaskItem vào, thì trả về vị trí index
        result = index;
      }
    });
    return result;
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index,1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  //khi click button sửa thì show form ra
  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditItem = tasks[index];
    this.setState({
      taskEditItem: taskEditItem
    })
    
    //mở form khi click vào sửa
    this.onShowForm()
  }

  render() {
    var {tasks, isDisplayForm, taskEditItem} = this.state;
    var elmTaskForm = isDisplayForm === true 
      ? 
        <TaskForm 
          onCloseForm = { this.onCloseForm } 
          onHandleSubmit = { this.onHandleSubmit }
          task = { taskEditItem }
        /> 
      : 
       '';

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-4">
            {elmTaskForm}
          </div>
          <div className={ isDisplayForm ? 'col-8' : 'col-12' }>
            <button type="button" className="btn btn-primary mb-3 mr-2" onClick={ this.onChangeForm }><i className="fa fa-plus mr-2"/>Thêm Công Việc</button>
            {/* <button type="button" className="btn btn-danger mb-3" onClick={() => this.onGenerateData()}><i className="fa fa-plus mr-2"/>Generate data</button> */}
            <Control/>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                  tasks={tasks} 
                  onUpdateStatus = { this.onUpdateStatus } 
                  onDelete = {this.onDelete}
                  onUpdate = {this.onUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}