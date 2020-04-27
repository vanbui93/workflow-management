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
      taskEditItem: null,
      filter: {
        name: '',
        status: -1
      },
      keyword:'',
      sortBy:'name', //mặc định sắp xếp theo tên
      sortValue: 1
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

  // Xử lý khi nhấp vào button thêm mới, kiểm tra nếu trước đó bấm vào 'sửa button' -> 'thêm mới button', thì TH1, vẫn cho hiển thị form và reset giá trị form
  onToggleForm = () => {
    //Trường hợp 'sửa button' -> 'thêm mới button'
    if(this.state.isDisplayForm && this.state.taskEditItem !==null) {
      console.log('th1');
      this.setState({
        isDisplayForm: true,
        taskEditItem: null
      });
    } else { // trường hợp 'thêm mới button' ban đầu
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditItem: null
      })
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditItem: null //clear data
    })
  }

  onHandleSubmit = (data) => {
    var {tasks} = this.state;
    console.log(data);
    if(data.id === ''){
      data.id = this.generateID();
      tasks.push(data);
    } else {
      //Editing
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditItem:null
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

  componentWillUnmount() {
    console.log('Component WILL UNMOUNT!')
 }

 //Lọc
 onFilter = (filterName,filterStatus) => {
  console.log(filterName,filterStatus); 
  // console.log(typeof FilterStatus); //kiểm tra kiểu dữ liệu
  filterStatus = parseInt(filterStatus,10); // chuyển qua kiểu number

  //cập nhật lại state của task
  this.setState({
    filter: {
      name: filterName.toLowerCase(), //Chuyển mọi kí tự thành chữ thường
      status: filterStatus
    }
  })
 }

 onSearch = (keyword) => {
  //  console.log(keyword);
  this.setState({
    keyword: keyword
  })
 }

 onClickSort = (sortBy,sortValue) => {
  this.setState({
    sortBy:sortBy,
    sortValue:sortValue
  });
  console.log(this.state.sortBy,this.state.sortValue);
 }


  render() {
    var {tasks, isDisplayForm, taskEditItem,filter,keyword, sortBy,sortValue} = this.state;
    
    //Tiến hành render kết quả
    if(filter) { //Nếu tồn tại biến filter
      if(filter.name !=='') {   //kiểm tra nếu filter có giá trị, tức nếu người dùng nhập
        tasks = tasks.filter((taskFilter) => {
          return taskFilter.name.toLowerCase().indexOf(filter.name) !== -1; //indexOf trả về vị trí đầu tiên của 1 chuỗi, #-1 nghĩa là có tìm thấy giá trị filter
        })
      }
      // ở status ko cần kiểm tra vì mặc định đã có giá trị
      tasks = tasks.filter((taskFilter) => {
        if(filter.status === -1) { // nếu status === -1 thì trả về tất cả, do set state từ trước
          return taskFilter
        } else {
          return taskFilter.status === (filter.status === 1 ? true : false) // nếu status : 1 thì true, ngược lại false
        }
      })
    }

    if(keyword){
      tasks = tasks.filter((taskFilter) => {
        return taskFilter.name.toLowerCase().indexOf(keyword) !== -1; //indexOf trả về vị trí của 1 chuỗi
      })
    }
    
    
    var elmTaskForm = isDisplayForm === true 
      ? 
        <TaskForm 
          onCloseForm = { this.onCloseForm }
          onHandleSubmit = { this.onHandleSubmit }
          taskEditItem = { taskEditItem }
        /> 
      : 
       '';

    if(sortBy === 'name'){  // sort theo name
      tasks.sort((a,b) => {
        if(a.name >b.name) return sortValue;
        else if(a.name < b.name) return -sortValue;
        else return 0;
      });
    } else { // sort theo status
      tasks.sort((a,b) => {
        if(a.status >b.status) return -sortValue; //nếu return -1 thì 'name' tăng dần, trả về sortValue (đã set giá trị rồi) chứ ko set cứng
        else if(a.name < b.name) return sortValue; //nếu return 1 thì 'name' giảm dần
        else return 0;
      });
    }

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
            <button type="button" className="btn btn-primary mb-3 mr-2" onClick={ this.onToggleForm }><i className="fa fa-plus mr-2"/>Thêm Công Việc</button>
            {/* <button type="button" className="btn btn-danger mb-3" onClick={() => this.onGenerateData()}><i className="fa fa-plus mr-2"/>Generate data</button> */}
            <Control 
              onSearch={this.onSearch}
              onClickSort={this.onClickSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                  tasks={tasks} 
                  onUpdateStatus = { this.onUpdateStatus } 
                  onDelete = {this.onDelete}
                  onUpdate = {this.onUpdate}
                  onFilter = {this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}