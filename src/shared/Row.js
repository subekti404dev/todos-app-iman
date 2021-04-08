import React from 'react'

const Row = ({
  children,
  wrap,
  justifyStart,
  justifyCenter,
  justifyEnd,
  alignStart,
  alignCenter,
  alignEnd,
  color
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  }
  if (justifyStart) style.justifyContent = 'flex-start';
  if (justifyCenter) style.justifyContent = 'center';
  if (justifyEnd) style.justifyContent = 'flex-end';
  if (alignStart) style.alignItems = 'flex-start';
  if (alignCenter) style.alignItems = 'center';
  if (alignEnd) style.alignItems = 'flex-end';
  if (wrap) style.flexWrap = 'wrap';
  if (color) style.backgroundColor = color;
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Row;