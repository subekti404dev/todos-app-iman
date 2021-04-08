import React from 'react';

const disableColor = 'rgb(138, 138, 138)';

const Block = (props) => {
  let color = props.color || '#3d2462';
  if (props.disabled) color = disableColor;
  const style = {
    width: '100%',
    height: props.height || 40,
    border: `3px solid ${color}`,
    borderRadius: 5,
    backgroundColor: color,
    fontWeight: 'bold',
    fontSize: props.fontSize || 16,
    color: props.textColor || 'white',
    cursor: 'pointer'
  };
  return (
    <button className="btn" style={style} onClick={!props.disabled ? props.onClick : undefined}>{props.text}</button>
  )
}

const Bordered = (props) => {
  let color = props.color || '#3d2462';
  if (props.disabled) color = disableColor;
  const style = {
    width: '100%',
    height: props.height || 40,
    border: `3px solid ${color}`,
    borderRadius: 5,
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: props.fontSize || 16,
    color,
    cursor: 'pointer'
  };
  return (
    <button className="btn" style={style} onClick={!props.disabled ? props.onClick : undefined}>{props.text}</button>
  )
}

const Button = { Block, Bordered }

export default Button;