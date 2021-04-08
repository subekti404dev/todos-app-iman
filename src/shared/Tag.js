import React from 'react';
import Icons from '../assets/icons';
import ImgIcon from './ImgIcon';
import Row from './Row';

const Tag = ({ label, onRemove }) => {
  return (
    <div
      style={{
        padding: "5px 10px",
        marginRight: 5,
        marginBottom: 3,
        border: "1px solid #afafaf",
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 18,
        fontSize: 13,
        backgroundColor: '#e4e4e4'
      }}
    >
      <Row alignCenter>
        <div style={{ marginBottom: 4 }}>{label}</div>
        <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={onRemove}>
          <ImgIcon src={Icons.remove} size={13} />
        </div>
      </Row>
    </div>
  )
}

export default Tag;