import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}
type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistID1=v1();
  let todolistID2=v1();

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]:[
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]:[
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  });


  // let [filter, setFilter] = useState<FilterValuesType>("all");


  function removeTask(todoListId: string, id: string) {
    setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
    // let filteredTasks = tasks.filter(t => t.id != id);
    // setTasks(filteredTasks);
  }

  function addTask(todoListId: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    // let newTasks = [task, ...tasks];
    setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]});
  }

  function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
    // let task = tasks.find(t => t.id === taskId);
    // if (task) {
    //   task.isDone = isDone;
    // }
    //
    // setTasks([...tasks]);
    setTasks({...tasks, [todoListId]: tasks[todoListId].map(m=>m.id === taskId ? {...m, isDone: isDone} : m)})
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTodolists(todolists.map(m=>m.id===todolistId ? {...m, filter: value} : m))
  }

  function removeTodolist(todoListId: string) {
    setTodolists(todolists.filter(t=>t.id !== todoListId))
    // let filteredTasks = tasks.filter(t => t.id != id);
    delete tasks[todoListId]
    // setTasks({...tasks})
  }

  return (
    <div className="App">
      {todolists.map(m => {
          let tasksForTodolist = tasks[m.id];

          if (m.filter === "active") {
            tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
          }
          if (m.filter === "completed") {
            tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
          }

          return (
            <Todolist
              key={m.id}
              todolistId={m.id}
              title={m.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={m.filter}
              removeTodolist={removeTodolist}
            />
          )
        }
      )}
    </div>
  );
}

export default App;
