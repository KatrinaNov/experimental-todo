import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionType = removeTaskACType | addTaskACType | changeTaskTitleACType | changeStatusACCType | removeAllTaskACType | addEmptyArrayOfTaskACType

export const TasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      let todolistTasks = state[action.payload.todolistId];
      state[action.payload.todolistId] = todolistTasks.filter(t => t.id != action.payload.id);
      return {...state}
    }
    case 'REMOVE-ALL-TASKS': {
      delete state[action.payload.id]
      return {...state}
    }
    case 'ADD-TASK': {
      let task = {id: v1(), title: action.payload.title, isDone: false};
      let todolistTasks = state[action.payload.todolistId];
      state[action.payload.todolistId] = [task, ...todolistTasks];
      return {...state}
    }
    case 'ADD-EMPTY-ARRAY-TASKS': {
      return {...state, [action.payload.id]: []}
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.payload.todolistId];
      let task = todolistTasks.find(t => t.id === action.payload.id);
      if (task) {
          task.title = action.payload.newTitle;
      }
      return ({...state});
    }
    case 'CHANGE-STATUS': {
      let todolistTasks = state[action.payload.todolistId];
      let task = todolistTasks.find(t => t.id === action.payload.id);
      if (task) {
          task.isDone = action.payload.isDone;
      }
      return ({...state});
    }
    default: return state
  }
};

type removeTaskACType = ReturnType<typeof removeTaskAC>
// action creator
export const removeTaskAC = (id: string, todolistId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id: id,
      todolistId: todolistId
    }

  } as const
}
type removeAllTaskACType = ReturnType<typeof removeAllTaskAC>
// action creator
export const removeAllTaskAC = (id: string) => {
  return {
    type: 'REMOVE-ALL-TASKS',
    payload: {
      id: id,
    }

  } as const
}
type addTaskACType = ReturnType<typeof addTaskAC>
// action creator
export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      title: title,
      todolistId: todolistId
    }

  } as const
}
type addEmptyArrayOfTaskACType = ReturnType<typeof addEmptyArrayOfTaskAC>
// action creator
export const addEmptyArrayOfTaskAC = (id: string) => {
  return {
    type: 'ADD-EMPTY-ARRAY-TASKS',
    payload: {
      id,
    }
  } as const
}
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
// action creator
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {
      id,
      newTitle,
      todolistId,
    }
  } as const
}
type changeStatusACCType = ReturnType<typeof changeStatusAC>
// action creator
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
  return {
    type: 'CHANGE-STATUS',
    payload: {
      id,
      isDone,
      todolistId,
    }
  } as const
}



