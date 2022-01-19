import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TaskType} from "./Todolist";


type PropsType = {
  id: string
  task: TaskType
  removeTask: (taskId: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo(({task, removeTask, changeTaskStatus, changeTaskTitle, id}: PropsType) => {
  console.log('Task')

  const onClickHandler = useCallback(() => removeTask(task.id, id), [task.id, id, removeTask])
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    changeTaskStatus(task.id, newIsDoneValue, id);
  }, [task.id, id, changeTaskStatus])
  const onTitleChangeHandler = useCallback((newValue: string) => {
    changeTaskTitle(task.id, newValue, id);
  }, [task.id, id, changeTaskTitle])

  return <div key={task.id} className={task.isDone ? "is-done" : ""}>
    <Checkbox
      checked={task.isDone}
      color="primary"
      onChange={onChangeHandler}
    />

    <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
    <IconButton onClick={onClickHandler}>
      <Delete/>
    </IconButton>
  </div>

})


