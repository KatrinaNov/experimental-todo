import React from 'react';
import {FilterValuesType} from './App';
import MapTasks from "./MapTasks";
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button} from "@material-ui/core";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
  todolistId: string
  removeTodolist: (todolistId: string) => void
  upDateTask: (todolistId: string, taskId: string, title: string) => void
  updateTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {

  const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
  const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
  const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

  const callbackHandler = (title: string) => {
    props.addTask(props.todolistId, title.trim());
  }
  const updateTodolistTitle = (title: string) => {
    props.updateTodolistTitle(props.todolistId, title)
  }
  return <div>
    <h3>
      <EditableSpan
        title={props.title}
        callbackForEditableSpan={updateTodolistTitle}/>
      {/*{props.title}*/}
      <Button
        style={{padding: '4px', minWidth: '30px', minHeight: '30px'}}
        variant="contained"
        size='small'
        onClick={() => props.removeTodolist(props.todolistId)}>x</Button>
      {/*<button onClick={() => props.removeTodolist(props.todolistId)}>x</button>*/}
    </h3>
    <AddItemForm callback={callbackHandler}/>

    <MapTasks
      tasks={props.tasks}
      removeTask={props.removeTask}
      todolistId={props.todolistId}
      changeTaskStatus={props.changeTaskStatus}
      upDateTask={props.upDateTask}
    />
    <div>
      <button className={props.filter === 'all' ? "active-filter" : ""}
              onClick={onAllClickHandler}>All
      </button>
      <button className={props.filter === 'active' ? "active-filter" : ""}
              onClick={onActiveClickHandler}>Active
      </button>
      <button className={props.filter === 'completed' ? "active-filter" : ""}
              onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>
}
