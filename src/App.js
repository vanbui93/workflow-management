import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Control from './components/Control';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        
      ]
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
  
  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateID(),
        name:"hoc lap trinh",
        status: true
      },
      {
        id: this.generateID(),
        name:"hoc lap do hoa",
        status: true
      },
      {
        id: this.generateID(),
        name:"hoc react",
        status: false
      }
    ];
    // console.log(tasks);
    this.setState({
      tasks: tasks
    })

    //gán dữ liệu cho localStorage
    localStorage.setItem(
      'tasks', JSON.stringify(tasks)
    )
    
  }

  render() {
    var {tasks} = this.state;
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <TaskForm />
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <button type="button" className="btn btn-primary mb-3 mr-2"><i className="fa fa-plus mr-2"/>Thêm Công Việc</button>
            <button type="button" className="btn btn-danger mb-3" onClick={() => this.onGenerateData()}><i className="fa fa-plus mr-2"/>Generate data</button>
            <Control/>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList tasks={tasks}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}