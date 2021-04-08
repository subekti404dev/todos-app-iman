import React from 'react'


const TextInput = (props) => {
  const style = {
    height: '40px',
    width: 'calc(100% - 20px)',
    borderRadius: '5px',
    borderWidth: '1px',
    borderColor: 'grey',
    padding: '0 10px',
  };
  if (props.fontSize) {
    style.fontSize = props.fontSize;
  }
  return (
    <input
      type="text"
      style={style}
      onChange={(e) => {
        if (props.onChange) {
          props.onChange(e.target.value)
        }
      }}
      placeholder={props.placeholder}
      value={props.value}
    />
  )
}

export default TextInput;