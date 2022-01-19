import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TaskType} from "./Todolist";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


type PropsType = {
  id: string
  taskId: string
}

export const TaskRedux = React.memo(({taskId, id}: PropsType) => {
  console.log('Task')

  const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[id]
    .filter(task => task.id === taskId)[0]
  )
  const dispatch = useDispatch();

  const onClickHandler = useCallback(() => dispatch(removeTaskAC(taskId, id)), [taskId, id])
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(changeTaskStatusAC(task.id, newIsDoneValue, id));
  }, [taskId, id])
  const onTitleChangeHandler = useCallback((newValue: string) => {
    dispatch(changeTaskTitleAC(taskId, newValue, id));
  }, [taskId, id])

  return <div key={taskId} className={task.isDone ? "is-done" : ""}>
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


