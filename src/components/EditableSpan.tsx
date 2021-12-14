import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
  title: string
  callbackForEditableSpan: (title: string) => void
}

const EditableSpan = (props: EditableSpanType) => {
  const [edit, setEdit] = useState(false)
  let [localTitle, setlocalTitle] = useState(props.title)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setlocalTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setViewMode();
    }
  }
  const setActiveMode = () => setEdit(true)
  const setViewMode = () => {
    setEdit(false)
    props.callbackForEditableSpan(localTitle)
  }
  return (
    edit ?
      <input
        value={localTitle}
        onBlur={setViewMode}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        autoFocus
      />
      : <span onDoubleClick={setActiveMode}>{props.title}</span>
  );
};

export default EditableSpan;