import React from 'react'

const Padder = (props) => {
  const style = {};

  if (props.all) style.padding = props.all;
  if (props.horizontal) style.padding = `0 ${props.horizontal}px`;
  if (props.vertical) style.padding = `${props.vertical}px 0`;
  if (props.top) style.paddingTop = props.top;
  if (props.bottom) style.paddingBottom = props.bottom;
  if (props.left) style.paddingLeft = props.left;
  if (props.right) style.paddingRight = props.right;
  if (Object.keys(props).length <= 1) style.padding = 10;
  
  return (
    <div style={style}>
      {props.children}
    </div>
  )
}

export default Padder;