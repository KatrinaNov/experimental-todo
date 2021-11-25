import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {Input} from "./components/Input";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        // if ((event.key === 'Control')|| event.key==='Enter'){
         if (event.ctrlKey) {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    // const onClickAllHandler = () => props.changeFilter('all')
    // const onClickActiveHandler = () => props.changeFilter('all')
    // const onClickCompletedHandler = () => props.changeFilter('all')

  const tsarFooHandler = (value: FilterValuesType) => {
    props.changeFilter(value)
  }
return <div>
    <h3>{props.title}</h3>
    <div>
        <Input value={title} callbackChange={onChangeHandler} callbackKeyPress={onKeyPressHandler}/>
        {/*<input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>*/}
        {/*<button onClick={addTaskHandler}>+</button>*/}
        <Button name={'+'} callback={addTaskHandler}/>

    </div>
    <ul>
        {
            props.tasks.map(t => <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                {/*<button onClick={() => removeTaskHandler(t.id)}>x</button>*/}
              <Button name={'x'} callback={() => removeTaskHandler(t.id)}/>
                {/*<button onClick={() => {props.removeTask(t.id)}}>x</button>*/}
            </li>)
        }
    </ul>
    <div>
        {/*<button onClick={() => tsarFooHandler('all')}>All</button>*/}
        {/*<button onClick={() => tsarFooHandler('active')}>Active</button>*/}
        {/*<button onClick={() => tsarFooHandler('completed')}>Completed</button>*/}

        <Button name={'all'} callback={() => tsarFooHandler('all')}/>
        <Button name={'active'} callback={() => tsarFooHandler('active')}/>
        <Button name={'completed'} callback={() => tsarFooHandler('completed')}/>


        {/*<button onClick={changeFilterAllHandler}>All</button>*/}
        {/*/!*<button onClick={() => {props.changeFilter("all")}}>All</button>*!/*/}
        {/*<button onClick={changeFilterActiveHandler}>Active</button>*/}
        {/*/!*<button onClick={() => {props.changeFilter("active")}}>Active</button>*!/*/}
        {/*<button onClick={changeFilterCompletedHandler}>Completed</button>*/}
        {/*/!*<button onClick={() => {props.changeFilter("completed")}}>Completed</button>*!/*/}
    </div>
</div>
}

