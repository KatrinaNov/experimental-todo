import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
}

export function TodolistRedux(props: PropsType) {
  const todolist = useSelector<AppRootStateType, TodolistType>((state) => state.todolists
    .filter(todo => todo.id === props.id)[0])
  let tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[props.id])
  const dispatch = useDispatch()

  const addTask = (title: string) => {
    dispatch(addTaskAC(title, props.id))
  }
  const removeTodolist = () => {
    dispatch(removeTodolistAC(props.id))
  }
  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC(props.id, title))
  }

  const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "all"));
  const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "active"));
  const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "completed"));


  if (todolist.filter === "active") {
    tasks = tasks.filter(t => t.isDone === false);
  }
  if (todolist.filter === "completed") {
    tasks = tasks.filter(t => t.isDone === true);
  }

  return <div>
    <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
      {
        tasks.map(t => {
          const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
          }
          const onTitleChangeHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(t.id, newValue, props.id))
          }


          return <div key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox
              checked={t.isDone}
              color="primary"
              onChange={onChangeHandler}
            />

            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
              <Delete/>
            </IconButton>
          </div>
        })
      }
    </div>
    <div>
      <Button variant={todolist.filter === 'all' ? "contained" : 'outlined'}
              onClick={onAllClickHandler}
              color={'secondary'}
      >All
      </Button>
      <Button variant={todolist.filter === 'active' ? "contained" : 'outlined'}
              onClick={onActiveClickHandler}
              color={'primary'}>Active
      </Button>
      <Button variant={todolist.filter === 'completed' ? "contained" : 'outlined'}
              onClick={onCompletedClickHandler}
              color={'success'}>Completed
      </Button>
    </div>
  </div>
}


