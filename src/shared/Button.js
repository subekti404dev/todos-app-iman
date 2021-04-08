import React from 'react';
import ReactLoading from 'react-loading';

const Spinner = ({ color }) => (
  <ReactLoading type={'spin'} color={color} height={30} width={30} />
);

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
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  let children = props.loading ? <Spinner color={props.textColor || 'white'} /> : props.text;

  return (
    <button
      className="btn"
      style={style}
      onClick={(!props.disabled && !props.loading) ? props.onClick : undefined}
    >
      {children}
    </button>
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
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  let children = props.loading ? <Spinner color={color} /> : props.text;
  return (
    <button
      className="btn"
      style={style}
      onClick={(!props.disabled && !props.loading) ? props.onClick : undefined}
    >
      {children}
    </button>
  )
}

const Button = { Block, Bordered }

export default Button;