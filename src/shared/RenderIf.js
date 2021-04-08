// import React from 'react';

const RenderIf = ({ children, condition }) => {
  if (condition) {
    return children;
  } else {
    return null;
  }
}

export default RenderIf;