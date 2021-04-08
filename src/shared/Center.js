import React from 'react';

const Center = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw', height: '100vh'
      }}>
      {props.children}
    </div>
  )
}

export default Center;