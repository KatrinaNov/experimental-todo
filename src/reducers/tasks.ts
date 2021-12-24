export function sum(state: number, num: number) {
  return state + num
}
export function sub(state: number, num: number) {
  return state - num
}
export function multiply(state: number, num: number) {
  return state * num
}
export function divide(state: number, num: number) {
  return state/num
}

export type ActionType = {
  type: "sum" | "sub" | "mult" | "div"
  payload: number
}
export const sumAC = (payload: number) => {
  return {
    type: "sum",
    payload
  } as const
}
export const salaryReducer = (state: number, action: ActionType) => {
  switch (action.type) {
    case "sum":
      return state + action.payload
    case "sub":
      return state - action.payload
    case "mult":
      return state * action.payload
    case "div":
      return state / action.payload
    default:
      return state
  }
}