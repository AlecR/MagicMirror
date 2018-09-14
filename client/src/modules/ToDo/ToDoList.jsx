import React from 'react';

const ToDoList = (props) => {
  const sortedTasks = props.tasks.sort((taskOne, taskTwo) => {
    let taskOneDate = new Date();
    let taskTwoDate = new Date();
    if(taskOneDate.due){
      taskOneDate = new Date(taskOneDate.due.date);
    }
    if(taskTwoDate.due){
      taskTwoDate = new Date(taskTwoDate.due.date);
    }
    console.log(taskOneDate);
    console.log(taskTwoDate);
    return taskOneDate > taskTwoDate;
  })
  return (
    <div className='todo-list'>  
      <table>
      <caption>To Do List</caption>
        <tbody>
          {sortedTasks.map(task => {
            const dateOptions = { weekday: 'long', month: 'long', day: 'numeric'};
            let dueDate = null;
            if(task.due) {
              dueDate = new Date(task.due.date).toLocaleDateString('en-US', dateOptions);
            }
            const projectName = props.projects[task.project_id].name;
            const imageName = task.completed ? './assets/checked.png' : './assets/unchecked.png';
            return (
              <tr
                className='todo-row'
                key={task.id}
              >
                <td className='todo-row-wrapper'>
                  <div className='todo-row-left'>
                    <div className='todo-row-header'>
                      <div className='grid-title'>
                        {task.content}
                      </div>
                    </div>
                    <div className='todo-row-footer'>
                      <div className='grid-due-date'>
                        {dueDate}
                      </div>
                      <div className='grid-project'>
                        {projectName}
                      </div>
                    </div>
                  </div>
                  <div className='todo-row-right'>
                    <div className='grid-button'>
                      <img 
                        src={require(`${imageName}`)}
                        alt='check-button'
                        onClick={(e) => props.onCheckClick(e, task)}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
 

export default ToDoList;
