import React, { Component } from 'react';
import Module from 'core/Module';
import LoadingSpinner from 'core/shared/LoadingSpinner';
import { Route } from 'react-router-dom';
import ToDoHelper from './ToDoHelper.jsx';
import ToDoList from './ToDoList';
import './ToDo.css';

const AuthRouter = () => (
  <Route 
    path='/dashboard/todo/authenticate'
    render={() => {
      const query = window.location.search;
      ToDoHelper.authorizeUser(query);
      return null;
    }}
  />
)

const UnauthorizedScreen = () => (
  <div className='unauthorized-screen'>
    <h1>Cant access your data - Login required </h1>
    <button
      onClick={(e) => {
        e.stopPropagation();
        const clientId = "4ddd8c32dc914bc7b5f5ef4b4f8637b3";
        const scope = "data:read_write,data:delete";
        const clientSecret = "ae06fdc4a4084f96986b836fd615632c";
        window.location.href = `https://todoist.com/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${clientSecret}`
      }}
    >Log In</button>
  </div>
)
  

export default class ToDo extends Component {

  state = {
    authorized: false,
    tasks: [],
    projects: {},
    timeouts: {}
  }

  componentDidMount() {
    ToDoHelper.isAuthorized(authorized => {
      if (authorized) {
        this.setState({ authorized });
        this.fetchData();
      }
    });
  }

  toggleTask = (event, task) => {
    event.stopPropagation();
    const tasks = this.state.tasks;
    const timeouts = this.state.timeouts;
    for(var i = 0; i < tasks.length; i++) {
      if(tasks[i].id === task.id) {
        tasks[i].completed = !tasks[i].completed;
        if (tasks[i].completed) {
          timeouts[task.id] = setTimeout(() => {
            ToDoHelper.closeTask(task.id, response => {
              console.log(response);
            });
          }, 5000)
        } else {
          const id = timeouts[task.id]
          clearTimeout(id);
        }
        break;
      }
    }
    this.setState({ tasks, timeouts });
  }

  fetchData = () => {
    ToDoHelper.getToDoData(data => {
      this.setState({ 
        projects: data.projects,
        tasks: data.tasks
       })
    })
  }

  render() {
    return(
      <Module
        name='ToDo'
        popoutHeight={500} // Change this to adjust the height of your popout
        popoutWidth={500}  // Change this to adjust the width of your popout
        popoutView={null}
      >
        {this.state.tasks.length > 0 ? (
          this.state.authorized ? (
            <ToDoList 
              tasks={this.state.tasks}
              projects={this.state.projects}
              onCheckClick={this.toggleTask}
            />
          ) : (
            <UnauthorizedScreen />
          )
        ) : (
          <LoadingSpinner 
            loadingText='Loading Todoist Tasks...'
          />
        )}
        
        <AuthRouter />
      </Module>
    )
  }
}

