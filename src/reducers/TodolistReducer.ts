import {FilterValuesType, TodolistType} from "../App";

type ActionType = changeFilterACType | addTodolistACType | removeTodolistACType | changeTodolistTitleACType

export const TodolistReducer = (state: Array<TodolistType>, action: ActionType) => {
  switch (action.type) {
    case 'CHANGE-FILTER': {
      let newState = [...state]
      let todolist = newState.find(tl => tl.id === action.payload.id);
      if (todolist) {
          todolist.filter = action.payload.value;
      }
      return newState
    }
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id != action.payload.id)
    }
    case 'ADD-TODOLIST': {
      let newTodolist : TodolistType = { id: action.payload.id, title: action.payload.title, filter: 'all' };
      return [newTodolist, ...state];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      let newState = [...state]
      const todolist = newState.find(tl => tl.id === action.payload.id);
      if (todolist) {
          todolist.title = action.payload.title;
      }
      return newState
    }
    default: return state
  }
};

type changeFilterACType = ReturnType<typeof changeFilterAC>
// action creator
export const changeFilterAC = (value: FilterValuesType, id: string) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      value: value,
      id: id
    }

  } as const
}
type addTodolistACType = ReturnType<typeof addTodolistAC>
// action creator
export const addTodolistAC = (id: string, title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      id: id,
      title: title
    }
  } as const
}
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
// action creator
export const removeTodolistAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id
    }
  } as const
}
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
// action creator
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id,
      title,
    }
  } as const
}


