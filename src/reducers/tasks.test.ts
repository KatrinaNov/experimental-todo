import {ActionType, divide, multiply, salaryReducer, sub, sum, sumAC} from "./tasks";

test('sum', () => {
//  1. тестовые данные
//  2. Выполнение тестируемого кода
//  3. проверка ожидаемого результата
  const a : number = 570
  const b: number = 330

  const result = sum(a, b)

  expect(result).toBe(900)
})
test('sub', () => {
//  1. тестовые данные
//  2. Выполнение тестируемого кода
//  3. проверка ожидаемого результата
  const a : number = 50
  const b: number = 30

  const result = sub(a, b)
  const result1 = sub(b, a)

  expect(result).toBe(20)
  expect(result1).toBe(-20)
})

test('multiply', () => {
//  1. тестовые данные
//  2. Выполнение тестируемого кода
//  3. проверка ожидаемого результата

  expect(multiply(5, 3)).toBe(15)
})
test('divide', () => {
//  1. тестовые данные
//  2. Выполнение тестируемого кода
//  3. проверка ожидаемого результата

  expect(divide(12, 3)).toBe(4)
  expect(divide(12, 0)).toBe(Infinity)
  expect(divide(0, 0)).toBe(NaN)
})

test('salaryReducer', () => {
  const sumAction: ActionType = sumAC(330)
  const subAction: ActionType = {type: 'sub', payload: 300}
  const multiplyAction: ActionType = {type: 'mult', payload: 4}
  const divideAction: ActionType = {type: 'div', payload: 3}
  expect(salaryReducer(570, sumAction)).toBe((900))
  expect(salaryReducer(500, subAction)).toBe((200))
  expect(salaryReducer(5, multiplyAction)).toBe((20))
  expect(salaryReducer(24, divideAction)).toBe((8))
})