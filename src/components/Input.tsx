import React, {ChangeEvent, KeyboardEvent} from 'react';

type propsType = {
  title: string
  setTitle: (event: string) => void
  callbackKeyPress: () => void
}
export const Input = ({title, setTitle, callbackKeyPress, ...props}: propsType) => {

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && callbackKeyPress()
  }
  return  (
    <input
      value={title}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}/>
  )
}