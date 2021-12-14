import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TaskType, Todolist} from "./Todolist";
import AddItemForm from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}
type TasksType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  });

  function removeTodolist(todolistId: string) {
    setTodolists(todolists.filter(f => f.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
    // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f=>f.id !==id)})
    // let filteredTasks = tasks.filter(t => t.id != id);
    // setTasks(filteredTasks);
  }

  function removeTask(todolistId: string, id: string) {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== id)})
    // let filteredTasks = tasks.filter(t => t.id != id);
    // setTasks(filteredTasks);
  }

  function addTask(todolistId: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    // let newTasks = [task, ...tasks];
    // setTasks(newTasks);
  }

  function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === taskId ? {...m, isDone} : m)})
    // let task = tasks.find(t => t.id === taskId);
    // if (task) {
    //     task.isDone = isDone;
    // }
    //
    // setTasks([...tasks]);
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    // setFilter(value);
    setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter: value} : m))
  }

  function addTodolist(title: string) {
    let newTodolistId = v1();
    setTodolists([{id: newTodolistId, title: title, filter: 'all'}, ...todolists])
    setTasks({...tasks, [newTodolistId]: []})
  }

  function upDateTask(todolistId: string, taskId: string, title: string) {
    setTasks(
      {
        ...tasks,
        [todolistId]: tasks[todolistId].map(m => m.id === taskId ? {...m, title} : m)
      })
  }

  function updateTodolistTitle(todolistId: string, title: string) {
    setTodolists(todolists.map(m => m.id === todolistId ? {...m, title} : m))
  }

  return (
    <div className="App">
      <AddItemForm callback={addTodolist}/>
      {todolists.map(m => {
        let tasksForTodolist = tasks[m.id];

        if (m.filter === "active") {
          tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
        }
        if (m.filter === "completed") {
          tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
        }
        return (
          <Todolist key={m.id}
                    todolistId={m.id}
                    title={m.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={m.filter}
                    removeTodolist={removeTodolist}
                    upDateTask={upDateTask}
                    updateTodolistTitle={updateTodolistTitle}
          />
        )
      })}
    </div>
  );
}

export default App;
