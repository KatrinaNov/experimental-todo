import React, {ChangeEvent, KeyboardEvent} from 'react';

type propsType = {
  value: string
  callbackChange: (event: ChangeEvent<HTMLInputElement>) => void
  callbackKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void
}
export const Input = (props: propsType) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.callbackChange(event);
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    props.callbackKeyPress(event);
  }
  return  (
    <input value={props.value} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
  )
}