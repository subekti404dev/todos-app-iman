import React from 'react';

const Gap = (props) => {
  const size = props.size || 10;
  const type = props.vertical ? 'vertical' : 'horizontal';
  const style = {};
  if (type === 'vertical') {
    style.height = size;
  } else {
    style.width = size;
  }

  return (
    <div style={style} />
  )
}

export default Gap;