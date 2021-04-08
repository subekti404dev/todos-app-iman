import React from 'react'

const Col = ({
  children,
  width,
  size,
  justifyStart,
  justifyCenter,
  justifyEnd,
  alignStart,
  alignCenter,
  alignEnd,
  height,
  color,
  fontColor,
  bold,
  onClick,
  pointer,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,

}) => {
  const style = {
    display: 'flex',
    flex: size || 1,
    flexDirection: 'column'
  }
  if (justifyStart) style.justifyContent = 'flex-start';
  if (justifyCenter) style.justifyContent = 'center';
  if (justifyEnd) style.justifyContent = 'flex-end';
  if (alignStart) style.alignItems = 'flex-start';
  if (alignCenter) style.alignItems = 'center';
  if (alignEnd) style.alignItems = 'flex-end';
  if (height) style.height = height;
  if (color) style.backgroundColor = color;
  if (fontColor) style.color = fontColor;
  if (bold) style.fontWeight = 'bold';
  if (pointer) style.cursor = 'pointer';
  if (borderRadius) style.borderRadius = borderRadius;
  if (borderTopLeftRadius) style.borderTopLeftRadius = borderTopLeftRadius;
  if (borderTopRightRadius) style.borderTopRightRadius = borderTopRightRadius;
  if (borderBottomLeftRadius) style.borderBottomLeftRadius = borderBottomLeftRadius;
  if (borderBottomRightRadius) style.borderBottomRightRadius = borderBottomRightRadius;
  if (width) {
    style.width = width;
    delete style.flex;
  }
  return (
    <div style={style} onClick={onClick}>
      {children}
    </div>
  )
}

export default Col;