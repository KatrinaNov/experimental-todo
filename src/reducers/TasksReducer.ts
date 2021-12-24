import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionType = removeTaskACType | addTaskACType | changeTaskTitleACType

export const TasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      let todolistTasks = state[action.payload.todolistId];
      state[action.payload.todolistId] = todolistTasks.filter(t => t.id != action.payload.id);
      return {...state}
    }
    case 'ADD-TASK': {
      let task = {id: v1(), title: action.payload.title, isDone: false};
      let todolistTasks = state[action.payload.todolistId];
      state[action.payload.todolistId] = [task, ...todolistTasks];
      return {...state}
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.payload.todolistId];
      let task = todolistTasks.find(t => t.id === action.payload.id);
      if (task) {
          task.title = action.payload.newTitle;
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



