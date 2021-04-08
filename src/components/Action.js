import React from 'react';
import { Button, Col, Gap, Row } from '../shared';
import AppStore from '../store/index';
import Event from '../services/event';
import { CustomDialog } from 'react-st-modal';
import Form from './Form';


const Action = (props) => {
  const [loading, setLoading] = React.useState(false);

  const onSync = async () => {
    setLoading(true);
    await AppStore.todos.upload();
    Event.emit('update-data');
    setLoading(false);
  }


  const onAdd = async () => {
    await CustomDialog(<Form />, {
      title: 'Add Todo',
      showCloseIcon: true,
    })
  }

  return (
    <Row>
      <Col></Col>
      <Col size={3}>
        <Gap vertical size={30} />
        <Row>
          <Col>
            <Button.Block
              onClick={onAdd}
              height={45}
              text={"ADD"} />
          </Col>
          <Gap />
          <Col>
            <Button.Bordered
              onClick={onSync}
              loading={loading}
              height={45}
              text={"SYNC"} />
          </Col>
        </Row>
      </Col>
      <Col></Col>
    </Row>
  )
}

export default Action;