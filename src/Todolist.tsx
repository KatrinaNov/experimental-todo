import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./Task";
import {TaskRedux} from "./TaskRedux";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id);
  }, [props.addTask, props.id])

  const removeTodolist = useCallback(() => {
    props.removeTodolist(props.id);
  }, [props.removeTodolist, props.id])
  const changeTodolistTitle = useCallback((title: string) => {
    props.changeTodolistTitle(props.id, title);
  }, [props.changeTodolistTitle])

  const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id, props.changeFilter]);
  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id, props.changeFilter]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id, props.changeFilter]);

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
  }
  if (props.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
  }

  return <div>
    <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
      {
        tasksForTodolist.map(t => {
          // return <Task
          //   key = {t.id}
          //   id = {props.id}
          //   task = {t}
          //   removeTask={props.removeTask}
          //   changeTaskTitle={props.changeTaskTitle}
          //   changeTaskStatus={props.changeTaskStatus}
          // />
          return <TaskRedux key={t.id}
                            id={props.id}
                            taskId={t.id}
          />
          // const onClickHandler = () => props.removeTask(t.id, props.id)
          // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
          //     let newIsDoneValue = e.currentTarget.checked;
          //     props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          // }
          // const onTitleChangeHandler = (newValue: string) => {
          //     props.changeTaskTitle(t.id, newValue, props.id);
          // }
          //
          //
          // return <div key={t.id} className={t.isDone ? "is-done" : ""}>
          //     <Checkbox
          //       checked={t.isDone}
          //       color="primary"
          //       onChange={onChangeHandler}
          //     />
          //
          //     <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
          //     <IconButton onClick={onClickHandler}>
          //         <Delete />
          //     </IconButton>
          // </div>
        })
      }
    </div>
    <div style={{paddingTop: "10px"}}>
      <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
              onClick={onAllClickHandler}
      >All
      </Button>
      <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
              onClick={onActiveClickHandler}
              color={'primary'}>Active
      </Button>
      <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
              onClick={onCompletedClickHandler}
              color={'secondary'}>Completed
      </Button>
    </div>
  </div>
})


