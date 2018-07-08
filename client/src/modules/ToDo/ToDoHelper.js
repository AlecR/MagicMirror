const cookieName = 'todoist_token';

const authorizeUser = (query) => {
  if(!query) return;
  const requestURL = `http://localhost:3001/api/todo/auth${query}`;
  fetch(requestURL).then(response => {
    return response.json();
  }).then(token => {
    if(token.error || !token.access_token) return;
    const accessToken = token.access_token;
    document.cookie = `${cookieName}=${accessToken};path=/`;
    window.location.href = "http://localhost:3000/dashboard"
  }).catch(err => {
    console.log(err);
  })
}

const getToDoProjects = (callback) => {
  const requestURL = 'http://localhost:3001/api/todo/projects'
  fetch(requestURL, {
    credentials: "include"
  }).then(response => {
    return response.json()
  }).then(json => {
    callback(json);
  }).catch(err => {
    console.log(err);
  })
}

const getToDoTasks = (callback) => {
  const requestURL = 'http://localhost:3001/api/todo/tasks'
  fetch(requestURL, {
    credentials: "include"
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
  const requestURL = `http://localhost:3001/api/todo/tasks/${id}/close`;
  fetch(requestURL, {
    credentials: "include"
  }).then(response => {
    return response.json()
  }).then(json => {
    callback(json);
  }).catch(err => {
    console.log(err);
  })
}


const isAuthorized = () => {
  return getCookieValue(cookieName) != null;
}

function getCookieValue(name) {
  var cookie = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookie ? cookie.pop() : null;
}

export default { authorizeUser, isAuthorized, getToDoData, closeTask }