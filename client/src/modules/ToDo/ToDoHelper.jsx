import { SERVER_URL } from 'lib/constants';
import React from 'react';
import { Redirect } from 'react-router-dom';

const authorizeUser = (query) => {
  if(!query) {
    console.log('No query provided. Returning');
    return;
  }
  const requestURL = `${SERVER_URL}/api/todo/auth${query}`;
  fetch(requestURL, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(_ => {
    return <Redirect to="/dashboard"/>
  }).catch(err => {
    console.log(err);
  })
}

const isAuthorized = (callback) => {
  const requestURL = `${SERVER_URL}/api/todo/authorized`;
  fetch(requestURL, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  }).then(response => {
    return response.json()
  }).then(json => {
    const authorized = json.authorized;
    callback(authorized);
  }).catch(err => {
    console.log(err);
    return;
  })
}

const getToDoProjects = (callback) => {
  const requestURL = `${SERVER_URL}/api/todo/projects`
  fetch(requestURL, {
    credentials: 'include'
  }).then(response => {
    return response.json()
  }).then(json => {
    callback(json);
  }).catch(err => {
    console.log(err);
  })
}

const getToDoTasks = (callback) => {
  const requestURL = `${SERVER_URL}/api/todo/tasks`
  fetch(requestURL, {
    credentials: 'include', 
  }).then(response => {
    return response.json()
  }).then(json => {
    callback(json);
  }).catch(err => {
    console.log(err);
  })
}

const getToDoData = (callback) => {
  const todoProjects = {};
  const todoTasks = [];
  getToDoProjects(projects => {
    projects.forEach(project => {
      todoProjects[project.id] = {
        name: project.name
      }
    })
    getToDoTasks(tasks => {
      tasks.forEach(task => {
        todoTasks.push(task);
      })
      callback({projects: todoProjects, tasks});
    })  
  })
}

const closeTask = (id, callback) => {
  const requestURL = `${SERVER_URL}/api/todo/tasks/${id}/close`;
  fetch(requestURL, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  }).then(response => {
    return response.json()
  }).then(json => {
    callback(json);
  }).catch(err => {
    console.log(err);
  })
}

export default { authorizeUser, isAuthorized, getToDoData, closeTask }