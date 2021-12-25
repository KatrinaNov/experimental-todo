import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {AddItemForm} from "./AddItemForm";
import {Menu} from "@material-ui/icons";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  TodolistReducer
} from "./reducers/TodolistReducer";
import {
  addEmptyArrayOfTaskAC,
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeAllTaskAC,
  removeTaskAC,
  TasksReducer
} from "./reducers/TasksReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, TodolistsDispatch] = useReducer(TodolistReducer, [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ])

  let [tasks, TasksDispatch] = useReducer(TasksReducer, {
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  });

  //todolists
  function removeTodolist(id: string) {
    TodolistsDispatch(removeTodolistAC(id))
    TasksDispatch(removeAllTaskAC(id))
  }

  function changeTodolistTitle(id: string, title: string) {
    TodolistsDispatch(changeTodolistTitleAC(id, title))
  }

  function addTodolist(title: string) {
    let newTodolistId = v1();
    TodolistsDispatch(addTodolistAC(newTodolistId, title))
    TasksDispatch(addEmptyArrayOfTaskAC(newTodolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    TodolistsDispatch(changeFilterAC(value, todolistId))
  }

  //tasks
  function removeTask(id: string, todolistId: string) {
    TasksDispatch(removeTaskAC(id, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    TasksDispatch(addTaskAC(title, todolistId))
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    TasksDispatch(changeStatusAC(id, isDone, todolistId))
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    TasksDispatch(changeTaskTitleAC(id, newTitle, todolistId))
  }

  return (
    <div className="App">
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <Menu/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container style={{padding: "20px"}}><AddItemForm addItem={addTodolist}/></Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;

              if (tl.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
              }

              return <Grid item>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>

    </div>
  );
}

export default App;
