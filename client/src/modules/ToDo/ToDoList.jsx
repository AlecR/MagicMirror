import React from 'react';

const ToDoList = (props) => {
  console.log(props);
  const sortedTasks = props.tasks.sort((taskOne, taskTwo) => {
    const taskOneDate = new Date(taskOne.due.date);
    const taskTwoDate = new Date(taskTwo.due.date);
    return taskOneDate > taskTwoDate;
  })
  return (
    <div className='todo-list'>  
      <table>
      <caption>To Do List</caption>
        <tbody>
          {sortedTasks.map(task => {
            const dateOptions = { weekday: 'long', month: 'long', day: 'numeric'};
            const dueDate = new Date(task.due.date).toLocaleDateString('en-US', dateOptions);
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
