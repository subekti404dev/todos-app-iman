import React from 'react';

const ImgIcon = (props) => {
  const size = props.size || 20;
  const style = { height: size, width: size };

  return (
    <img src={props.src} style={style} alt={`alt_${props.alt}`} />
  )

}

export default ImgIcon;