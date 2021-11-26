import React, {ChangeEvent, KeyboardEvent} from 'react';

type propsType = {
  value: string
  callbackChange: (event: string) => void
  callbackKeyPress: () => void
}
export const Input = (props: propsType) => {

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.callbackChange(event.currentTarget.value)
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && props.callbackKeyPress()
  }
  return  (
    <input
      value={props.value}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}/>
  )
}