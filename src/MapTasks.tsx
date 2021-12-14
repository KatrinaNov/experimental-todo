import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import EditableSpan from "./components/EditableSpan";

type MapTasksType = {
  tasks: Array<TaskType>
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  todolistId: string
  upDateTask: (todolistId: string, taskId: string, title: string) => void
}

const MapTasks = ({tasks, removeTask, todolistId, ...props}: MapTasksType) => {

  const updateTaskTitle = (title: string, taskId: string) => {
    props.upDateTask(todolistId, taskId, title)
  }

  return (
    <ul>
      {
        tasks.map(t => {
          const onClickHandler = () => removeTask(todolistId, t.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
          }

          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            {/*<span>{t.title}</span>*/}
            <EditableSpan
              title={t.title}
              callbackForEditableSpan={(title) => updateTaskTitle(title, t.id)}/>
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
  );
};

export default MapTasks;